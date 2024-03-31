<template>
  <div class="instructors-page">
    <h1>Instructors</h1>
    <div class="search-container">
      <input type="text" v-model="searchQuery" placeholder="Search by city or expertise" class="search-input">
    </div>
    <table class="instructors-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Adrress</th>
          <th>Qualification</th>
          <th>Expertise</th>
          <th>Availability</th>
          <th>Gender</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="instructor in filteredInstructors" :key="instructor.id">
          <td>{{ instructor.fName }} {{ instructor.lName }}</td>
          <td>{{ instructor.email }}</td>
          <td>{{ instructor.unitNo }} {{ instructor.street }}, {{ instructor.city }} {{ instructor.postalCode }}</td>
          <td>{{ instructor.qualification }}</td>
          <td>{{ instructor.expertise }}</td>
          <td>
            <ul v-if="instructor.availability.length > 0" class="availability-list">
              <li v-for="availability in instructor.availability" :key="availability.id">
                {{ availability.weekDay }}: {{ availability.startTime }} - {{ availability.endTime }}
              </li>
            </ul>
            <span v-else class="no-availability">No availability information</span>
          </td>
          <td>{{ instructor.gender }}</td>
          <td>    <button @click="openModal(instructor)" class="book-button">Book Appointment</button>
        
         </td>
   
        
        
        </tr>
      </tbody>
    </table>
   
  <!-- Modal for appointment booking -->
  <div class="modal" v-if="isModalOpen">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Book Appointment</h4>
            <button type="button" class="close" @click="closeModal">&times;</button>
          </div>
          <div class="modal-body">
            <appointment-book :instructor="selectedInstructor" :availability="selectedInstructor.availability" @close="closeModal" @book="bookAppointment"/>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import InstructorService from '@/services/InstructorService';
import AppointmentBook from '@/components/AppointmentBook.vue';
export default {
  name: 'ClientHome',
  components: {
    AppointmentBook
  },
  data() {
    return {
      instructors: [],
      searchQuery: '',
      isModalOpen: false,
      selectedInstructor: null,
      selectedTimeSlot: null,
      timeSlots: []
    };
  },
  created() {
    this.fetchInstructors();
  },
  methods: {
    fetchInstructors() {
    
      // Ensure that your service method accepts the search query parameter
      if (!this.searchQuery) {
        InstructorService.getData()
          .then(response => {
            if (response && response.data) {
              this.instructors = response.data.instructors;
            } else {
              console.error("Invalid response format:", response);
            }
          })
          .catch(e => {
            console.error("Error fetching instructors:", e);
          });
      } else {
        InstructorService.getDataBySearch({ searchKey: this.searchQuery })
          .then(response => {
            if (response && response.data) {
           
              this.instructors = response.data.instructors;
            } else {
              console.error("Invalid response format:", response);
            }
          })
          .catch(e => {
            console.error("Error fetching instructors:", e);
          });
      }
    },
    openModal(instructor) {
      this.selectedInstructor = instructor;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    bookAppointment() {
      this.isModalOpen = false;
    }
  },
  computed: {
    filteredInstructors() {
      return this.instructors.filter(instructor => {
        return instructor.city.toLowerCase().includes(this.searchQuery.toLowerCase()) || instructor.expertise.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
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

.search-container {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.instructors-table {
  width: 100%;
  border-collapse: collapse;
}

.instructors-table th,
.instructors-table td {
  border: 1px solid #ddd;
  padding: 8px;
}
.book-button{
  background-color: #04AA6D;
}
.instructors-table th {
  background-color: #f2f2f2;
}

.instructors-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.instructors-table tbody tr:nth-child(odd) {
  background-color: #fff;
}

.availability-list {
  list-style: none;
  padding: 0;
}

.no-availability {
  color: #888;
}



</style>
