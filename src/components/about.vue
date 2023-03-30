<template>
  <v-app 
    class="slide-left-animation"
    v-if="showElement">
    <v-row class="d-flex justify-center mt-10">
      <v-img src="https://img.freepik.com/free-photo/artistic-blurry-colorful-wallpaper-background_58702-8298.jpg?w=1060&t=st=1677071253~exp=1677071853~hmac=4b3bd7440bb2fb6e4bc36159041900549005d335f917193f86194117ad7b3a4a"
        contain max-height="400">
        <div class="text-overlay">
          <h1 class="text-center">Hi! We are Chat Project</h1>
        </div>
      </v-img>
    </v-row>
  
  </v-app>
</template>

<script>
   export default {
      data(){
        return{
          showElement:false
        }
      },
      mounted(){
        this.showElement = true
      }
}
</script>

<style scoped>
.slide-left-animation {
  animation-duration: 1s;
  animation-name: bounceInLeft;
}
.text-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  text-shadow: 1px 1px 2px black;
}
</style>