import {AxiosResponse} from "axios";
import {charactersAnime} from "../types";
import {$host} from "./index";


export const getOneCharacter = async (id:number):Promise<charactersAnime | undefined> =>{
    try {
        const {data}: AxiosResponse<charactersAnime, any> = await $host.get(`characters/${id}`);
        return data
    }catch (e){

    }
}