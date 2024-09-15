import {Dispatch} from "redux";
import {SetUserInterfaceAction, UserActionTypes, UserConstActionType, UserStateInterface} from "../types/UserTypes";


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