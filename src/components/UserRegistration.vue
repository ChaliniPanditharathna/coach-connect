<template>
    <!-- define the layout -->
    <div>
        <h4>Login</h4>
        <form>
            <div>
                <label for="username">UserName</label>
                <input type="text" id="username" v-model="userLoginRequest.username" />
            </div>
            <div>
                <label for="email">email</label>
                <input type="email" id="email" v-model="userLoginRequest.email" />
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" id="password" v-model="userLoginRequest.password" />
            </div>
            
        </form>

        <button type="submit" @click="register">Register</button>
        <p>{{ message }}</p>
    </div>
</template>

<script>

import LoginService from "../services/LoginService";

export default {
    name: "userLogin",
    data() {            // data or variables used
        return {
            userLoginRequest: { username: "", password: "", email: "" },  // json
            message: ""
        };
    },
    methods: {
        login() {
            LoginService.login(this.userLoginRequest)
                .then(response => {       // HttpStatus.OK
                    var user = response.data;
                    console.log(user);
                    //localStorage.setItem("uusername", user.username);
                
                    this.$router.push({ name: "login" });
                })
                .catch(e => {
                    this.userLoginRequest.us = "";
                    this.userLoginRequest.password = "";
                    this.message = e.response.data.message;
                    console.log(e.response.data);
                });
        },
        register() {
      // Logic when 'I am a Client' is clicked
      // For example, navigate to client-specific page:
       this.$router.push('/login');
    }
    },
    mounted() {   // called when component is loaded
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
