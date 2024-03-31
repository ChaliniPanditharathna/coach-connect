import http from "../http-common.js";

class InstructorService {
    getDataBySearch(searchKey) {
        const params = new URLSearchParams();
        params.append('searchKey', searchKey);
        return http.get("/instructor",{ params });
    }
    getData() {
        return http.get("/instructor");
    }

}

export default new InstructorService();

