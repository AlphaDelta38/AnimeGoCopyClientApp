import {
    animeStatusResponse,
    getOneUserInterFace, starsOfuser,
    updateProfileRequestTypes,
    userDataAuthAndRegistation, userMessagesInterface,
    UserRegistrationDataInteraface,
    userSettingCurrentState,
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

export const updateProfilePhoto = async ({id, image}: updateProfileRequestTypes): Promise<string> =>{
    try {
        const  {data}: AxiosResponse = await $authHost.put(`/users/update/photo/${id}`, {image: image}, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return data;
    }catch (e){

    }
    return ""
}

export const updateBackGroundPhoto = async ({id, image}: updateProfileRequestTypes): Promise<string> =>{
    try {
        const  {data}: AxiosResponse = await $authHost.put(`/users/update/background/${id}`, {image: image}, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return data;
    }catch (e){

    }
    return ""
}

export const getOneUser = async (id:number): Promise<getOneUserInterFace | undefined>  =>{
    try {
        const  {data}: AxiosResponse<getOneUserInterFace, any> = await $host.get(`/users/${id}`);
        return data;
    }catch (e){
       return undefined
    }
}

export const getallWatchStatusOfUser = async (id:number): Promise<animeStatusResponse[] | undefined>  =>{
    try {
        const  {data}: AxiosResponse<animeStatusResponse[], any> = await $host.get(`/watchstatus/${id}`);
        return data;
    }catch (e){
        return undefined
    }
}



export const getAllStarsOfUser = async (id:number): Promise< starsOfuser[] | undefined>  =>{
    try {
        const  {data}: AxiosResponse<starsOfuser[], any> = await $host.get(`/stars/${id}`);
        console.log(data)
        return data;
    }catch (e){
        return undefined
    }
}


export const getALlMyMessage = async (): Promise< userMessagesInterface[] | undefined>  =>{
    try {
        const  {data}: AxiosResponse<userMessagesInterface[], any> = await $authHost.get(`/users/messages`);

        return data;
    }catch (e){
        return undefined
    }
}