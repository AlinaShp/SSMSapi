<template>
    <Navbar></Navbar>

</template>

<script>
import axios from 'axios';
import Navbar from '../components/Navbar.vue';
export default {
    components:{
        TableCard,
        Navbar
    },
    props: {
    dbName: {
      type: String,
      required: true,
    },
  },
    
  data(){
    return{
            tableCards:[],
        };
  },
  methods:{
    async getTableinfo(){
    const accessToken = localStorage.getItem('authToken');
    try {
      const instanceName = 'ProjectSQL1';
const config = {
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
};
const url = `http://localhost:5143/api/DB/tablesInfo/`+this.dbName+`?instanceName=${instanceName}`;
  const response = await axios.get(url, config);
  const res = response.data;
  console.log(res);
  this.tableCards = [...res];
} catch (error) {
  console.error('There was an error!', error);
}
  }
},
    mounted(){
        this.getTableinfo();
    }
};
</script>

<style scoped>

</style>
