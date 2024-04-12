import http from "../http-common.js";

class InstructorService {
    getDataBySearch(searchKey) {
     
        console.log('searchKey', searchKey);
        return http.get(`/instructor?searchKey=${searchKey}`);
    }
    getData() {
        return http.get("/instructor");
    }
    getInstructorData(userId) {
        return http.get(`/instructor/${userId}` );
    }

}

export default new InstructorService();

