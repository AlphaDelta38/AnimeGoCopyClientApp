import {$authHost, $host} from "./index";
import {AxiosResponse} from "axios";
import {getAllFriensRequest} from "../types";


export const getAllMyFriedns = async (myId: number, status?: string): Promise<getAllFriensRequest[] | undefined>  =>{
    try {
        if(status){
            const {data}: AxiosResponse<getAllFriensRequest[], any> = await $host.get("/friends", {params: {
                    id: myId,
                    status: status
                }})
            return  data;
        }else{
            const {data}: AxiosResponse<getAllFriensRequest[], any> = await $host.get("/friends", {params: {
                    id: myId,
                }})
            return  data;
        }
    }catch(e){

    }
}


export const addFriend = async (myId: number, friendId:number): Promise<string>  =>{
    try {
        const {data}: AxiosResponse<string, any> = await $authHost.post(`/friends`, {
            userId: myId,
            friendId: friendId,
        })
        return data;
    }catch(e){

    }
    return ""
}

export const deleteOrCancelRequest = async (myId: number, friendId:number): Promise<string>  =>{
    try {
        const {data}: AxiosResponse<string, any> = await $authHost.delete(`/friends`, {params: {
            userId: myId,
                friendId: friendId,
            }})
        return data;
    }catch(e){

    }
    return ""
}


export const acceptFriends = async (myId: number, friendId:number): Promise<string>  =>{
    try {
        const {data}: AxiosResponse<string, any> = await $authHost.put(`/friends`, {
                userId: myId,
                friendId: friendId,
            })
        return data;
    }catch(e){

    }
    return ""
}