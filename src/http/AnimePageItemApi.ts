import {$authHost, $host} from "./index";
import {AxiosResponse} from "axios";
import {getALlAnimeItems} from "../types";
import exp from "node:constants";


export  const getAllAnimeItems = async (): Promise<getALlAnimeItems[] | undefined> =>{
    try {
            const {data}:AxiosResponse<getALlAnimeItems[], any> = await $host.get("/animepages");
            return  data;
    }catch (e){

    }
}



interface getOneAnimePage{
    id:number
}

export  const getOneAnimePage = async ({id}:getOneAnimePage): Promise<getALlAnimeItems | undefined> =>{
    try {
        const {data}:AxiosResponse<getALlAnimeItems, any> = await $host.get(`/animepages/${id}`);
        return  data;
    }catch (e){

    }
}



interface setStatusOfAnimeForUserInerface{
    status:string,
    animePageId: number,
    userId: number,
}



export  const setStatusOfAnimeForUser = async ({userId, status,animePageId}:setStatusOfAnimeForUserInerface): Promise<number | undefined> =>{
    try {
        const {data}:AxiosResponse<number, any> = await $host.post(`/watchstatus`, {userId,status,animePageId});
        return  data;
    }catch (e){

    }
}


interface getOneStatusInterface{
    animePageId: number,
    userId: number,
}


export const getOneStatus =  async ({animePageId,userId}:getOneStatusInterface): Promise<string | undefined> =>{
    try {
        const {data}:AxiosResponse<string, any> = await $authHost.get(`/watchstatus/one`, {
            params: {
                userId,
                animePageId
            }
        });

        return  data;
    }catch (e){

    }
}


