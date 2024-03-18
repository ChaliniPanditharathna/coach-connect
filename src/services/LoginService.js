import http from "../http-common.js";


class LoginService {
    login(data){
        return http.post("/login",data);
    }
    // POST http://localhost:8080/api/login 
    

}

export default new LoginService();