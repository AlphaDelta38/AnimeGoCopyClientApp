import React, {useEffect, useState} from 'react';
import {FriendsRequestInterface, getAllFriensRequest} from "../../types";
import cl from '../modules/HeaderModules/Messeges.module.css'
import {acceptFriends, addFriend, deleteOrCancelRequest, getAllMyFriedns} from "../../http/FriendsApi";
import {useTypedSelector} from "../../hooks/useTypeSelector";
import {useDispatch} from "react-redux";
import {setFriendsDataActionCreator} from "../../Store/action-creator/friendsActionCreator";


const FriendRequest = (obj : FriendsRequestInterface) => {

    const data = useTypedSelector(state => state.user)
    const dataFriend = useTypedSelector(state => state.friends)
    const dispatch = useDispatch();

    async  function accpetFriendRequest(){
        try {
            const response = await acceptFriends(data.id, obj.id);
            if(response === "friends"){
                const filteredMassive = dataFriend.friendsRequest.filter((value)=>value.user[0].id !== obj.id)
                const addNewOne = dataFriend.friendsRequest.filter((value)=>value.user[0].id === obj.id)

                if(filteredMassive){
                   dispatch(setFriendsDataActionCreator({friends: [...dataFriend.friends, ...addNewOne], friendsRequest: filteredMassive}))
                }else{
                    dispatch(setFriendsDataActionCreator({friends: [...dataFriend.friends, ...addNewOne], friendsRequest: []}))
                }
            }
            if(!response){
                throw new Error("Ошибка")
            }
        }catch (e){
            const filteredMassive = dataFriend.friendsRequest.filter((value)=>value.user[0].id !== obj.id)
            if(filteredMassive){
                dispatch(setFriendsDataActionCreator({friends: dataFriend.friends, friendsRequest: filteredMassive}))
            }else{
                dispatch(setFriendsDataActionCreator({friends: dataFriend.friends, friendsRequest: []}))
            }
        }
    }

    async  function cancelFriendRequest(){
        try {
            const response = await deleteOrCancelRequest(data.id, obj.id);
            if(response === "noFriend"){
                const filteredMassive = dataFriend.friendsRequest.filter((value)=>value.user[0].id !== obj.id)
                if(filteredMassive){
                    dispatch(setFriendsDataActionCreator({friends: dataFriend.friends, friendsRequest: filteredMassive}))
                }else{
                    dispatch(setFriendsDataActionCreator({friends: dataFriend.friends, friendsRequest: []}))
                }
            }
            if(!response){
                throw new Error("Ошибка")
            }
        }catch (e){
            const filteredMassive = dataFriend.friendsRequest.filter((value)=>value.user[0].id !== obj.id)
            if(filteredMassive){
                dispatch(setFriendsDataActionCreator({friends: dataFriend.friends, friendsRequest: filteredMassive}))
            }else{
                dispatch(setFriendsDataActionCreator({friends: dataFriend.friends, friendsRequest: []}))
            }
        }

    }

    return (
        <div style={{...obj.styles}} className={cl.MessegeContainer}>
            <div className={cl.ImageContainer}>
                <img style={{borderRadius: "50%"}} width="100%" height="100%" src={`${obj.profilePhoto ? `${process.env.REACT_APP_API_URL}${obj.profilePhoto}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQzLhg0HDlP9pTv_UW4xk1SftSxAvz8wRSxA&s"}`}/>
            </div>
            <div className={cl.InfoContainer}>
                <div>
                    {`${obj.friendName } отправил(а) запрос на дружбу `}
                </div>
                <div className={cl.friendsBtnContainer}>
                    <button onClick={()=>accpetFriendRequest()}>Принять</button>
                    <button onClick={()=>cancelFriendRequest()}>Отклонить</button>
                </div>
            </div>
        </div>
    );
};

export default FriendRequest;