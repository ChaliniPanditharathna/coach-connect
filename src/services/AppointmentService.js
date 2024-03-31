import http from "../http-common.js";


class AppointmentService {
    saveAppointment(data){
        console.log("data muy", data)
        return http.post("/appointment",data);
    }
    // POST http://localhost:8080/api/login 
    

}

export default new AppointmentService();