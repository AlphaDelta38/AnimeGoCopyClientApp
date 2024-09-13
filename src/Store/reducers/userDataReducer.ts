import {UserActionTypes, UserConstActionType, UserStateInterface} from "../types/UserTypes";


const initialState: UserStateInterface = {
    id: 0,
    email: "",
    login:"",
    createAt: "",
    aboutData: {fullname: " ", aboutUser:"", gender:"",birthday:"", lifeStatus:"", country:"", city:""},
    isLogin: false,
    accessRule: {}
}


export const userDataReducer = (state= initialState, action:UserActionTypes): UserStateInterface =>{

    switch (action.type){
        case UserConstActionType.SET_USER:
            return {...state, id: action.payload.id, isLogin:true, aboutData: action.payload.aboutData, login: action.payload.login, email:action.payload.email, accessRule: action.payload.accessRule , createAt: action.payload.createAt};
        case UserConstActionType.EXIT_USER:
            return {id: 0, email: "", login:"", aboutData: {}, isLogin:false, accessRule: {}, createAt: ""}
        default:
            return state
    }
}