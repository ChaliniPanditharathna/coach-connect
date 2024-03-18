import axios from "axios";

export default axios.create({
    baseURL:"http://localhost:8080/api/coachconnect",
    header:{
        "Content-type":"application/json"
    }
})