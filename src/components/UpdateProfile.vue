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
    name: "UpdateProfile",
    data() {
      return {
        profileUpdateRequest: {
          fName: "",
          lName: "",
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
            this.clearForm(); 
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
  };
  </script>
  
  <style scoped>
  .update-profile-container {
    max-width: 500px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f7f7f7;
  }
  
  .update-profile-form {
    margin-top: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #007bff;
    color: #fff;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
  }
  </style>