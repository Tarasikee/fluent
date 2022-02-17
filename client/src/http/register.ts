import axios from "axios";
import {baseURL} from "./index";

export async function register(email: string, password: string) {
    return await axios.post(baseURL + 'auth/register', {email, password});
}
