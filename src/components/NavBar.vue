<template>
  <nav class="navbar">
    <a href="#home" class="nav-item">Home</a>
    <a href="#services" class="nav-item">My Profile</a>
    <a href="#about" class="nav-item">Appointments</a>
    <a href="#contact" class="nav-item">SignOut</a>
    <div class="auth-buttons">
        <button @click="goToLogin">Login</button>
        <!-- This is a comment in HTML 
        <button @click="goToSignUp">SignUp</button>
        -->
        
      </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  // Any additional logic or data for your navbar can go here
  methods: {
    goToLogin() {
      // Define navigation to the login page
       this.$router.push('/login');
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
.auth-buttons button {
  margin-left: 10px;
  margin-top: 10px;
  padding: 8px 15px;
  border: 2px solid #fff; /* White border for the buttons */
  background-color: transparent;
  color: #fff;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
}

.auth-buttons button:hover {
  background-color: #fff;
  color: #000;
}
</style>