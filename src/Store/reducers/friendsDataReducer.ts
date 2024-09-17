import {FriendConstActionType, FriendsActionTypes, friendsInitialState} from "../types/FriendsTypes";



const initialState: friendsInitialState = {
    friends: [],
    friendsRequest: [],
}



export const friendsDataReducer = (state = initialState, action: FriendsActionTypes):friendsInitialState =>{
    switch (action.type){
        case FriendConstActionType.SET_FRIENDS:
            return {...state, friends: action.payload.friends, friendsRequest: action.payload.friendsRequest};
        default:
            return state
    }
}