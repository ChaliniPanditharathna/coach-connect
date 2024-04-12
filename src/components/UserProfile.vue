<template>
  <div class="profile-container">
    <h1>Welcome, {{ username }}!</h1>
    <div v-if="isLoggedInInstructor" class="rating">{{ displayRating(rating) }}</div>

    <div class="user-details" v-if="userDetails">
      <p>User Details:</p>
      <div class="details-grid">
        <div class="detail-item">
          <label>First Name:</label>
          <div>{{ userDetails.fName }}</div>
        </div>
        <div class="detail-item">
          <label>Last Name:</label>
          <div>{{ userDetails.lName }}</div>
        </div>
        <div class="detail-item">
          <label>Email:</label>
          <div>{{ userDetails.email }}</div>
        </div>
        <div class="detail-item">
          <label>Gender:</label>
          <div>{{ userDetails.gender }}</div>
        </div>
        <div class="detail-item">
          <label>Birth Date:</label>
          <div>{{ userDetails.birthDate }}</div>
        </div>
        <div class="detail-item">
          <label>City:</label>
          <div>{{ userDetails.city }}</div>
        </div>
        <div class="detail-item">
          <label>Street:</label>
          <div>{{ userDetails.street }}</div>
        </div>
        <div class="detail-item">
          <label>Unit No:</label>
          <div>{{ userDetails.unitNo }}</div>
        </div>
        <div class="detail-item">
          <label>Postal Code:</label>
          <div>{{ userDetails.postalCode }}</div>
        </div>
        <div class="detail-item" v-if="isLoggedInClient">
          <label>Description:</label>
          <div>{{ userDetails.description }}</div>
        </div>
        <div class="detail-item" v-if="isLoggedInInstructor">
          <label>Expertise:</label>
          <div>{{ userDetails.expertise }}</div>
        </div>
        <div class="detail-item" v-if="isLoggedInInstructor">
          <label>Qualification:</label>
          <div>{{ userDetails.qualification }}</div>
        </div>
         <!-- New detail item for availability -->
         <div class="detail-item" v-if="isLoggedInInstructor">
          <label>Availability:</label>
          <div>
            <span v-for="(avail, index) in userDetails.availability" :key="index">
              {{ avail.weekDay }}: {{ formatTime(avail.startTime) }} - {{ formatTime(avail.endTime) }}
              <br>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <p>Please Update Your Profile Details!!!</p>
    </div>

    <div>
      <button @click="redirectToUpdateProfile" class="btn btn-primary">Update Profile</button>
    </div>
  </div>
</template>

<script>
import ProfileService from "../services/ProfileService";

export default {
  name: "UserProfile",
  data() {
    return {
      username: "",
      email: "",
      userDetails: null,
      userRole: "",
      isLoggedInInstructor: false,
      isLoggedInClient: false,
      rating: 0 // Initialize rating
    };
  },
  methods: {
    
    formatTime(time) {
      // Format time as needed, e.g., from "13:47:00" to "01:47 PM"
      const [hour, minute] = time.split(":");
      const formattedHour = parseInt(hour) % 12 || 12;
      const period = parseInt(hour) < 12 ? "AM" : "PM";
      return `${formattedHour}:${minute} ${period}`;
    },
    displayRating(rating) {
      if (rating && rating.length > 0) {
        let sum = rating.reduce((acc, curr) => acc + curr.value, 0);
        const averageRating = sum / rating.length;
        return '★'.repeat(averageRating) + '☆'.repeat(5 - averageRating);
      } else {
        return '☆'.repeat(5);
      }
    },
    redirectToUpdateProfile() {
      console.log("Redirecting to update profile...");
      localStorage.setItem("email", this.email);
      if (this.userRole === "ROLE_INSTRUCTOR") {
        console.log("Redirecting to InstructorProfileUpdate");
        this.$router.push({ name: "UpdateProfileInstructor" });
      } else if (this.userRole === "ROLE_CLIENT") {
        console.log("Redirecting to ClientProfileUpdate");
        this.$router.push({ name: "UpdateProfileClient" });
      } else {
        console.error("Invalid user role:", this.userRole);
      }
    },
    fetchUserDetails(userId, userRole) {
      let userDetailsPromise;
      if (userRole === "ROLE_INSTRUCTOR") {
        this.isLoggedInInstructor = true;
        userDetailsPromise = ProfileService.getInstructorDetails(userId);
      } else if (userRole === "ROLE_CLIENT") {
        this.isLoggedInClient=true;
        userDetailsPromise = ProfileService.getClientDetails(userId);
      }

      userDetailsPromise
        .then(response => {
          console.log("User details here!!!", response.data);
          this.userDetails = response.data;
          this.rating = response.data.rating;
        })
        .catch(error => {
          console.error("Error fetching user details:", error);
        });
    }
  },
  mounted() {
    console.log("UserProfile mounted");
    this.username = localStorage.getItem("username");
    this.email = localStorage.getItem("email");
    this.userRole = localStorage.getItem("userRole");
    console.log("Username:", this.username);
    console.log("Email:", this.email);
    console.log("User role:", this.userRole);

    const userId = localStorage.getItem("userid");
    const userRole = localStorage.getItem("userRole");
    if (userId && userRole) {
      this.fetchUserDetails(userId, userRole);
    }
  }
};
</script>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: auto;
  margin-top: 50px;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.rating {
  font-size: 24px;
  margin-top: 10px;
}

.user-details {
  margin-top: 20px;
}

.details-grid {
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-row-gap: 8px;
}

.detail-item {
  display: flex;
}

.detail-item label {
  flex-shrink: 0;
  width: 150px; /* Adjust width as needed */
  text-align: left; /* Align labels to the left */
  margin-left: 20px;
  font-weight: bold; /* Make labels bold */
}

.detail-item div {
  padding: 4px 0; /* Add padding to data */
}

.btn {
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #0056b3;
}
</style>
