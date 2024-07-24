import React, {CSSProperties} from 'react';
import cl from '../modules/ProfilePageModules/SideNavigationProfile.module.css'
import {Link} from "react-router-dom";
import {routes} from "../../routes";

interface SideNavigationProfileInterface {
    styles?: CSSProperties
}

const SideNavigationProfile = ({styles}:SideNavigationProfileInterface) => {


    const testMassive = [
        {ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", name: "Andrei"},
        {ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", name: "Andrei"},
        {ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", name: "Andrei"},
        {ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", name: "Andrei"},
        {ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", name: "Andrei"},
        {ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", name: "Andrei"},

    ]

    return (
        <div style={{...styles}} className={cl.container}>
            <div className={cl.navigationContainer}>
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
                    <span>
                        <svg width={"14px"} height={"14px"} fill={"white"}>
                            <use xlinkHref={"/sprite.svg#friendsIcon"}></use>
                        </svg>
                    </span>
                    <h5>Друзья</h5>
                    2
                </div>
                <div className={cl.ListContainer}>
                    {testMassive.map((value, index)=>
                        <div key={value.name.length + index } style={{ backgroundImage: `url(${value.ImgUrl})`}} className={cl.friendList__item}><h5>{value.name}</h5></div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SideNavigationProfile;