import axios from "axios";

axios.defaults.baseURL = "http://172.21.64.1:8000/api/v1/";
axios.defaults.headers.post["Content-Type"] = "application/json";

export default axios;
