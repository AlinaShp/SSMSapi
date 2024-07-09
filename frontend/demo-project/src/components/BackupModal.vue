<template>

    <div class="modal fade" id="backupStaticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Backup</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col">
                Backup
              </div>
              <div class="col">
                <button class="btn btn-primary" @click="backupButtonClick">Backup</button>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col">
                Recovery Mode
              </div>
              <div class="col">
                <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    {{recoveryMode}}
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li><a class="dropdown-item" href="#" @click="selectRecoveryMode('FULL')">FULL</a></li>
                    <li><a class="dropdown-item" href="#" @click="selectRecoveryMode('SIMPLE')">SIMPLE</a></li>
                    <li><a class="dropdown-item" href="#" @click="selectRecoveryMode('BULK')">BULK</a></li>
                  </ul>
                </div>
              </div>
              <div class="col">
                <button type="button" class="btn btn-secondary" @click="changeRecoveryMode">change</button>
              </div>
            </div>
            <div class="row">
              <div class="col">
                Restore 
              </div>
              <div class="col">
                <button class="btn btn-danger" @click="restoreButtonClick">Restore</button>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from 'axios';

export default {
  props: {
    databaseName: {
      type: String,
      required: true
    },
  },
  data(){
    return {
        recoveryMode: 'FULL'
      }
  },
methods: {
  showModal() {
      const myModal = new bootstrap.Modal(document.getElementById('backupStaticBackdrop'));
      myModal.show();
  },
  async changeRecoveryMode() {
  const accessToken = localStorage.getItem('authToken');
  try {
    const instanceName = this.$globals.instanceName;
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json' // Убедитесь, что Content-Type установлен правильно
      }
    };
    const recovery = this.recoveryMode;
    console.log(this.recoveryMode);

    // Оборачиваем recoveryMode в объект и преобразуем в JSON
    const response = await axios.patch(
      `http://localhost:5143/api/DB/changeRecoveryModel/${this.databaseName}?instanceName=${instanceName}`,
      JSON.stringify(recovery),
      config
    );
    console.log(response.data);
    Swal.fire({
      icon: "success",
      title: "Yay!",
      text: "Recovery mode changed, " + response.data,
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong! " + error.message,
    });
    console.error('There was an error!', error);
  }
},
   selectRecoveryMode(recoveryType){
    this.recoveryMode = recoveryType;  
  },
  async backupButtonClick() {
  const accessToken = localStorage.getItem('authToken');
  console.log("AccessToken:", accessToken);
  try {
    const instanceName = this.$globals.instanceName;
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json' 
      }
    };
    console.log("InstanceName:", instanceName);
    console.log("DatabaseName:", this.databaseName);

    const response = await axios.post(`http://localhost:5143/api/DB/backup/${this.databaseName}?instanceName=${instanceName}`, {}, config);

    Swal.fire({
      icon: "success",
      title: "Yay!",
      text: "Backup succeeded, " + response.data,
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong! " + error.message,
    });
    console.error('There was an error!', error);
  }
}
,
  async restoreButtonClick(){
    const accessToken = localStorage.getItem('authToken');
    try {
      const instanceName = this.$globals.instanceName;
const config = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',

  }
};
console.log(this.databaseName);
        const response = await axios.post(`http://localhost:5143/api/DB/restore/`+this.databaseName+`?instanceName=${instanceName}`, config);
        Swal.fire({
  icon: "success",
  title: "Yay!",
  text: "Backup succeeded, " + response.data,
  
});
    } catch (error) {
      Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Something went wrong! "+ error.message,
  
});
        console.error('There was an error!', error);
    }
  }

}
}
</script>

<style scoped>

</style>