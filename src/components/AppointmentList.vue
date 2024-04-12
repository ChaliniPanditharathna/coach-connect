<template>
  <div class="appointments-page">
    <h1>Appointment List</h1>
    
    <div class="toggle-container">
      <label class="toggle-label">
        <input type="checkbox" v-model="searchKey" @change="toggleSearchKey" class="toggle-input">
        <span class="toggle-text">Show Previous Appointments</span>
      </label>
    </div>

    <table class="appointments-table">
      <thead>
        <tr>
          <th>Instructor Name</th>
          <th>Adrress</th>
          <th>Date</th>
          <th>Time</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="appoint in appointments" :key="appoint.id">
          <td>{{ appoint.instructor.fName }} {{ appoint.instructor.lName }}</td>
          <td>{{ appoint.instructor.unitNo }}, {{ appoint.instructor.street }}, {{ appoint.instructor.city }}, {{ appoint.instructor.postalCode }}</td>
          <td>{{ appoint.date }}</td>
          <td>{{ appoint.instructorAvailability.weekDay }} : {{ appoint.instructorAvailability.startTime }} - {{ appoint.instructorAvailability.endTime }}</td>
          <td>{{ getStatusDisplayName(appoint.status) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AppointmentService from '@/services/AppointmentService';

export default {
  name: 'AppointmentList',
  data() {
    return {
      appointments: [],
      searchKey: false, 
    };
  },
  created() {
    this.fetchAppointments();
  },
  methods: {
    fetchAppointments() {
      const userid = localStorage.getItem('userid');
      const userRole = localStorage.getItem('userRole');
      const searchKey = this.searchKey ? 'previous' : 'upcoming'; 

      AppointmentService.getAppointment(searchKey, userid, userRole)
        .then(response => {
          this.appointments = response.data.appointments;
        })
        .catch(error => {
          console.error('Error fetching appointments:', error);
        });
    },
    toggleSearchKey() {
      this.fetchAppointments(); 
    },
    getStatusDisplayName(status) {
      switch (status) {
        case 'STATUS_APPROVED':
        return 'Approved';
        case 'STATUS_PENDING':
          return 'Pending';
        case 'STATUS_REJECTED':
          return 'Rejected';
      }
    }
  },

};
</script>

<style scoped>
.toggle-container {
  margin-bottom: 20px;
  width: 95%;
  margin: 0 auto;
  
}

.toggle-label {
  display: flex;
  align-items: center;
}

.toggle-input {
  margin-right: 10px;
}

.toggle-text {
  font-size: 16px;
}

.appointments-page {
  max-width: 1200px;
  margin: 0 auto;
}

.appointments-table {
  width: 95%;
  margin: 0 auto;
  border-collapse: collapse;
  margin-top: 20px;
}

.appointments-table th,
.appointments-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.appointments-table th {
  background-color: #f2f2f2;
}

.appointments-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.appointments-table tbody tr:nth-child(odd) {
  background-color: #fff;
}
</style>
