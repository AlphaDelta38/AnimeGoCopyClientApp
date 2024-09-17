import {Dispatch} from "redux";
import {FriendConstActionType, FriendsActionTypes, friendsInitialState} from "../types/FriendsTypes";


export const setFriendsDataActionCreator = ({friends, friendsRequest}: friendsInitialState):any =>{
    return (dispatch: Dispatch<FriendsActionTypes>)=>{
       try {
           dispatch({type: FriendConstActionType.SET_FRIENDS,payload: {friendsRequest, friends} })
       }catch (e){

       }
    }
}



