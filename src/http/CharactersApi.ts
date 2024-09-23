import {AxiosResponse} from "axios";
import {charactersAnime, getAllLinkedCharactersInterface} from "../types";
import {$host} from "./index";



export const getOneCharacter = async (id:number):Promise<charactersAnime | undefined> =>{
    try {
        const {data}: AxiosResponse<charactersAnime, any> = await $host.get(`characters/${id}`);
        return data
    }catch (e){

    }
}







export const getAllLinkedCharacters = async (id:number): Promise<getAllLinkedCharactersInterface | undefined> =>{
    try {
        const {data}: AxiosResponse<getAllLinkedCharactersInterface, any> = await $host.get(`/characters/links/${id}`);
        return  data;
    }catch (e){
        alert(e)
    }
}