import {getAllFriensRequest} from "../../types";





export enum FriendConstActionType {
    SET_FRIENDS = "SET_FRIENDS",
}


export interface friendsInitialState{
    friends: getAllFriensRequest[],
    friendsRequest: getAllFriensRequest[],
}


interface setFriendsState{
    type: FriendConstActionType.SET_FRIENDS,
    payload: {
        friends: getAllFriensRequest[],
        friendsRequest: getAllFriensRequest[],
    }
}



export type FriendsActionTypes = setFriendsState