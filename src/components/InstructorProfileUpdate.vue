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
      <div class="form-group">
        <label for="weekDay">Week Day</label>
        <input
          type="text"
          id="weekDay"
          v-model="weekDay"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="startTime">Start Time</label>
        <input
          type="time"
          id="startTime"
          v-model="startTime"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="endTime">End Time</label>
        <input
          type="time"
          id="endTime"
          v-model="endTime"
          class="form-control"
        />
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
  name: "InstructorProfileUpdate",
  data() {
    return {
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    updateProfile() {
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
        instructorAvailability: {
          // Add instructorAvailability object with default values
          weekDay: this.weekDay,
          startTime: this.startTime + ":00",
          endTime: this.endTime + ":00",
        },
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
