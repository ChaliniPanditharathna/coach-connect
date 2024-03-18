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
                <label for="password">Password</label>
                <input type="password" id="password" v-model="userLoginRequest.password" />
            </div>
        </form>

        <button type="submit" @click="login">Login</button>
        <button type="submit" @click="signUp">Sign Up</button>
        <p>{{ message }}</p>
    </div>
</template>

<script>
import LoginService from "../services/LoginService";

export default {
    name: "userLogin",
    data() {            // data or variables used
        return {
            userLoginRequest: { username: "", password: "" },  // json
            message: ""
        };
    },
    methods: {
        login() {
            LoginService.login(this.userLoginRequest)
                .then(response => {       // HttpStatus.OK
                    var user = response.data;
                    console.log(user);
                    this.$router.push({name:"login"});

                      localStorage.setItem("userRole", user.roles);
                 const userRole = localStorage.getItem("userRole");

                 if(userRole === "ROLE_INSTRUCTOR"){
                        this.$router.push('/instructorhome');
                 }else if(userRole === "ROLE_CLIENT"){
                       this.$router.push('/clienthome');
                 } else if(userRole === "ROLE_ADMIN"){
                      this.$router.push('/adminhome');
                 }
                 
                })
                .catch(e => {
                    this.userLoginRequest.username = "";
                    this.userLoginRequest.password = "";
                    this.message = e.response.data.message;
                    console.log(e.response.data);
                });
        },
        signUp() {
      // Logic when 'I am a Client' is clicked
      // For example, navigate to client-specific page:
       this.$router.push('/signup');
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
