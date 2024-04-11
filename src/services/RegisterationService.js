import http from "../http-common.js";

class RegistrationService {

    registerClient(data){
        return http.post("/register",data);
    }
}

export default new RegistrationService();