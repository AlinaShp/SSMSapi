<template>
  <Navbar></Navbar>
  <div id="cards">

    <h1>table</h1>
    <table class="table">
      <thead>
        <tr>
          <th v-for="(header, index) in tableHeaders" :key="index" scope="col">{{ header }}</th>
        </tr>
  </thead>
  <tbody>
    <tr v-for="(row, index) in tableData" :key="index">
          <td v-for="(header, index) in tableHeaders" :key="index">{{ row[header] }}</td>
        </tr>
  </tbody>
</table>
</div>

</template>

<script>
import axios from "axios";
import Navbar from "../components/Navbar.vue";
export default {
  components:{
    Navbar
  },
  props: {
    databaseName: {
      type: String,
      required: true,
    },
    tableName:{
      type: String,
      required: true,
    }
  },
  data() {
    return {
      tableData: [],
      tableHeaders: []
    };
  },
    methods: {
    async getTablesInfo(){
      const accessToken = localStorage.getItem('authToken');
      const instanceName = 'ProjectSQL1';
const config = {
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
};
      axios.get('http://localhost:5143/api/DB/tableData/'+ this.databaseName +'/'+ this.tableName+`?instanceName=${instanceName}`, config)
  .then(response => {
    console.log(response.data);
    this.tableData = response.data;
        if (this.tableData.length > 0) {
          this.tableHeaders = Object.keys(this.tableData[0]);
        }
  })
  .catch(error => {
    console.error('There was an error!', error);
  });
    
  }
 }, mounted(){
  this.getTablesInfo();
 }
}
</script>
<style>

</style>