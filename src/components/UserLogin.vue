<template>
    <!-- define the layout -->
    <div class="login-container">
      <h4>Login</h4>
      <form>
        <div class="form-group">
          <label for="username">UserName</label>
          <input type="text" id="username" v-model="userLoginRequest.username" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="userLoginRequest.password"
          />
        </div>
      </form>
  
      <button @click="login">Login</button>
      <button @click="signUp">Sign Up</button>
      <p>{{ message }}</p>
    </div>
  </template>
  
  <script>
  import LoginService from "../services/LoginService";
  import InstructorService from "@/services/InstructorService";
  import ClientService from '@/services/ClientService';
  export default {
    name: "userLogin",
    data() {
      // data or variables used
      return {
        userLoginRequest: { username: "", password: "" }, // json
        message: "",
        instructors: [],
      };
    },
    methods: {
      login() {
        LoginService.login(this.userLoginRequest)
          .then((response) => {
            // HttpStatus.OK
            var user = response.data;
            this.$router.push({ name: "login" });
            localStorage.setItem("username", user.username);
            localStorage.setItem("email", user.email);
  
            localStorage.setItem("userRole", user.roles);
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("userid", user.id);
            localStorage.setItem("isDone", true);
            const userRole = localStorage.getItem("userRole");
            if (userRole === "ROLE_INSTRUCTOR") {
              InstructorService.getData()
                .then((response) => {
                  if (response && response.data) {
                    this.message = response.data.message;
                    if (this.message === "No instructors.") {
                      this.$router.push("/profile");
                    } else {
                      this.instructors = response.data;
                      const foundInstructor = this.instructors.instructors.find(
                        (instructor) =>
                          instructor.userId == localStorage.getItem("userid")
                      );
                      if (foundInstructor) {
                        this.$router.push("/instructorhome");
                      } else {
                        this.$router.push("/profile");
                      }
                    }
                  } else {
                    console.error("Invalid response format:", response);
                  }
                })
                .catch((e) => {
                  console.error("Error fetching instructors:", e);
                });
            }
            if (userRole === "ROLE_CLIENT") {
              const userId = localStorage.getItem("userid");
              ClientService.getClientData(userId)
                .then((response) => {
                  if (response && response.data) {
                   const clientId = response.data.id;
                    if(clientId !==null ){
                      this.$router.push("/clienthome")
                    }else {
                      this.$router.push("/profile");
                    }
                  } else {
                    this.$router.push("/profile");
                  }
                })
                .catch((e) => {
                  console.error("Error fetching client:", e);
                });
            }
          })
          .catch((e) => {
            this.userLoginRequest.username = "";
            this.userLoginRequest.password = "";
            this.message = e.response.data.message;
            console.log(e.response.data);
          });
        this.$emit("loggedIn");
      },
      signUp() {
        // Logic when 'I am a Client' is clicked
        // For example, navigate to client-specific page:
        this.$router.push("/signup");
      },
    },
    mounted() {
      // called when component is loaded
      this.message = "";
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 300px;
    margin: auto;
    margin-top: 50px;
    padding: 50px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .login-container h4 {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #555;
    font-size: 16px;
    padding-bottom: 10px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .form-group input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 10px 20px;
    margin-top: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #007bff;
    color: #fff;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  