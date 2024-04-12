<template>
  <div class="update-profile-container">
    <h4>Update Profile</h4>
    <form @submit.prevent="updateProfile" class="update-profile-form">
      <div class="form-group">
        <label for="fName">First Name</label>
        <input type="text" id="fName" v-model="fName" class="form-control" />
      </div>
      <div class="form-group">
        <label for="lName">Last Name</label>
        <input type="text" id="lName" v-model="lName" class="form-control" />
      </div>
      <div class="form-group">
        <label for="birthDate">Birth Date</label>
        <input
          type="date"
          id="birthDate"
          v-model="birthDate"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="gender">Gender</label>
        <select id="gender" v-model="gender" class="form-control">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div class="form-group">
        <label for="unitNo">Unit No</label>
        <input type="text" id="unitNo" v-model="unitNo" class="form-control" />
      </div>
      <div class="form-group">
        <label for="street">Street</label>
        <input type="text" id="street" v-model="street" class="form-control" />
      </div>
      <div class="form-group">
        <label for="city">City</label>
        <input type="text" id="city" v-model="city" class="form-control" />
      </div>
      <div class="form-group">
        <label for="postalCode">Postal Code</label>
        <input
          type="text"
          id="postalCode"
          v-model="postalCode"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="description"
          class="form-control"
        ></textarea>
      </div>
      <!-- New instructor availability fields -->
      <div class="availability-section">
  <!-- New instructor availability fields -->
  <div v-for="(availability, index) in instructorAvailabilities" :key="index">
    <div class="availability-group">
      <h5 class="availability-heading">Availability {{ index + 1 }}</h5>
      <div class="form-group">
        <label for="weekDay">Week Day</label>
        <input type="text" v-model="availability.weekDay" class="form-control" />
      </div>
      <div class="form-group">
        <label for="startTime">Start Time</label>
        <input type="time" v-model="availability.startTime" class="form-control" />
      </div>
      <div class="form-group">
        <label for="endTime">End Time</label>
        <input type="time" v-model="availability.endTime" class="form-control" />
      </div>
    </div>
  </div>
</div>

      <button type="button" @click="addAvailability" class="btn btn-secondary">Add Availability</button>


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
  name: "InstructorProfileUpdate",
  data() {
    return {
      successMessage: "",
      errorMessage: "",
      instructorAvailabilities: [{ weekDay: "", startTime: "", endTime: "" }]
    };
  },
  create(){
  localStorage.setItem("isLoggedIn", true);
},
  methods: {
    addAvailability() {
      this.instructorAvailabilities.push({ weekDay: "", startTime: "", endTime: "" });
    },

  
    updateProfile() {
      this.instructorAvailabilities.forEach((availability) => {
    availability.startTime += ":00";
    availability.endTime += ":00";
  });
      const profileUpdateRequest = {
        fName: this.fName,
        lName: this.lName,
        email : localStorage.getItem("email"),
        gender: this.gender,
        unitNo: this.unitNo,
        street: this.street,
        city: this.city,
        birthDate: this.birthDate,
        postalCode: this.postalCode,
        description: this.description,
        instructorAvailability: this.instructorAvailabilities,
      };
      const id = localStorage.getItem("userid");
      console.log("Print log33", profileUpdateRequest);
      ProfileService.updateProfileDetails(id, profileUpdateRequest)
        .then((response) => {
          console.log(response.data);
          this.successMessage = "Updated Successfully";
          alert("Sucessfully update the records");
          this.clearForm();
          this.$router.push("/instructorhome");
        })
        .catch((error) => {
          console.error(error);
          this.successMessage = "";
          this.errorMessage = "Update Failed";
        });
    },
    clearForm() {
      this.fName = "";
      this.lName = "";
      this.gender = "";
      this.unitNo = "";
      this.street = "";
      this.city = "";
      this.birthDate = ""; // Assuming birthDate is a part of the form
      this.postalCode = "";
      this.description = "";
      this.weekDay = "";
      this.startTime = "";
      this.endTime = "";
    },
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
  padding: 6px; 
}

.form-group textarea {
  height: 100px; /* Adjust the height as needed */
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