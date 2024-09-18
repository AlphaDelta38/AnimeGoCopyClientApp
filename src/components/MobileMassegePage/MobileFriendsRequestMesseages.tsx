import React, {useContext, useState} from 'react';
import cl from "../modules/MobileMesseagePageModules/MobileMessagePage.module.css";
import MessegesComponent from "../Header/MessegesComponent";
import SideNavigationProfile from "../ProfilePage/SideNavigationProfile";
import {ToggleContext, ToggleContextProps} from "../../context/ToggleProvider";
import FriendRequest from "../Header/FriendRequest";
import {useTypedSelector} from "../../hooks/useTypeSelector";

const MobileFriendsRequestMesseages = () => {

    const {MobileNavBarActive, setMobileNavBarActive}:ToggleContextProps = useContext(ToggleContext)!
    const dataFriend = useTypedSelector(state =>state.friends)
    const [friendrequestObj, setfriendRequestObj] = useState([
        {
            friendName: "Кайдзю номер восемь",
        },
        {
            friendName: "AlphaDelta38",
        },
        {
            friendName: "AlphaDelta38",
        },
        {
            friendName: "AlphaDelta38",
        },

    ]);

    return (
        <div style={MobileNavBarActive ? {transform: "translate3d(var(--translate-value), 0, 0)"} : {}}
             className={cl.container}>
            <div className={cl.row}>
                <div className={cl.contentContainer}>
                    <div className={cl.content__header}>
                        <h2>
                            Уведомления
                        </h2>
                    </div>
                    <div className={cl.messegeas__container}>
                        {dataFriend.friendsRequest?.map((value, index, array)=><FriendRequest  id={value.user[0].id} styles={{marginLeft:"-16px", marginRight:"-16px", paddingLeft: "16px", paddingRight:"16px"}} friendName={value.user[0].name}  key={index+array.length} />)}
                    </div>
                </div>
                <div style={{width:"100%"}} className={cl.sideMenu}>
                    <SideNavigationProfile  styles={{width: "100%", flex: "100%"}}/>
                </div>
            </div>
        </div>
    );
};

export default MobileFriendsRequestMesseages;