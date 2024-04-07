<template>
    <div class="instructors-page">
      <h4>Instructor Home</h4>
      <table>
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Date</th>
            <th>Status</th>
            <th>Reject Reason</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="appointment in appointments" :key="appointment.id">
            <td>{{ appointment.id }}</td>
            <td>{{ appointment.date }}</td>
            <td>{{ appointment.status }}</td>
            <td>{{ appointment.rejectedReason }}</td>
            <td>
              <!-- This button now only allows approving if status is STATUS_PENDING -->
              <button @click="approveAppointment(appointment.id)" v-if="appointment.status === 'STATUS_PENDING'" class="action-button approve-button">Approve</button>
              <button @click="rejectAppointment(appointment.id)" v-if="appointment.status === 'STATUS_PENDING'" class="action-button reject-button">Reject</button>
            </td>
            
          </tr>
        </tbody>
      </table>
  
      <!-- Reject Reason Modal -->
      <div v-show="showRejectReasonModal" class="modal">
        <div class="modal-content">
          <span class="close" @click="closeRejectReasonModal">&times;</span>
          <h2>Enter Reject Reason</h2>
          <textarea v-model="rejectReason" placeholder="Enter reason for rejection..."></textarea>
          <button @click="submitRejection">Submit</button>
        </div>
      </div>

      
    </div>
  </template>
  
  <script>
  import AppointmentService from '@/services/AppointmentService';
  
  export default {
    data() {
      return {
        appointments: [],
        showRejectReasonModal: false,
        selectedAppointmentId: null,
        rejectReason: ''
      };
    },
    created() {
      this.fetchAppointments();
    },
    methods: {
  
      fetchAppointments() {
        const userid = localStorage.getItem("userid");
        const instructorId = 1;
        console.log('instructorId ' + userid);
        AppointmentService.fetchInstructorAppointments(instructorId) 
          .then(response => {
            this.appointments = response.data;
          })
          .catch(error => {
            console.error('Error fetching appointments:', error);
          });
          
      },
      approveAppointment(appointmentId) {
        AppointmentService.approveAppointment(appointmentId)
          .then(() => {
            console.log('Appointment approved');
            this.fetchAppointments(); // Refresh the list to reflect the new status
          })
          .catch(error => {
            console.error('Error approving appointment:', error);
            alert('Error approving appointment');
          });
      },
      
      rejectAppointment(appointmentId) {
        
        this.selectedAppointmentId = appointmentId;
        this.showRejectReasonModal = true; 
        console.log('Appointment id ' + appointmentId +  ' ' +this.selectedAppointmentId);
      },
      closeRejectReasonModal() {
        this.showRejectReasonModal = false; 
        this.rejectReason = ''; 
      },
      submitRejection() {
        AppointmentService.rejectAppointment(this.selectedAppointmentId, this.rejectReason)
          .then(() => {
            console.log('Appointment rejected');
            this.closeRejectReasonModal();
            this.fetchAppointments(); 
          })
          .catch(error => {
            console.error('Error rejecting appointment:', error);
            alert('Error rejecting appointment');
          });
      },
      getInstructorId() {
        return localStorage.getItem('instructorId');
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add this CSS to your component's style section or to your global CSS */
  .instructors-page {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .instructors-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .instructors-table th,
  .instructors-table td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  .action-button {
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 3px;
  }
  
  .approve-button {
    background-color: #04AA6D;
    border: none;
    color: white;
  }
  
  .reject-button {
    background-color: #DC3545;
    border: none;
    color: white;
  }
  
  .modal {
    display: flex; 
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
  }
  
  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }
  
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  
  textarea {
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
  }
  
  </style>
  