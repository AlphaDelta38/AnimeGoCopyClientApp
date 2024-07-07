import React, {useContext} from 'react';
import cl from '../modules/ProfilePageModules/FriendsPage.module.css'
import SideNavigationProfile from "./SideNavigationProfile";
import {ToggleContext, ToggleContextProps} from "../../context/ToggleProvider";




const FriendsPage = () => {
    const {MobileNavBarActive, setMobileNavBarActive}:ToggleContextProps = useContext(ToggleContext)!

    const testMassive = [
        {ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", name: "Andrei"},
        {ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", name: "Andrei"},
        {ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", name: "Andrei"},
        {ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", name: "Andrei"},
        {ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", name: "Andrei"},
        {ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", name: "Andrei"},
        {ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", name: "Andrei"},
        {ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", name: "Andrei"},
        {ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg", name: "Andrei"},



    ]


    return (


        <div style={ MobileNavBarActive ?  {transform:"translate3d(var(--translate-value), 0, 0)"} : {}} className={cl.container}>
            <div className={cl.row}>
                <div className={cl.FriendsContainer}>
                    <div className={cl.FriendsHeaderContainer}>
                        <div className={cl.FriendsHeader}>
                            <div className={cl.returnButtonContainer}>
                                <span className={cl.ReturnArrowContainer}>
                                    <img width="16px" height="16px" src={"/LongArrowLeftBlack.png"} alt={""}/>
                                </span>
                                <span>
                                    назад
                                </span>
                            </div>
                            <h5>
                                Друзья
                            </h5>
                        </div>
                    </div>
                    <div className={cl.FriendsContentContainer}>
                        {testMassive.map((value, index) =>
                            <div key={index + value.name.length} className={cl.FriendsCardContainer}>
                                <div className={cl.media}>
                                    <div
                                        style={{ backgroundImage: `url(${value.ImgUrl})`}}
                                        className={cl.FriendImageContainer}>
                                    </div>
                                    <div className={cl.InfoContainerAboutFriend}>
                                        <h5>
                                            {value.name}
                                        </h5>
                                        <span>
                                            2 друга
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