import http from "../http-common.js";

class InstructorService {
    getDataBySearch(searchKey) {
     
        console.log('searchKey', searchKey);
        return http.get(`/instructor?searchKey=${searchKey}`);
    }
    getData() {
        return http.get("/instructor");
    }

}

export default new InstructorService();

