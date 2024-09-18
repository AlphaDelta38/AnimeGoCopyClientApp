import React, {CSSProperties, useEffect, useState} from 'react';
import cl from '../modules/ProfilePageModules/SideNavigationProfile.module.css'
import {Link, useLocation, useNavigate} from "react-router-dom";
import {routes} from "../../routes";
import {useTypedSelector} from "../../hooks/useTypeSelector";
import {getAllMyFriedns} from "../../http/FriendsApi";
import {getAllFriensRequest} from "../../types";

interface SideNavigationProfileInterface {
    styles?: CSSProperties
}

const SideNavigationProfile = ({styles}:SideNavigationProfileInterface) => {

    const [friendsMassive, setFriendsMassive] = useState<getAllFriensRequest[]>([]);
    const data = useTypedSelector(state =>state.user)
    const dataFriends = useTypedSelector(state =>state.friends)


    const [allowNavigate, setAllowNavigate] = useState<boolean>(false);
    const location = useLocation()
    const navigate = useNavigate();



    async function getAllFriends(id:number){
        if(id === data.id){
            setFriendsMassive(dataFriends.friends)
            return 1;
        }
        const friends = await getAllMyFriedns(id, "friends");
        if(friends){
            setFriendsMassive(friends)
        }
    }



    useEffect(() => {
        let id:number = 0;
        if(location.pathname === "/profile" || isNaN(Number(location.pathname.split("/")[2]))){
            id = Number(data.id)
            setAllowNavigate(true);
        }else{
            id = Number(location.pathname.split("/")[2])
        }
        getAllFriends(id)

    }, [location, dataFriends.friends]);


    function checkWhoseFriends(){
        if(!isNaN(Number(location.pathname.split("/")[2])) ){
            return  `/profile/${location.pathname.split("/")[2]}/friends`
        }else{
            return "/profile/friends"
        }
    }


    return (
        <div style={{...styles}} className={cl.container}>
            <div style={allowNavigate ? {} : {display:"none"}} className={cl.navigationContainer}>
                <div className={cl.navigationHeader}>
                    Меню
                </div>
                <div className={cl.navigationList}>

                    <Link style={{textDecoration: "none", color: "inherit"}} to={routes.Profile}>
                        <div className={cl.navigation__item}>
                            <span>
                                <svg width={"16px"} height={"16px"} fill={"black"}>
                                    <use xlinkHref={"/sprite.svg#HomePageIcon"}></use>
                                </svg>
                            </span>
                            <h5>Главная</h5>
                        </div>
                    </Link>
                    <Link style={{textDecoration: "none", color: "inherit"}} to={routes.Friends}>
                    <div className={cl.navigation__item}>
                        <span>
                            <svg width={"16px"} height={"16px"} fill={"black"}>
                                <use xlinkHref={"/sprite.svg#friendsIcon"}></use>
                            </svg>
                        </span>
                        <h5>Друзья</h5>
                    </div>
                    </Link>
                    <Link style={{textDecoration: "none", color: "inherit"}} to={routes.OwnAnimeList}>
                    <div className={cl.navigation__item}>
                        <span>
                            <svg width={"16px"} height={"16px"} fill={"black"}>
                                <use xlinkHref={"/sprite.svg#ListIcon"}></use>
                            </svg>
                        </span>
                        <h5>Список аниме</h5>
                    </div>
                    </Link>
                    <Link style={{textDecoration: "none", color: "inherit"}} to={routes.OwnMangaList}>
                        <div className={cl.navigation__item}>
                            <span>
                                <svg width={"16px"} height={"16px"} fill={"black"}>
                                    <use xlinkHref={"/sprite.svg#ListIcon"}></use>
                                </svg>
                            </span>
                            <h5>Список Манги</h5>
                        </div>
                    </Link>
                    <Link style={{textDecoration: "none", color: "inherit"}} to={routes.MyProfileSettings}>
                        <div className={cl.navigation__item}>
                            <span>
                                 <svg width={"16px"} height={"16px"} fill={"black"}>
                                    <use xlinkHref={"/sprite.svg#SettingsIcon"}></use>
                                </svg>
                            </span>
                            <h5>Настройки</h5>
                        </div>
                    </Link>
                </div>
            </div>

            <div className={cl.friendlist}>
                <div className={cl.friendListHeader}>
                    <span onClick={()=>navigate(checkWhoseFriends())}>
                        <svg width={"14px"} height={"14px"} fill={"white"}>
                            <use xlinkHref={"/sprite.svg#friendsIcon"}></use>
                        </svg>
                    </span>
                    <h5 onClick={()=>navigate(checkWhoseFriends())}>Друзья</h5>
                    {friendsMassive.length}
                </div>
                <div className={cl.ListContainer}>

                    {
                        friendsMassive.map((value, index)=>
                            <div onClick={()=>navigate(`/profile/${value.user[0].id}`)} key={index } style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL}${value.user[0].profilePhoto})`}} className={cl.friendList__item}><h5>{value.user[0].name}</h5></div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default SideNavigationProfile;