import {$authHost, $host} from "./index";
import {AxiosResponse} from "axios";










export const updateALlAnime = async (animepageIds: number[]): Promise<void> =>{
    try {
        await $authHost.put(`/kodik-api/update`, {
            animePageId: animepageIds
        })
    }catch (e){

    }
}


export const getAllSeries = async (animepageId: number): Promise<any[] | undefined> =>{
    try {
        const {data}: AxiosResponse<any[],any> = await $host.get(`/kodik-api/${animepageId}`)
        console.log(data, "вфівіфвфівфіввфвфівіфвфівфівфівіфвфівівіфвфівфівфівіфвфівфівіфвфівфівфівіфвфіввфівіфвфів")
        return data;
    }catch (e){

    }
}