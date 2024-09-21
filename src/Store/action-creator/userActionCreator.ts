import {Dispatch} from "redux";
import {SetUserInterfaceAction, UserActionTypes, UserConstActionType, UserStateInterface} from "../types/UserTypes";
import {animeStatusResponse, starsOfuser} from "../../types";


export const SetUserActionCreator= ({email,  login, aboutData, id, accessRule, createAt}:UserStateInterface):any => {
    return (dispatch:Dispatch<UserActionTypes>) =>{
        try {
            if(id){
                dispatch({type: UserConstActionType.SET_USER, payload: { id ,email,  login, aboutData: {...aboutData}, accessRule: {...accessRule}, createAt: createAt }})
            }
        }catch (err){

        }
    }
}


export const ExitUserSetActionCreator= ():any => {
    localStorage.setItem("token", "")
    return (dispatch:Dispatch<UserActionTypes>) =>{
        try {
            dispatch({type: UserConstActionType.EXIT_USER, payload: {}})
        }catch (err){

        }
    }
}

export const SetUserProfilePhotoCreator= (profilePhotoUrl: string):any => {
    return (dispatch:Dispatch<UserActionTypes>) =>{
        try {
            dispatch({type: UserConstActionType.SET_USERPHOTO, payload: {profilePhoto: profilePhotoUrl}})
        }catch (err){

        }
    }
}


export const SetUserBackGroundImageCreator = (backGroundUrl: string):any => {
    return (dispatch:Dispatch<UserActionTypes>) =>{
        try {
            dispatch({type: UserConstActionType.SET_BACKGROUND, payload: {backGroundUrl: backGroundUrl}})
        }catch (err){

        }
    }
}

export const setUserStarsActionCreator = (stars: starsOfuser[] ):any => {
    return (dispatch:Dispatch<UserActionTypes>) =>{
        try {
            dispatch({type: UserConstActionType.SET_USERSTARS, payload:{stars}})
        }catch (err){

        }
    }
}

export const setUserWatchStatusesActionCreator = (watchStatus: animeStatusResponse[] ):any => {
    return (dispatch:Dispatch<UserActionTypes>) =>{
        try {
            dispatch({type: UserConstActionType.SET_ANIMESTATUS, payload:{ watchStatuses: watchStatus}})
        }catch (err){

        }
    }
}