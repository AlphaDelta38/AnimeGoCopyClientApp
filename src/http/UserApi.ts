import {AuthTokenInterface, UserRegistrationDataInteraface} from "../types";
import {$authHost, $host} from "./index";
import {AxiosResponse} from "axios";
import {jwtDecode} from "jwt-decode";


export const login = async (email:string, password:string)=>{
    try {
        const {data}: AxiosResponse = await $host.post("/auth/login", {email:email, password:password});
        localStorage.setItem("token", data.token);
        return jwtDecode(data.token)
    }catch(err){
    }
}


export const registration = async ({password, email}: UserRegistrationDataInteraface)=>{
    try {
        const {data}: AxiosResponse = await $host.post("/auth/registration", {email: email, password: password});
        localStorage.setItem("token", data.token);
        return jwtDecode(data.token)
    }catch(err){

    }
}


export const check = async ()=>{
    try {
        const {data}: AxiosResponse = await $authHost.post("/auth/checkAuth",  );
        localStorage.setItem("token", data.token);
        return jwtDecode(data.token)
    }catch (err){

    }
}