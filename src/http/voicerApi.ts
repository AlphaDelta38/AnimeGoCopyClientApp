import {charactersAnime, VoiceOverGetOne} from "../types";
import {AxiosResponse} from "axios";
import {$host} from "./index";


export const getOneVoicer = async (id:number): Promise<VoiceOverGetOne | undefined> =>{
    try {
        const {data}: AxiosResponse<VoiceOverGetOne, any> = await $host.get(`/voicer/${id}`);
        return data;
    }catch (e){

    }
}