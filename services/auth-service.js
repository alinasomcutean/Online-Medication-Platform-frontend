import axios from "axios";
import {HOST} from '../commons/hosts';

class AuthService {
    login(username, password) {
        console.log("login");
        return axios
            .post(HOST.backend_api + "/login", {
                username,
                password
            })
            .then(response => {
                if(response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            })
    }

    logout() {
        console.log("logout");
        localStorage.removeItem("user");
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();