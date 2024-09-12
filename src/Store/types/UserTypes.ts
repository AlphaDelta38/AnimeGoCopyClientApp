import {accessRule} from "../../types";


export  interface AboutDataUserInterface{
    fullname?: string,
    aboutUser?: string,
    gender?: string,
    birthday?: string,
    lifeStatus?: string,
    country?: string,
    city?: string,
}

export enum UserConstActionType{
    SET_USER="SET_USER",
    EXIT_USER="EXIT_USER",
}


export  interface  UserStateInterface{
    id:number,
    email: string,
    login: string,
    aboutData?: AboutDataUserInterface;
    isLogin: boolean,
    accessRule: accessRule,
}

export  interface SetUserInterfaceAction{
    type: UserConstActionType.SET_USER,
    payload: {
        id:number,
        email: string,
        login: string,
        aboutData: AboutDataUserInterface
        accessRule: accessRule,
    },
}

export  interface ExitUserSetActionCreator{
    type: UserConstActionType.EXIT_USER,
    payload: {
    },
}


export  type UserActionTypes = SetUserInterfaceAction | ExitUserSetActionCreator;
