import firebase from "firebase";
import 'firebase/storage'
import "firebase/firestore"

export default {

    state: {
        userId: null,
        user: null,
        photoURL: null
    },
    mutations: {
        setUserId: (state, userId) => {
            state.userId = userId
        },
        setUser: (state, user) => {
            state.user = user
        },
        updateAvatar(state, url) {
            state.photoURL = url
        }
    },
    actions: {
        initAuth({ commit }) {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    commit('setUserId', user.uid)
                    firebase.firestore().collection('profile').doc(user.uid).get()
                        .then(doc => {
                            if (doc.exists) {
                                commit('setUser', doc.data())
                                commit('updateAvatar', doc.data().photoURL)
                            } else {
                                commit('setUserId', null)
                                commit('setUser', null)
                            }
                        })
                }
            })
        },

        async updateUserAvatar({ commit, state }, file) {
            const imageExt = file.name.slice(file.name.lastIndexOf('.'))
            const fileData = await firebase.storage().ref(`avatar/${state.userId}`).put(file)
            const imageSrc = await fileData.ref.getDownloadURL()
            firebase.firestore().collection('profile').doc(state.userId).set({
                ...state.user,
                photoURL: imageSrc
            })
            commit('updateAvatar', imageSrc)
        }
    },
    getters: {
        getUserId: state => {
            return state.userId
        },
        getUser: state => {
            return state.user
        },
        getUserAvatar(state) {
            return state.photoURL
        }
    }

}