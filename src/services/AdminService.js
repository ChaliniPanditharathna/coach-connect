import http from "../http-common.js";

class AdminService {
    approveInstructor(instructorId) {
        return http.put(`/approve-instructor/${instructorId}`);
    }
    deactivateInstructor(instructorId) {
        return http.put(`/deactivate-instructor/${instructorId}`);
    }


}

export default new AdminService();