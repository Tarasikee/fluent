import axios from "axios";
import {baseURL} from "./index";

export class AuthService {
    static async login(email: string, password: string) {
        return await axios.post(baseURL + 'auth/login', {email, password});
    }

    static async register(email: string, password: string) {
        return await axios.post(baseURL + 'auth/register', {email, password});
    }
}
