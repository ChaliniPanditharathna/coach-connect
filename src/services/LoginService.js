import http from "../http-common.js";


class LoginService {
    login(data){
        localStorage.setItem('isLoggedIn', true);
        return http.post("/login",data);
    }
    
    
    logout(){
        localStorage.removeItem('isLoggedIn');
        return http.post("/logout");
    }
    // POST http://localhost:8080/api/login 
    

}

export default new LoginService();