<template>
  <div class="registration-container">
    <h4>Login</h4>
    <form>
      <div class="form-group">
        <label for="username">UserName</label>
        <input type="text" id="username" v-model="userRegisterRequest.username" />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="userRegisterRequest.email" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="userRegisterRequest.password" />
      </div>
    </form>

    <button type="submit" @click="register">Register</button>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import RegistrationService from '../services/RegisterationService';

export default {
  name: "userRegistration",
  data() {
    return {
      userRegisterRequest: {
        username: "",
        email: "",
        password: "",
        role: "" 
      },
      message: ""
    };
  },
  created() {
    const role = this.$route.query.role;
    if (role === 'client') {
      this.userRegisterRequest.role = ["ROLE_CLIENT"];
    } else if (role === 'instructor') {
      this.userRegisterRequest.role = ["ROLE_INSTRUCTOR"];
    }
  },
  methods: {
    register() {
      console.log(this.userRegisterRequest.username); 
      RegistrationService.registerClient(this.userRegisterRequest)
        .then(response => {
          this.message = response.data.message;
          this.$router.push({ name: "login" });
        })
        .catch(e => {
          this.message = e.response.data.message;
          console.log(e.response.data);
        });
    }
  },
  mounted() {
    this.message = "";
  }
};
</script>

<style scoped>
.registration-container {
  max-width: 300px;
    margin: auto;
    margin-top: 50px;
    padding: 0 50px 50px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

p {
  margin-top: 10px;
  text-align: center;
}
</style>
