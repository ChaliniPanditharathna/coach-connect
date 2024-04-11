import http from "../http-common.js";


class RatingService {
    submitRating(data){
        return http.post("/rating",data);
    }

    getRatingByClientId(data){
        return http.get("/ratings/client",data);
    }
    updateRating(data){
        return http.put("/update/rating",data);
    }
    
    

}

export default new RatingService();