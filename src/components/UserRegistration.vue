<template>
    <div>
        <h4>Login</h4>
        <form>
            <div>
                <label for="username">UserName</label>
                <input type="text" id="username" v-model="userRegisterRequest.username" />
            </div>
            <div>
                <label for="email">email</label>
                <input type="email" id="email" v-model="userRegisterRequest.email" />
            </div>
            <div>
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

<style>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>
