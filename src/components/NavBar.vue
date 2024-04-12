<template>
  <nav class="navbar">
    <a href="#home" v-if="!isLoggedIn && (!isLoggedClient || !isLoggedInstructor) " class="nav-item">Home</a>
    <router-link  v-if="isLoggedClient &&  isLoggedIn" to="/clienthome" class="nav-item">Home</router-link>
    <router-link  v-if="isLoggedInstructor  && isLoggedIn" to="/instructorhome" class="nav-item">Home</router-link>
    <router-link v-if="isLoggedIn" to="/profile" class="nav-item">My Profile</router-link>
    <!--<a href="#profile" class="nav-item">My Profile</a>-->
    <router-link  v-if="isLoggedIn" to="/appointment" class="nav-item">Appointments</router-link>
  
    <div class="auth-buttons">
      <button @click="goToLogin" :disabled="isLoggedIn" >Login</button>
      <!-- <button @click="goToSignUp">Sign Up</button> -->
      <button @click="logout" >Logout</button>
    </div>
  </nav>
</template>

<script>
import LoginService from "../services/LoginService";

export default {
  name: 'NavBar',
  
  data() {
    return {
      isLoggedIn: false ,
      isLoggedInstructor:false,
      isLoggedClient:false,
    };
  },  
  created() {
    this.isLoggedIn = localStorage.getItem('isLoggedIn'); 
    if( localStorage.getItem("userRole") == "ROLE_INSTRUCTOR"){
        this.isLoggedInstructor= true;
      }
      if( localStorage.getItem("userRole") == "ROLE_CLIENT"){
        console.log("Ima here")
        this.isLoggedClient= true;
      }
      console.log("upadte values", localStorage.getItem("userRole") )
  },

  methods: {
    goToLogin() {
      this.$router.push('/login').then(() => {
      this.isLoggedIn= localStorage.getItem("isLoggedIn");
      if( localStorage.getItem("userRole") == "ROLE_INSTRUCTOR"){
        this.isLoggedInstructor= true;
      }
      if( localStorage.getItem("userRole") == "ROLE_CLIENT"){
        console.log("Ima here")
        this.isLoggedClient= true;
      }
    });
    },
    logout() {
            LoginService.logout()
                .then(response => {       
                    var user = response.data;
                 alert(user.message);
                 this.isLoggedIn = false; 
              this.$router.push('/');
                })
                .catch(e => {
                    console.log(e.response.data);
                });
        },
    goToSignUp() {
      // Define navigation to the sign-up page
      // this.$router.push('/signup');
    },
    
  }
};
</script>

<style scoped>
.navbar {
  background-color: #333;
  overflow: hidden;
}

.nav-item {
  float: left;
  display: block;
  color: white;
  text-align: center;
  padding: 14px 20px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.nav-item:hover {
  background-color: #555;
}

@media screen and (max-width: 600px) {
  .nav-item {
    float: none;
    width: 100%;
    text-align: left;
  }
}

.auth-buttons {
  float: right; /* Align button container to the right */
}

button {
  margin-top: 10px;
  padding: 8px 15px;
  border: 2px solid #fff; /* White border for the buttons */
  background-color: transparent;
  color: #fff;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
}

button:hover {
  background-color: #fff;
  color: #000;
}
</style>
