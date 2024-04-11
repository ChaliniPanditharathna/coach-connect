// ProfileService.js

import http from "../http-common";

class ProfileService {
  updateProfileDetails(id, profileUpdateRequest) {
    return http.post(`/updateProfile/${id}`, profileUpdateRequest);
  }
}

export default new ProfileService();
