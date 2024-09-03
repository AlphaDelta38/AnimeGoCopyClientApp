import {UserActionTypes, UserConstActionType, UserStateInterface} from "../types/UserTypes";


const initialState: UserStateInterface = {
    email: "",
    login:"",
    aboutData: {name:"", familyName: "", aboutUser:"", gender:"",birthday:"", status:"", country:"", city:""},
    isLogin: false,
}


export const userDataReducer = (state= initialState, action:UserActionTypes): UserStateInterface =>{
    switch (action.type){
        case UserConstActionType.SET_USER:
            return {isLogin:true, aboutData: action.payload.aboutData, login: action.payload.login, email:action.payload.email }
        default:
            return state
    }
}