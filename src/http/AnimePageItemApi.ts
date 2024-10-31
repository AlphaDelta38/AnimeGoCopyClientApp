import {$authHost, $host} from "./index";
import {AxiosResponse} from "axios";
import {
    commentsItemsInterface,
    createCommentsInterface,
    createReviewInterface,
    getALlAnimeItems,
    reviewInterface, setReviewLikesInterface
} from "../types";



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



interface getAllWatchStatusInterface extends  getOneStatusInterface{
    status: string
}


export const getAllWatchStatus =  async (animePageId: number): Promise<getAllWatchStatusInterface[] | undefined> =>{
    try {
        const {data}:AxiosResponse<getAllWatchStatusInterface[], any> = await $authHost.get(`/watchstatus`, {
            params: {
                animePageId
            }
        });

        return  data;
    }catch (e){

    }
}


export const getAllCommentsAboutAnime =  async (animePageId: number): Promise<commentsItemsInterface[] | undefined> =>{
    try {
        const {data}:AxiosResponse<commentsItemsInterface[], any> = await $authHost.get(`/comments`, {
            params: {
                animePageId
            }
        });
        let copy = [...data]


        return  copy;
    }catch (e){

    }
}


export const createNewComments =  async (body: createCommentsInterface): Promise<commentsItemsInterface| undefined> =>{
    try {
        const {data}:AxiosResponse<commentsItemsInterface, any> = await $authHost.post(`/comments`, {
            ...body
        });

        return  data;
    }catch (e){

    }
}

export const setLikesForAnime =  async (id: number, likes: number): Promise<number| undefined> =>{
    try {
        const {data}:AxiosResponse<number, any> = await $authHost.put(`/comments/likes`, {
            id: id,
            likes: likes,
        });

        return  data;
    }catch (e){

    }
}


export const createReviewForAnime =  async (requestData: createReviewInterface): Promise<number | undefined> =>{
    try {
        const {data}:AxiosResponse<number, any> = await $authHost.post(`/review`, {
            ...requestData
        });

        return data;
    }catch (e){

    }
}


export const getAllReviews =  async (animeId: number): Promise<reviewInterface[] | undefined> =>{
    try {
        const {data}:AxiosResponse<reviewInterface[], any> = await $authHost.get(`/review/${animeId}`);
        return data;
    }catch (e){

    }
}

export const setReviewLikes =  async ({reviewId,likes,type}:setReviewLikesInterface): Promise<number | undefined> =>{
    try {
        const {data}:AxiosResponse<number, any> = await $authHost.put(`/review/likes`,{
            reviewId,
            likes,
            type,
        });
        return data;
    }catch (e){

    }
}




