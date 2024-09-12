import {
    AuthTokenInterface,
    userDataAuthAndRegistation,
    UserRegistrationDataInteraface,
    userSettingCurrentState
} from "../types";
import {$authHost, $host} from "./index";
import {AxiosResponse} from "axios";
import {jwtDecode} from "jwt-decode";


export const login = async (email:string, password:string): Promise<userDataAuthAndRegistation | undefined>=>{
    try {
        const {data}: AxiosResponse = await $host.post("/auth/login", {email:email, password:password});
        localStorage.setItem("token", data.token);
        return jwtDecode(data.token)
    }catch(err){
    }
}


export const registration = async ({password, email, login}: UserRegistrationDataInteraface): Promise<userDataAuthAndRegistation | undefined> =>{
    try {
        const {data}: AxiosResponse = await $host.post("/auth/registration", {email: email, password: password, name: login});
        localStorage.setItem("token", data.token);
        return jwtDecode(data.token)
    }catch(err){

    }
}


export const check = async (): Promise<userDataAuthAndRegistation | undefined>=>{
    try {
        const {data}: AxiosResponse = await $authHost.post("/auth/checkAuth",  );
        localStorage.setItem("token", data.token);
        return jwtDecode(data.token)
    }catch (err){

    }
}

export const updateUSer = async (userDate: userSettingCurrentState ): Promise<userDataAuthAndRegistation | undefined>=>{
    try {
        const {data}: AxiosResponse = await $authHost.put("/users/update", {id: userDate.id, ...userDate.aboutUser, birthDayDate: userDate.aboutUser.birthday , name: userDate.name, email: userDate.email, ...userDate.accessRule} );
        localStorage.setItem("token", data.token);
        return jwtDecode(data.token);
    }catch (err){

    }
}