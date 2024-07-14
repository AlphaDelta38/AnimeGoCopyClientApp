import React from 'react';
import cl from '../modules/ProfilePageModules/SideNavigationProfile.module.css'
import {Link} from "react-router-dom";
import {routes} from "../../routes";



const SideNavigationProfile = () => {


    const testMassive = [
        {ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", name: "Andrei"},
        {ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", name: "Andrei"},
        {ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", name: "Andrei"},
        {ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", name: "Andrei"},
        {ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", name: "Andrei"},
        {ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", name: "Andrei"},

    ]

    return (
        <div className={cl.container}>
            <div className={cl.navigationContainer}>
                <div className={cl.navigationHeader}>
                    Меню
                </div>
                <div className={cl.navigationList}>

                    <Link style={{textDecoration: "none", color: "inherit"}} to={routes.Profile}>
                        <div className={cl.navigation__item}>
                            <span><img width="14px" height="14px" src={"/HomePageBlack_16x16.png"} alt={""}/></span>
                            <h5>Главная</h5>
                        </div>
                    </Link>
                    <Link style={{textDecoration: "none", color: "inherit"}} to={routes.Friends}>
                        <div className={cl.navigation__item}>
                            <span><img width="16px" height="16px" src={"/friends_black16x16.png"} alt={""}/></span>
                            <h5>Друзья</h5>
                        </div>
                    </Link>
                    <Link style={{textDecoration: "none", color: "inherit"}} to={routes.OwnAnimeList}>
                        <div className={cl.navigation__item}>
                            <span><img width="16px" height="16px" src={"/NoteBookBlack_16x16.png"} alt={""}/></span>
                            <h5>Список аниме</h5>
                        </div>
                    </Link>


                    <Link style={{textDecoration: "none", color: "inherit"}} to={routes.OwnMangaList}>
                        <div className={cl.navigation__item}>
                            <span><img width="16px" height="16px" src={"/NoteBookBlack_16x16.png"} alt={""}/></span>
                            <h5>Список Манги</h5>
                        </div>
                    </Link>
                    <Link style={{textDecoration: "none", color: "inherit"}} to={routes.MyProfileSettings}>
                        <div className={cl.navigation__item}>
                            <span><img width="16px" height="16px" src={"/Settings.png"} alt={""}/></span>
                            <h5>Настройки</h5>
                        </div>
                    </Link>


                </div>
            </div>
            <div className={cl.friendlist}>
                <div className={cl.friendListHeader}>
                    <span><img width="16px" height="16px" src={"/friendsIconWhite28x28.png"} alt={""}/></span>
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