import {Dispatch} from "redux";
import {SetUserInterfaceAction, UserActionTypes, UserConstActionType, UserStateInterface} from "../types/UserTypes";


export const SetUserActionCreator= ({email, isLogin, login, aboutData}:UserStateInterface):any => {
    return (dispatch:Dispatch<UserActionTypes>) =>{
        try {
            dispatch({type: UserConstActionType.SET_USER, payload: {email, isLogin, login, aboutData: {...aboutData}} })
        }catch (err){

        }
    }
}