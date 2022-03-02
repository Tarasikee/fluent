import axios from "axios";

export class AuthService {
    static baseURL = 'http://localhost:5000/api/';

    static login(email: string, password: string) {
        return axios.post(AuthService.baseURL + 'auth/login', {email, password});
    }

    static register(email: string, password: string) {
        return axios.post(AuthService.baseURL + 'auth/register', {email, password});
    }

    static async check(token: string) {
        return axios.post(AuthService.baseURL + 'auth/check', undefined, {
            headers: {
                authorization: token
            }
        });
    }
}
