<template>
  <body>
     <DBview></DBview> 
  </body>
</template>

<script>
import LoginPage from '@/components/LoginPage.vue';
import DBview from "../views/DBview.vue";
import authService from '../authService.js';
import { mapActions, mapGetters,  mapState, mapMutations } from 'vuex';

export default {
  name: 'HomeView',
  components: {
    LoginPage,
    DBview
  },
  
  computed: {
    ...mapGetters(['isAuthenticated']),
    user() {
      return this.$store.state.user;
    },
    ...mapState(['themeMode']),
  },
  methods: {
    getToken(){
      const url = new URL(window.location.href);
      try{
      const accessToken = url.hash.split('&').find(param => param.includes('access_token=')).split('=')[1];
      localStorage.setItem('authToken', accessToken);
      }catch(error){
        console.log(error.message);
      }
    },
   
},
  async created() {
     this.getToken();
  },
}
</script>


