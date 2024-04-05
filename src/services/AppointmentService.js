import http from "../http-common.js";


class AppointmentService {
    saveAppointment(data){
        console.log("data muy", data)
        return http.post("/appointment",data);
    }
    // POST http://localhost:8080/api/login 

    fetchInstructorAppointments(instructorId) {
        return http.get(`/appointment?instructorId=${instructorId}`);
      }
    
      // Approve a pending appointment
      approveAppointment(appointmentId) {
        console.log("Appointment id", appointmentId)
        return http.put('/appointment/approve', {
          "appointmentId": appointmentId
        });
      }

      //Reject Appointments
      rejectAppointment(appointmentId, rejectedReason) {
        console.log("Appointment id", appointmentId)
        const payload = {
            appointmentId: appointmentId,
            rejectedReason: rejectedReason
        };
        return http.put('/appointment/reject', payload);
    }
    

}

export default new AppointmentService();