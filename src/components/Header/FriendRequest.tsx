import React from 'react';
import {FriendsRequestInterface} from "../../types";
import cl from '../modules/HeaderModules/Messeges.module.css'


const FriendRequest = (obj : FriendsRequestInterface) => {

    return (
        <div style={{...obj.styles}} className={cl.MessegeContainer}>
            <div className={cl.ImageContainer}>
                <img style={{borderRadius: "50%"}} width="100%" height="100%" src={' https://animego.org/media/cache/thumbs_60x60/upload/anime/images/662d1d89c4a1d034870587.jpg'}/>
            </div>
            <div className={cl.InfoContainer}>
                <div>
                    {`${obj.friendName } отправил(а) запрос на дружбу `}
                </div>
                <div className={cl.friendsBtnContainer}>
                    <button>Принять</button>
                    <button>Отклонить</button>
                </div>
            </div>
        </div>
    );
};

export default FriendRequest;