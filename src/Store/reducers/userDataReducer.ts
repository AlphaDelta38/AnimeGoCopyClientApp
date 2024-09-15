import {UserActionTypes, UserConstActionType, UserStateInterface} from "../types/UserTypes";


const initialState: UserStateInterface = {
    id: 0,
    email: "",
    login:"",
    createAt: "",
    profilePhoto: "",
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
        case UserConstActionType.SET_USERPHOTO:
            return {...state, profilePhoto: action.payload.profilePhoto}
        case UserConstActionType.SET_BACKGROUND:
            return {...state, backGroundUrl: action.payload.backGroundUrl}
        default:
            return state
    }
}