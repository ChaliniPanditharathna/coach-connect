<template>
    <div>
        <h1>Welcome, {{ username }}!</h1>
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
        userRole: ""
      };
    },

    methods: {
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
            userDetailsPromise = ProfileService.getInstructorDetails(userId);
          } else if (userRole === "ROLE_CLIENT") {
            userDetailsPromise = ProfileService.getClientDetails(userId);
          }

      userDetailsPromise
        .then(response => {
          console.log("User details here!!!", response.data);
          this.userDetails = response.data; // Set userDetails to the fetched data
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
    max-width: 500px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  
  .profile-form {
    margin-top: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-control {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .btn {
    padding: 8px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #007bff;
    color: #fff;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
  }
  </style>
  