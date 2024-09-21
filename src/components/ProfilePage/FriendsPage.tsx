import React, {useContext, useEffect, useState} from 'react';
import cl from '../modules/ProfilePageModules/FriendsPage.module.css'
import SideNavigationProfile from "./SideNavigationProfile";
import {ToggleContext, ToggleContextProps} from "../../context/ToggleProvider";
import {useTypedSelector} from "../../hooks/useTypeSelector";
import {FriendsRequestInterface, getAllFriensRequest} from "../../types";
import {useLocation, useNavigate} from "react-router-dom";
import {getAllMyFriedns} from "../../http/FriendsApi";




const FriendsPage = () => {
    const {MobileNavBarActive, setMobileNavBarActive}:ToggleContextProps = useContext(ToggleContext)!
    const [friendsMassive, setFriendsMassive] = useState<getAllFriensRequest[]>([])

    const dataFriend = useTypedSelector(state =>state.friends)
    const navigate = useNavigate();
    const location = useLocation();



    function returnStringFormOfFriends(amount: number){
        if(amount > 5){
            return " друзей"
        }else if(amount < 5 && amount > 1){
            return " друга"
        }else{
            return  " друг"
        }
    }


    async function getAllFriends(id:number){
        const friends = await getAllMyFriedns(id, "friends");
        if(friends){
            setFriendsMassive(friends)
        }
    }


    useEffect(() => {
        if(!isNaN(Number(location.pathname.split("/")[2]))){
            getAllFriends(Number(location.pathname.split("/")[2]))
        }else{
            setFriendsMassive(dataFriend.friends)
        }
    }, [location, dataFriend ]);



    return (


        <div style={ MobileNavBarActive ?  {transform:"translate3d(var(--translate-value), 0, 0)"} : {}} className={cl.container}>
            <div className={cl.row}>
                <div className={cl.FriendsContainer}>
                    <div className={cl.FriendsHeaderContainer}>
                        <div className={cl.FriendsHeader}>
                            <div onClick={()=>navigate(-1)} className={cl.returnButtonContainer}>
                                <span className={cl.ReturnArrowContainer}>
                                    <svg width={"16px"} height={"16px"} fill={"black"} >
                                        <use xlinkHref={"/sprite.svg#LongShevronIcon"}></use>
                                    </svg>
                                </span>
                                <span >
                                    назад
                                </span>
                            </div>
                            <h5>
                                Друзья
                            </h5>
                        </div>
                    </div>
                    <div className={cl.FriendsContentContainer}>
                        {friendsMassive.map((value, index) =>
                            <div key={index } className={cl.FriendsCardContainer}>
                                <div className={cl.media}>
                                    <div onClick={()=>navigate(`/profile/${value.user[0].id}`)}
                                        style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL}${value.user[0].profilePhoto})`}}
                                        className={cl.FriendImageContainer}>
                                    </div>
                                    <div className={cl.InfoContainerAboutFriend}>
                                        <h5 onClick={()=>navigate(`/profile/${value.user[0].id}`)}>
                                            {value.user[0].name}
                                        </h5>
                                        <span onClick={()=>navigate(`/profile/${value.user[0].id}/friends`)}>
                                            { value.user[0].friendlist!.length > 0
                                                ?
                                                <>
                                                    {value.user[0].friendlist!.filter((value)=>value.status === "friends").length}
                                                    {returnStringFormOfFriends(value.user[0].friendlist!.length)}
                                                </>
                                                :
                                                "0 друзей"
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
                <SideNavigationProfile/>
            </div>
        </div>
    );
};

export default FriendsPage;