<template>
    <div class="update-profile-container">
      <h4>Update Profile</h4>
      <form @submit.prevent="updateProfile" class="update-profile-form">
        <div class="form-group">
          <label for="fName">First Name</label>
          <input type="text" id="fName" v-model="profileUpdateRequest.fName" class="form-control" />
        </div>
        <div class="form-group">
          <label for="lName">Last Name</label>
          <input type="text" id="lName" v-model="profileUpdateRequest.lName" class="form-control" />
        </div>
        <div class="form-group">
          <label for="birthDate">Birth Date</label>
          <input type="date" id="birthDate" v-model="profileUpdateRequest.birthDate" class="form-control" />
        </div>
        <div class="form-group">
          <label for="gender">Gender</label>
          <select id="gender" v-model="profileUpdateRequest.gender" class="form-control">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div class="form-group">
          <label for="unitNo">Unit No</label>
          <input type="text" id="unitNo" v-model="profileUpdateRequest.unitNo" class="form-control" />
        </div>
        <div class="form-group">
          <label for="street">Street</label>
          <input type="text" id="street" v-model="profileUpdateRequest.street" class="form-control" />
        </div>
        <div class="form-group">
          <label for="city">City</label>
          <input type="text" id="city" v-model="profileUpdateRequest.city" class="form-control" />
        </div>
        <div class="form-group">
          <label for="postalCode">Postal Code</label>
          <input type="text" id="postalCode" v-model="profileUpdateRequest.postalCode" class="form-control" />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" v-model="profileUpdateRequest.description" class="form-control"></textarea>
        </div>
  
        <button type="submit" class="btn btn-primary">Update Profile</button>
      </form>

        <div v-if="successMessage" class="success-message">
        {{ successMessage }}
        </div>
        <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
        </div>
    </div>
  </template>
  
  <script>
  import ProfileService from "../services/ProfileService";
  
  export default {
    name: "ClientProfileUpdate",
    data() {
      return {
        profileUpdateRequest: {
          fName: "",
          lName: "",
          email : localStorage.getItem("email"),
          birthDate: "",
          gender: "",
          unitNo: "",
          street: "",
          city: "",
          postalCode: "",
          description: "",
        },
        successMessage: "", 
        errorMessage: "", 
      };
    },
    methods: {
      updateProfile() {
        const id = localStorage.getItem("userid");
        ProfileService.updateProfileDetails(id, this.profileUpdateRequest)
          .then(response => {
            console.log(response.data);
            this.successMessage = "Updated Successfully";
            alert("Sucessfully update the records");
            this.clearForm();
            this.$router.push("/clienthome");
          })
          .catch(error => {
            console.error(error);
            this.successMessage = ""; 
            this.errorMessage = "Update Failed"; 
          });
      },
        clearForm() {
        Object.keys(this.profileUpdateRequest).forEach(key => {
            this.profileUpdateRequest[key] = "";
        });
        },
    },
    mounted() {
    const userId = localStorage.getItem("userid");
    ProfileService.getClientDetails(userId)
      .then(response => {
        const clientDetails = response.data;
        this.profileUpdateRequest = { ...this.profileUpdateRequest, ...clientDetails };
      })
      .catch(error => {
        console.error("Error fetching client details:", error);
      });
  },
  };
  </script>
  
  <style scoped>
  /* Styles for the form container */
  .update-profile-container {
    max-width: 700px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  /* Styles for form headings */
  h4 {
    margin-bottom: 20px;
  }
  
  /* Styles for form fields */
  .form-group {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .form-group label {
    flex: 1;
    margin-right: 10px; /* Adjust margin as needed */
    text-align: left; /* Align label text to the left */
  }
  
  .form-group input,
  .form-group select,
  .form-group textarea {
    flex: 2;
  }
  /* Styles for availability section */
  .availability-section {
    border-top: 1px solid #ccc; /* Add a border at the top */
    padding-top: 20px; /* Add some padding at the top */
  }
  
  /* Styles for availability group */
  .availability-group {
    margin-bottom: 20px;
  }
  
  /* Styles for availability heading */
  .availability-heading {
    margin-bottom: 10px;
  }
  
  /* Styles for success message */
  .success-message,
  .error-message {
    margin-top: 20px;
    padding: 10px;
    border-radius: 5px;
  }
  .success-message {
    background-color: #d4edda;
    color: #155724;
  }
  .error-message {
    background-color: #f8d7da;
    color: #721c24;
  }
  
  
  </style>
