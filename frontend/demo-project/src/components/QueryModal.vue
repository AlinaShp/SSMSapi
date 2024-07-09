<template>
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Custom Query</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Enter your query here:</label>
            <textarea v-model="message" class="form-control" id="message-text"></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click= sendQuery()>Send</button>
      </div>
      <p>Result:</p>
      <p class="small">Rows Affected: {{ responseData.RowsAffected }} </p>
      <p class="small">Result: {{ responseData.Result }} </p>
    </div>
    
  </div>
</div>

</template>
<script>
import axios from 'axios';

export default {
  
    data() {
    return {
      message: '',
      responseData: {

    }
  }},
  methods: {
    showModal() {
        const myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
        myModal.show();
    },
    
    async sendQuery(){
      const instanceName = this.$globals.instanceName;
   
      axios.defaults.withCredentials = true;
    try {
      const accessToken = localStorage.getItem('authToken');
      const bodyMessage =this.message;
      const response = await axios.post('http://localhost:5143/api/DB/executeQuery'+`?instanceName=${instanceName}`, bodyMessage, {
        headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${accessToken}`
        }
    });
           this.responseData = response.data;
           console.log(this.responseData);
       
    } catch (error) {
       console.log(error.message);
    }
}
  }}

</script>
<style scoped>
#staticBackdrop{
  height: 90vh;
}

.modal-backdrop.show {
    opacity: 0 !important;
}

.modal-backdrop {
  --bs-backdrop-opacity: 0 !important;
}
</style>