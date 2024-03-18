<template>
  <div id="app">
      <NavBar />
      <router-view />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
   name: 'App',
  components: {
    NavBar
  }
};
</script>

<style>
/* Global styles */
body, html {
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f4;
}

#app {
  text-align: center;
}

/* Navigation bar styles */
.navbar {
  background-color: #333;
  overflow: hidden;
  font-size: 17px;
}

.navbar a {
  float: left;
  display: block;
  color: white;
  text-align: center;
  padding: 14px 20px;
  text-decoration: none;
}

.navbar a:hover {
  background-color: #555;
}

/* Responsive layout for the navbar */
@media screen and (max-width: 600px) {
  .navbar a {
    float: none;
    width: 100%;
    text-align: left;
  }
}

/* Content styles */
.content {
  margin: 20px;
}

/* Additional global styles can be added here */

</style>