<template>
  <v-app>
    <v-card 
      max-width="1200" 
      v-if="showElement" 
      class="fade-in-animation"
    >
      <v-toolbar color="indigo" dark>
        <v-toolbar-title>Inbox</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          color="white"
          append-icon="mdi-magnify"
          label="Search"
          placeholder="User Email"
          single-line
          hide-details
        >
        </v-text-field>
      </v-toolbar>
      <v-list light active>
        <v-list-item
          v-for="user in searchUser"
          :key="user.id"
          @click="createRoom(user)"
        >
          <v-list-item-content>
            <v-list-item-title>{{ user.email }}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-avatar>
            <v-img :src="user.photoURL"></v-img>
          </v-list-item-avatar>
        </v-list-item>
      </v-list>
    </v-card>
  </v-app>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";

export default {
  data() {
    return {
      search: "",
      selectedUser: null,
      roomID: null,
      showElement: false,
    };
  },
  mounted() {
    this.showElement = true;
  },
  computed: {
    getUsers() {
      return this.$store.getters.getUsers;
    },
    user() {
      return this.$store.getters.getUser;
    },

    searchUser() {
      const lists = this.$store.getters.getUsers;
      if (this.search) {
        return lists.filter((list) => {
          return list.email.includes(this.search);
        });
      }
      return lists;
    },
  },
  methods: {
    async createRoom(user) {
      this.$set(this, "selectedUser", user);
      const curentUser = this.$store.getters.getUser;
      const otherUser = this.selectedUser;
      const chatRoom = {
        users: [curentUser, otherUser],
      };
      let curentRoom = null;
      const roomRef = await firebase
        .firestore()
        .collection("room")
        .get()
        .then((roomRefSnap) => {
          roomRefSnap.forEach((doc) => {
            const room = doc.data();
            const user1 = room.users.find((user) => user.id == curentUser.id);
            const user2 = room.users.find((user) => user.id == otherUser.id);
            if (user1 && user2) {
              curentRoom = room;
            }
          });
        });
      if (curentRoom) {
        this.$router.push(`/room/${curentRoom.chatID}`);
      } else {
        firebase
          .firestore()
          .collection("room")
          .add(chatRoom)
          .then((roomSnap) => {
            firebase.firestore().collection("room").doc(roomSnap.id).update({
              chatID: roomSnap.id,
            });
            this.$router.push(`/room/${roomSnap.id}`);
          });
      }
    },
  },
  created() {
    this.$store.dispatch("fetchUsers");
    this.searchUser;
  },
};
</script>

<style scoped>
.fade-in-animation {
  animation-duration: 1s;
  animation-name: fadeIn;
}
.icon {
  width: 36px;
  height: 36spx;
}
.list__item:hover {
  background-color: #d3eaf2;
  transition: all 0.5s;
  cursor: pointer;
}
</style>

