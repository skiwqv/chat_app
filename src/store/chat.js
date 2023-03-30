import firebase from "firebase";
import 'firebase/storage'
import "firebase/firestore"

export default{
    state:{
        data: [],
        userSearch:[]
    },
    mutations:{
        setUsers(state, data){
            state.data = data
        }
    },
    actions:{
    async fetchUsers({commit}){
            const data = []
            const querySnapshot = await firebase.firestore().collection("profile").get()
             querySnapshot.forEach((doc) =>{
                data.push(doc.data())
            })
            commit('setUsers', data)
        },
    },
    getters:{
        getUsers(state){
            return state.data
        }
    }
}
