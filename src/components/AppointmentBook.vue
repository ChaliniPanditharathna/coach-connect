<template>
  <div class="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Appointment Booking</h4>
          <button type="button" class="close" @click="close">&times;</button>
        </div>
        <div class="modal-body">
          <p>You are about to book an appointment with {{ instructor.fName }} {{ instructor.lName }}</p>
          <p>Please select a time slot:</p>
          <div class="time-slot-dropdown">
            <select v-model="selectedTimeSlot" id="timeSlot" class="form-control">
              <option disabled selected value="" >Select a time slot</option>
              <option v-for="availability in availability" :key="availability.id" :value="availability">{{ availability.weekDay }}: {{ availability.startTime }} - {{ availability.endTime }}</option>
            </select>
            <i class="fas fa-chevron-down"></i>
          </div>
          <div class="date-select">
            <p>Please select a date:</p>
          <input type="date" v-model="selectedDate" class="form-control">
          </div>
        </div>
      
        <div class="modal-footer">
          <button @click="bookAppointment" class="book-button">Book</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppointmentService from '@/services/AppointmentService';
import ClientService from '@/services/ClientService';

export default {
  props: {
    instructor: {
      type: Object,
      required: true
    },
    availability: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedTimeSlot: null,
      clientId: null,
      selectedDate: null,
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    getClientId() {
      const userId = localStorage.getItem("userid");
      ClientService.getClientData(userId).then(response => {
        if (response && response.data) {
          this.clientId = response.data.id;
        } else {
          console.error("Invalid response format:", response);
        }
      }).catch(e => {
        console.error("Error fetching client:", e);
      });
    },
    async bookAppointment() {
      const appointmentDate = new Date(this.selectedDate);
      const formattedDate = appointmentDate.toISOString().slice(0, 10);


      const appointmentData = {
        status: "STATUS_PENDING",
        date: formattedDate, // Assuming availability object contains date
        instructor: {
          id: this.instructor.id
        },
        client: {
          id: this.clientId
        },
        instructorAvailability: {
          id: this.selectedTimeSlot.id // Assuming availability ID needs to be specified
        }
      };
      AppointmentService.saveAppointment(appointmentData)
        .then(response => {
          if (response && response.data) {
            this.instructors = response.data.instructors;
            this.$emit('close');
            alert('Successfully booked an appointment.');
          } else {
            console.error("Invalid response format:", response);
          }
        })
        .catch(e => {
          console.error("Error booking appointment:", e);
        });
    }
  },
  mounted() {
    this.getClientId();
  }
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-dialog {
  max-width: 500px;
  width: 80%;
}

.modal-content {
  background-color: #fff;
  border-radius: 8px;
  padding: 1rem;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.modal-title {
  margin: 0;
}

.close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #800000;
  cursor: pointer;
}

.close:hover {
  color: red;
}

.modal-body {
  padding-bottom: 1rem;
}

.modal-footer {
  display: flex;
  justify-content: center;
}

.book-button {
  padding: 0.5rem 1rem;
  background-color: #008CBA;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.book-button:hover {
  background-color:#0099e6;
}

.time-slot-dropdown {
  position: relative;
}
.date-select input{
  position: relative;
  cursor: pointer;
  border-radius: 4px;
  font-size: 10px;
  width: 40%;
  border: 1px solid #ddd;
  cursor: pointer;
  appearance: none;
  background-color: transparent;
  padding: 8px 28px ;
}
.time-slot-dropdown select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: transparent;
  padding: 8px 28px 8px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 10px;
  width: 50%;
  cursor: pointer;
}

.time-slot-dropdown i {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
}
</style>
