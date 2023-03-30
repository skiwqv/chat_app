<template>
  <v-app class="fade-in" v-if="showElement">
    <v-card class="mx-auto" width="1000">
      <v-img
        src="https://img.freepik.com/free-photo/vivid-blurred-colorful-wallpaper-background_58702-3897.jpg?w=1060&t=st=1677152400~exp=1677153000~hmac=110f2d75d1b97a50138eb6cc3f23c39b4aa27369e314e156de16ce4f0e361294"
        height="200"
      >
      </v-img>
      <v-row style="margin: 2.5%; position: absolute; top: 130px">
        <v-list-item>
          <v-list-item-avatar size="100">
            <img :src="photo" alt="User Avatar"/>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title
              v-if="user"
              class="title"
              style="margin-top: 20px"
            >
              {{ user.email }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-btn class="primary mt-3" @click="triggerUpload">
          Change avatar
        </v-btn>
        <input
          ref="fileInput"
          type="file"
          style="display: none"
          accept="image/*"
          @change="onFileChange"
        />
      </v-row>
    </v-card>
  </v-app>
</template>

<script>
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
    user() {
      return this.$store.getters.getUser;
    },
    photo() {
      return this.$store.getters.getUserAvatar;
    },
  },
  methods: {
    triggerUpload() {
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      const file = event.target.files[0];
      this.$store.dispatch("updateUserAvatar", file);
    },
  },
};
</script>

<style scoped>
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