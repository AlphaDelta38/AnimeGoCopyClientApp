import React, {useContext, useState} from 'react';
import cl from '../modules/MobileMesseagePageModules/MobileMessagePage.module.css'
import SideNavigationProfile from "../ProfilePage/SideNavigationProfile";
import MessegesComponent from "../Header/MessegesComponent";
import {ToggleContext, ToggleContextProps} from "../../context/ToggleProvider";
import {useTypedSelector} from "../../hooks/useTypeSelector";




const MobileMessagePage = () => {

    const {MobileNavBarActive, setMobileNavBarActive}:ToggleContextProps = useContext(ToggleContext)!
    const dataUser = useTypedSelector(state =>state.user)








    return (
        <div style={ MobileNavBarActive ?  {transform:"translate3d(var(--translate-value), 0, 0)"} : {}} className={cl.container}>
            <div className={cl.row}>
                <div className={cl.contentContainer}>
                    <div className={cl.content__header}>
                        <h2>
                            Уведомления
                        </h2>
                    </div>
                    <div className={cl.messegeas__container}>
                        { dataUser.messages?.map((value, index, array)=>
                            <MessegesComponent
                                key={index+array.length}
                                AnimeName={value.name}
                                isSaw={false}
                                NofSeries={value.number}
                                VoiceOver={value.voiceOver}
                                imgUrl={value.animeImgUrl}
                                when={value.howLongBefore}
                                styles={{marginLeft:"-16px", marginRight:"-16px", paddingLeft: "16px", paddingRight:"16px"}}
                            />
                        )}
                    </div>
                </div>
                <div style={{width:"100%"}} className={cl.sideMenu}>
                    <SideNavigationProfile styles={{width:"100%", flex:"100%"}}/>
                </div>
            </div>
        </div>
    );
};

export default MobileMessagePage;