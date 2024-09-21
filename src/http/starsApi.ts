import {starsOfuser} from "../types";
import {AxiosResponse} from "axios";
import {$host} from "./index";


export const getAllStarsOfUser = async (id:number): Promise< starsOfuser[] | undefined>  =>{
    try {
        const  {data}: AxiosResponse<starsOfuser[], any> = await $host.get(`/stars`, {
            params: {
                animePAgeId: id
            }
        });
        return data;
    }catch (e){
        return undefined
    }
}



interface setAnimeForUserInterface{
    raiting: number,
    userId:number
    animePAgeId:number
}

export const setAnimeStarForUser = async (e:setAnimeForUserInterface): Promise< starsOfuser | undefined>  =>{
    try {
        const  {data}: AxiosResponse<starsOfuser, any> = await $host.post(`/stars`, {
            ...e
        });
        return data;
    }catch (e){
        return undefined
    }
}