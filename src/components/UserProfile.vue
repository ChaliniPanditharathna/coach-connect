<template>
    <div>
        <h1>Welcome, {{ username }}!</h1>
    </div>
    <div>
        <button @click="redirectToUpdateProfile" class="btn btn-primary">Update Profile</button>
    </div>
    
</template>
  
  <script>
    export default {
    name: "UserProfile",
    data() {
        return {
            username: "",
            email: "",
        };
    },

    methods: {
    redirectToUpdateProfile() {
      this.$router.push({ name: "UpdateProfile" });
    },
  },

    mounted() {
        console.log("UserProfile mounted"); 
        this.username = localStorage.getItem("username");
        this.email = localStorage.getItem("email");
        console.log("Username:", this.username); 
        console.log("Email:", this.email); 
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
  