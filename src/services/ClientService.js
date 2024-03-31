import http from "../http-common.js";

class ClientService {
    getClientData(userId) {
        return http.get(`/client/${userId}` );
    }

}

export default new ClientService();

