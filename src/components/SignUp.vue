<template>
  <div class="home-container">

       <div class="button-container">
      <button @click="clientSelected">I am a Client</button>
      <button @click="instructorSelected">I am an Instructor</button>
    </div>
  
    
  
  </div>
</template>

<script>
export default {
  name: 'HomePage',
    methods: {
    clientSelected() {
      this.$router.push({ path: '/register', query: { role: 'client' } });
    },
    instructorSelected() {
      this.$router.push({ path: '/register', query: { role: 'instructor' } });
    }
  }
};
</script>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('@/assets/images/homePic.jpg'); /* Replace with your image path */
  background-size: cover;
  background-position: center;
}

.button-container {
  text-align: center;
}

button {
  margin: 10px;
  padding: 10px 20px;
  border: 2px solid transparent;
  border-radius: 25px;
  outline: none;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  background-color: #1565C0;
}

button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  padding: 40%;
  transition: all 0.3s ease;
}

button:hover::before {
  padding: 0;
  scale: 1;
}

button:hover {
  border: 2px solid white;
}
</style>