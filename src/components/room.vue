<template>
  <div>
    <v-app>
      <v-app-bar
        color="blue"
        collapse-on-scroll
      >
        <v-toolbar-title 
          class="white--text"
          >Sushant </v-toolbar-title>
      </v-app-bar>
      <v-container class="fill-height">
        <v-row class="fill-height pb-14" align="end" ref="container"
        >
          <v-col>
            <div v-for="item in messages" :key="item.chatID" 
            :class="['d-flex flex-row align-center my-2', item.userID == user.id ? 'justify-end': null]">
              <span v-if="item.userID == user.id" class="mr-3 blue rounded-pill pa-2">{{ item.text }}</span>
              <span v-else class="mr-3 white black--text rounded-pill pa-2">{{ item.text }}</span>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <v-footer fixed>
        <v-container class="ml-30 pa-0">
          <v-row no-gutters>
            <v-col>
              <div class="d-flex flex-row align-center">
                <v-text-field v-model="newMessage" placeholder="Type Something" @keypress.enter="sendMessage"></v-text-field>
                <v-btn icon class="ml-4" @click="sendMessage"><v-icon>mdi-send</v-icon></v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import uniqid from 'uniqid'; 
import firebase from 'firebase';
import "firebase/firestore"
export default {
  data(){
    return {
      newMessage:'',
      messages:[],
    }
  },
  mounted(){
    this.fetchMessages()
    this.$nextTick(()=>{
      this.$refs.container.scrollTo({
        top: this.$refs.container.scrollHeight,
        behavior:'smooth'
      })
    })
  },
  computed:{
    user(){
            return this.$store.getters.getUser
        },   
  },
  props:['roomID'],
  methods:{
    sendMessage() {
      const newMessage ={
        text: this.newMessage,
        userID: this.user.id,
        messageID: uniqid()
      }
      const roomRef = firebase.firestore().collection('room').doc(this.roomID)
        roomRef.update({
          messages: firebase.firestore.FieldValue.arrayUnion(newMessage)
        }).then(()=>{
          this.newMessage = ''
        }).catch((error)=>{
          alert('oh!something wrong'+ error)
        })
  },
  fetchMessages(){
   let ref = firebase.firestore().collection('room').doc(this.roomID)
    ref.onSnapshot((snapshot)=>{
      if(snapshot.exists){
        const messageData = snapshot.data().messages
        messageData.sort((a,b)=>{
          return a.messageID !=b.messageID;
        })
        this.messages.splice(0,this.messages.length,...messageData)
      }
    })
  },
},
}

</script>

<style>
</style>