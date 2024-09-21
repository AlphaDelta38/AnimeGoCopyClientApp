import {accessRule, animeStatusResponse, starsOfuser} from "../../types";


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
    SET_USERPHOTO="SET_USERPHOTO",
    SET_BACKGROUND="SET_BACKGROUND",
    SET_ANIMESTATUS="SET_ANIMESTATUS",
    SET_USERSTARS="SET_USERSTARS",
}


export  interface  UserStateInterface{
    id:number,
    email: string,
    login: string,
    createAt: string,
    profilePhoto?: string,
    backGroundUrl?: string,
    aboutData?: AboutDataUserInterface;
    isLogin: boolean,
    userStars?: starsOfuser[],
    watchStatuses?: animeStatusResponse[],
    accessRule: accessRule,
}

export  interface SetUserInterfaceAction{
    type: UserConstActionType.SET_USER,
    payload: {
        id:number,
        email: string,
        login: string,
        createAt: string,
        aboutData: AboutDataUserInterface
        accessRule: accessRule,
    },
}


export  interface SetUserPhotoAction{
    type: UserConstActionType.SET_USERPHOTO,
    payload: {
        profilePhoto: string
    },
}


export  interface SetBackGroundImage{
    type: UserConstActionType.SET_BACKGROUND,
    payload: {
        backGroundUrl: string
    },
}



export  interface setWatchStatuses{
    type: UserConstActionType.SET_ANIMESTATUS,
    payload: {
        watchStatuses: animeStatusResponse[]
    },
}

export  interface setUsersStars{
    type: UserConstActionType.SET_USERSTARS,
    payload: {
        stars: starsOfuser[]
    },
}

export  interface ExitUserSetActionCreator{
    type: UserConstActionType.EXIT_USER,
    payload: {
    },
}


export  type UserActionTypes =
    SetUserInterfaceAction
    | ExitUserSetActionCreator
    | SetUserPhotoAction
    | SetBackGroundImage
    | setUsersStars
    | setWatchStatuses;
