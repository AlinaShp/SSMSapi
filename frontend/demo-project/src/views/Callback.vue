<!-- views/Callback.vue -->
<template>
   
  </template>
  
  <script>
  import { signinRedirectCallback } from '../authService';
  
  export default {
    // async created() {
    //   try {
    //     await signinRedirectCallback();
    //     this.$router.push('/');
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    mounted(){
      this.$router.push('/DBview');

    }
  };
  </script>
  