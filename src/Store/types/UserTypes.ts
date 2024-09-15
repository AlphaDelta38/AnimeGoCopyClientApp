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
    SET_USERPHOTO="SET_USERPHOTO",
    SET_BACKGROUND="SET_BACKGROUND",
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

export  interface ExitUserSetActionCreator{
    type: UserConstActionType.EXIT_USER,
    payload: {
    },
}


export  type UserActionTypes = SetUserInterfaceAction | ExitUserSetActionCreator | SetUserPhotoAction | SetBackGroundImage;
