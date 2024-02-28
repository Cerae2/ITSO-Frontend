import axios from "axios";

axios.defaults.baseURL = "http://172.20.143.30:8000/api/v1/";
axios.defaults.headers.post["Content-Type"] = "application/json";

export default axios;
