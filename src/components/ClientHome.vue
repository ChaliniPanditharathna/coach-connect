<template>
  <div class="instructors-page">
    <h1>Instructors List</h1>
    <div class="search-container">
      <input type="text" v-model="searchQuery" @input="fetchInstructors" placeholder="Search by city or expertise" class="search-input">
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
          <th>Rate this instructor</th> <!-- Added rating column -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="instructor in instructors" :key="instructor.id">
          <td>{{ instructor.fName }} {{ instructor.lName }} <div style="display: block;">{{ displayRating(instructor.rating) }}</div></td>
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
          <td>   <button @click="openModal(instructor)" class="book-button" :disabled="instructor.appointmentBooked">Book Appointment</button>
        
         </td>
        
         <td>
          <div class="rating">
            <span v-for="star in 5" :key="star" @click="rateInstructor(instructor.id, star)" :class="{ 'rated': star <= instructor.rating, 'active': star <= instructor.clickedRating }">&#9733;</span> </div>
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
import RatingService from '@/services/RatingService';
import ClientService from '@/services/ClientService';
export default {
  name: 'ClientHome',
  components: {
    AppointmentBook
  },
  data() {
    return {
      instructors: [],
      ratingValue:'',
      searchQuery: '',
      isModalOpen: false,
      selectedInstructor: null,
      selectedTimeSlot: null,
      timeSlots: [],
      appointmentBooked:false,
      clientId: null,
      hasRating:false,
    };
  },
  created() {
    this.fetchInstructors();
   
  },
  methods: {
    setReloadTimeout(time) {
      setTimeout(() => {
        window.location.reload();
      }, time);
    },
    fetchInstructors() {
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
        InstructorService.getDataBySearch( this.searchQuery  )
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
      this.selectedInstructor.appointmentBooked = true;
      this.isModalOpen = false;
     
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
    
    rateInstructor(instructorId, rating) {
      const ratingData = {
        "value":rating ,
        "instructorId":instructorId,
        "clientId":  this.clientId 
      }
      // Call backend API to submit rating
  // Call backend API to submit rating
  RatingService.updateRating(ratingData)
    .then(response => {
      this.ratingValue = response.data.rating;
      const updatedInstructor = this.instructors.find(instructor => instructor.id === instructorId);
      if (updatedInstructor) {
        updatedInstructor.rating = response.data.rating;
        updatedInstructor.clickedRating = rating;
      }
     
      this.setReloadTimeout(60*5)
    
    })
    .catch(error => {
      console.error("Error submitting rating:", error);
    });
    
},
displayRating(rating) {
  if (rating && rating.length > 0) {
        let sum = 0;
        for (let i = 0; i < rating.length; i++) {
          sum += rating[i].value;
        }
        const averageRating = sum / rating.length;
        return '★'.repeat(averageRating) + '☆'.repeat(5 - averageRating);
      } else {
        return '☆'.repeat(5);
      }
    }
  },mounted() {
    this.getClientId();
  }
};
</script>

<style scoped>
/* Add this CSS to your component's style section or to your global CSS */
.instructors-page {
  width: 95%;
  margin: 0 auto;
}

.search-container {
  margin-bottom: 20px;
  width: 100%; 
}

.search-input {
  width: calc(100% - 22px); 
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

.rating {
  color: #808080;
  font-size: 24px;
}

.rating .rated {
  color: #ffcc00;
}

.rating .active {
  color: #ffcc00;
}
</style>









