<template>
  <v-app>
    <v-parallax
      src="https://img.freepik.com/free-photo/vivid-blurred-colorful-background_58702-2655.jpg?w=1060&t=st=1676973606~exp=1676974206~hmac=58923b173c132bce6ba41f62cbf807149c731ee02b187e29083717cb5919c7e3"
    >
      <v-row 
        align="center" 
        justify="center"
      >
        <v-col 
          class="text-center" 
          cols="12"
        >
          <h1 class="heart-beat-animation">Chat!</h1>
          <v-btn
            class="slide-up-animation"
            v-if="showElement"
            height="50px"
            width="300px"
            @click="toRegister"
            >Begin work!</v-btn
          >
        </v-col>
      </v-row>
    </v-parallax>
  </v-app>
</template>

<script>
import "animate.css/animate.css";
export default {
  data() {
    return {
      showElement: false,
    };
  },
  mounted() {
    this.showElement = true;
  },
  computed: {
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
  },
  methods: {
    toRegister() {
      if (this.isUserLoggedIn) {
        this.$router.push("/chat");
      } else {
        this.$router.push("/register");
      }
    },
  },
};
</script>

<style scoped>
.heart-beat-animation {
  color: black;
  animation-duration: 1s;
  animation-name: heartBeat;
}
.slide-up-animation {
  animation-duration: 1s;
  animation-name: bounceInUp;
}
.fade-in {
  animation: fade-in 1s;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>