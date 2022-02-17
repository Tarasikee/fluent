import axios from "axios";
import {baseURL} from "./index";

export async function login(email: string, password: string) {
    return await axios.post(baseURL + 'auth/login', {email, password});
}
