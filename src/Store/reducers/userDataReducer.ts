import {UserActionTypes, UserConstActionType, UserStateInterface} from "../types/UserTypes";


const initialState: UserStateInterface = {
    email: "",
    login:"",
    aboutData: {familyName: "", aboutUser:"", gender:"",birthday:"", status:"", country:"", city:""},
    isLogin: false,
}


export const userDataReducer = (state= initialState, action:UserActionTypes): UserStateInterface =>{
    switch (action.type){
        case UserConstActionType.SET_USER:
            return {...state, isLogin:true, aboutData: action.payload.aboutData, login: action.payload.login, email:action.payload.email }
        case UserConstActionType.EXIT_USER:
            return {email: "", login:"", aboutData: {}, isLogin:false}
        default:
            return state
    }
}