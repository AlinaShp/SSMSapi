<template>
    <Navbar></Navbar>
    <div id="tableCards">
    <h1>{{dbName}}</h1>
    <div  class="row">
          <div class="col-4" v-for="tableCard in tableCards" :key="tableCard.id">
            <TableCard :tableCard="tableCard" :databaseName="dbName"></TableCard>
          </div>
        </div>   
</div>

</template>

<script>
import axios from 'axios';
import TableCard from '../components/TableCard.vue';
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
            databaseName:this.dbName
        };
  },
  methods:{
    async getTableinfo(){
    const accessToken = localStorage.getItem('authToken');
    try {
      const instanceName = this.$globals.instanceName;
const config = {
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
};
const url = `http://localhost:5143/api/DB/tablesInfo/`+this.dbName+`?instanceName=${instanceName}`;
  const response = await axios.get(url, config);
  const res = response.data;
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
#tableCards{
    margin-left: 20vh;
    width: 100vh;
    height: 50vh !important;
    z-index: 0;
}
</style>
