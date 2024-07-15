import React, {useContext, useState} from 'react';
import cl from '../modules/MobileMesseagePageModules/MobileMessagePage.module.css'
import SideNavigationProfile from "../ProfilePage/SideNavigationProfile";
import MessegesComponent from "../Header/MessegesComponent";
import {ToggleContext, ToggleContextProps} from "../../context/ToggleProvider";




const MobileMessagePage = () => {

    const {MobileNavBarActive, setMobileNavBarActive}:ToggleContextProps = useContext(ToggleContext)!
    const [meseggesObjects, setMessegesObjects] = useState([
        {
            AnimeName: "Кайдзю номер восемь",
            NofSeries: 9,
            VoiceOver: "StudioBand",
            isSaw: false,
            when: "5 часов назад",
        },
        {
            AnimeName: "Злодейка наслаждается своей седьмой жизнью в качестве свободолюбивой невесты во вражеской стране",
            NofSeries: 24,
            VoiceOver: "StudioBand",
            isSaw: false,
            when: "11 часов назад",

        },
        {
            AnimeName: "Злодейка наслаждается своей седьмой жизнью в качестве свободолюбивой невесты во вражеской стране",
            NofSeries: 5,
            VoiceOver: "StudioBand",
            isSaw: false,
            when: "5 дней назад",
        },
        {
            AnimeName: "История покорения знаменитого горячего источника в другом мире: Реинкарнация сорокалетнего любителя горячих источников в умиротворяющем курортном раю",
            NofSeries: 4,
            VoiceOver: "StudioBand",
            isSaw: false,
            when: "16 дней назад",
        },
        {
            AnimeName: "Семь смертных грехов",
            NofSeries: 3,
            VoiceOver: "StudioBand",
            isSaw: false,
            when: "месяц назад",
        },

    ]);






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
                        { meseggesObjects?.map((value, index, array)=>
                            <MessegesComponent
                                key={index+array.length}
                                AnimeName={value.AnimeName}
                                isSaw={value.isSaw}
                                NofSeries={value.NofSeries}
                                VoiceOver={value.VoiceOver}
                                when={value.when}
                                styles={{marginLeft:"-16px", marginRight:"-16px", paddingLeft: "16px", paddingRight:"16px"}}
                            />
                        )}
                    </div>
                </div>
                <div className={cl.sideMenu}>
                    <SideNavigationProfile styles={{width:"100%", flex:"100%"}}/>
                </div>
            </div>
        </div>
    );
};

export default MobileMessagePage;