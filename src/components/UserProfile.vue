<template>
    <div>
        <h1>Welcome, {{ username }}!</h1>
        <div v-if="isLoggedInInstructor" style="display: block;">{{ displayRating(rating) }}</div>
    </div>
      <!-- Display user details if available -->
      <div v-if="userDetails">
        <p>User Details:</p>
        <p>First Name: {{ userDetails.fName }}</p>
        <p>Last Name: {{ userDetails.lName }}</p>
        <p>Email: {{ userDetails.email }}</p>
        <p>Gender: {{ userDetails.gender }}</p>
        <p>Birth Date: {{ userDetails.birthDate }}</p>
        <p>City: {{ userDetails.city }}</p>
        <p>Street: {{ userDetails.street }}</p>
        <p>Unit No: {{ userDetails.unitNo }}</p>
        <p>Postal Code: {{ userDetails.postalCode }}</p>
        <p>Description: {{ userDetails.description }}</p>
        <!-- Add more details as needed -->
      </div>
      <!-- Show loading message while data is being fetched -->
      <div v-else>
        <p>Please Update Your Profile Details!!!</p>
      </div>
        <div>
        <button @click="redirectToUpdateProfile" class="btn btn-primary">Update Profile</button>
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
        isLoggedInInstructor:false,
      };
    },

    methods: {
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
      },

      redirectToUpdateProfile() {
        console.log("Redirecting to update profile...");
        localStorage.setItem("email",this.email);
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
      // Function to fetch user details from backend API based on user's role
          fetchUserDetails(userId, userRole) {
          let userDetailsPromise;
          if (userRole === "ROLE_INSTRUCTOR") {
            this.isLoggedInInstructor = true;
            userDetailsPromise = ProfileService.getInstructorDetails(userId);
          } else if (userRole === "ROLE_CLIENT") {
            userDetailsPromise = ProfileService.getClientDetails(userId);
          }

      userDetailsPromise
        .then(response => {
          console.log("User details here!!!", response.data);
          this.userDetails = response.data; // Set userDetails to the fetched data
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
        

          // Assuming userId and userRole are available in localStorage
      const userId = localStorage.getItem("userid");
      const userRole = localStorage.getItem("userRole");
      if (userId && userRole) {
        this.fetchUserDetails(userId, userRole);
      }
    },
};

  </script>
  
  <style scoped>
 .profile-container {
  max-width: 600px;
  margin: 50px auto; /* Added margin */
  padding: 30px;
  border: 2px solid #4CAF50;
  border-radius: 10px;
  background-color: #f0f0f0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.user-details {
  margin-top: 30px;
}

.user-details p {
  margin-bottom: 15px;
  font-size: 16px;
}

.btn {
  margin-top: 30px;
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  background-color: #1500ff;
  color: #fff;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #00e1f5;
}

  </style>