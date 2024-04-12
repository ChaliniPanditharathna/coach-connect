// ProfileService.js

import http from "../http-common";

class ProfileService {
  updateProfileDetails(id, profileUpdateRequest) {
    return http.post(`/updateProfile/${id}`, profileUpdateRequest);
  }

  getClientDetails(userId) {
    return http.get(`/client/${userId}`);
  }

  getInstructorDetails(userId) {
    return http.get(`/instructor/${userId}`);
  }
}

export default new ProfileService();
