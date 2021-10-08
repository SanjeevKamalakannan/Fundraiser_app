import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }
  fetchStartup(id) {
    return axios.post(API_URL + "user/startup", {id} ,{ headers: authHeader() });
  }
  update(id , data , yourfund) {
    return axios.post(API_URL + "user/startup/update", {id ,data , yourfund} , { headers: authHeader() });
  }
  editstartup(id , data) {
    return axios.post(API_URL + "user/profile/startup/update", {id ,data} , { headers: authHeader() });
  }
  addstartup(data,id) {
    return axios.post(API_URL + "user/profile/addStartup", { data , id} , { headers: authHeader() });
  }
  deletestartup(id) {
    return axios.post(API_URL + "admin/deleteStartup", {id} , { headers: authHeader() });
  }
  getUserStartups(id) {
    return axios.post(API_URL + "user/profile", {id} ,{ headers: authHeader() });
  }

}

export default new UserService();
