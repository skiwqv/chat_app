<template>
  <v-app>
  <v-container>
    <v-app-bar-nav-icon>
    <v-navigation-drawer 
      app
      temporary
      v-model="drawer"
    >
      <v-list-item-group>
        <v-list-item 
          v-for="link in links" 
          :key="link.title" 
          :to="link.url">
          <v-btn text>{{ link.title }}</v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn
            v-if="isUserLoggedIn"
            @click="logOut"
            text
          >
            Log Out
          </v-btn>
        </v-list-item>
      </v-list-item-group>
    </v-navigation-drawer>
  </v-app-bar-nav-icon>
    <v-toolbar dense class="header">
      <v-app-bar-nav-icon
        @click="(drawer = !drawer)" 
        class="hidden-md-and-up"
        >
      </v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-btn
          :to="'/'"
          text
        >Home</v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          v-for="link of links"
          :key="link.title"
          :to="link.url"
          class=" ml-3"
        >{{link.title}}</v-btn>
        <v-btn
          v-if="isUserLoggedIn"
          @click="logOut"
          text
        >Log Out</v-btn>
    </v-toolbar-items>
    </v-toolbar>
    <v-container>
      <router-view ></router-view>
    </v-container>
  </v-container>
</v-app>
</template>

<script>
import firebase from 'firebase';
import 'firebase/firestore'
  export default {
    data() {
      return {
        user : null,
        drawer : false
    }
    },
    created() {
      this.$store.dispatch('initAuth')
      firebase.auth().onAuthStateChanged(user => {
        if(user) {
         this.$store.dispatch('autoLoginUser', user)
        }
})

  },
    methods:{
      logOut(){
        this.$store.dispatch('logoutUser')
        this.$router.push('/')
      }
    },
    computed:{
      isUserLoggedIn() {
        return this.$store.getters.isUserLoggedIn
      },

      links() {
        if(this.isUserLoggedIn){
          const loggedInUserLinks =[
            {title:'Chat', url: '/chat'},
            {title:'About Us', url: '/about'},
            {title:'Profile', url:'/profile'}
          ]
          return loggedInUserLinks
        }else {
          const unLoggedInUserLinks = [
              {title:'About us', url: '/about'},
              {title:'Login', url:'/login'},
              {title:'Register', url: '/register'}
            ]
          return unLoggedInUserLinks
        }
      }
    }
  }
</script>

<style>

</style>
