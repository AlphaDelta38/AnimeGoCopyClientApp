import React, {useEffect, useState} from 'react';
import cl from '../modules/AnimePageModules/HeaderGeneralInfo.module.css'
import InPeopleListAnime from "./InPeopleListAnime";
import RaitingChoose from "./RaitingChoose";





const HeaderGeneralInfo = () => {

    const temporaryForStatistic = [
        {title:"Оценки людей", styles: {left:"-258px"}},
        {ColumNameOne: "Голосов", ColumNameTwo: "Процент" , ColumNameThree: "Список", styles:[{fontWeight:"400",width: "50px"},{width: "330px"},{fontWeight:"400",  width: "50px"}]},
        {ColumDateOne: "8603", ColumDateTwo: "72.3" , ColumDateThree: "1", styles:[{fontWeight:"400",width: "50px"},{width: "330px"},{fontWeight:"400", width: "50px"}]},
        {ColumDateOne: "25083", ColumDateTwo: "0.4" , ColumDateThree: "2", styles:[{fontWeight:"400",width: "50px"},{width: "330px"},{fontWeight:"400", width: "50px"}]},
        {ColumDateOne: "151", ColumDateTwo: "0.4" , ColumDateThree: "3", styles:[{fontWeight:"400",width: "50px"},{width: "330px"},{fontWeight:"400", width: "50px"}]},
        {ColumDateOne: "162", ColumDateTwo: "1.7" , ColumDateThree: "4", styles:[{fontWeight:"400",width: "50px"},{width: "330px"},{fontWeight:"400", width: "50px"}]},
        {ColumDateOne: "609", ColumDateTwo: "24.8" , ColumDateThree: "5",styles:[{fontWeight:"400",width: "50px"},{width: "330px"},{fontWeight:"400", width: "50px"}]},
        {ColumDateOne: "8603", ColumDateTwo: "72.3" , ColumDateThree: "6", styles:[{fontWeight:"400",width: "50px"},{width: "330px"},{fontWeight:"400", width: "50px"}]},
        {ColumDateOne: "25083", ColumDateTwo: "0.4" , ColumDateThree: "7", styles:[{fontWeight:"400",width: "50px"},{width: "330px"},{fontWeight:"400", width: "50px"}]},
        {ColumDateOne: "151", ColumDateTwo: "0.4" , ColumDateThree: "8", styles:[{fontWeight:"400",width: "50px"},{width: "330px"},{fontWeight:"400", width: "50px"}]},
        {ColumDateOne: "162", ColumDateTwo: "1.7" , ColumDateThree: "9", styles:[{fontWeight:"400",width: "50px"},{width: "330px"},{fontWeight:"400", width: "50px"}]},
        {ColumDateOne: "609", ColumDateTwo: "24.8" , ColumDateThree: "10",styles:[{fontWeight:"400",width: "50px"},{width: "330px"},{fontWeight:"400", width: "50px"}]},
        {footer: null}
    ]




    return (
        <div className={cl.container}>
            <div className={cl.row}>
                <RaitingChoose/>
                <div className={cl.InfoAboutUserRaiting}>
                    <InPeopleListAnime UiSettings={temporaryForStatistic} children={
                        <svg width={"16px"} height={"16px"}>
                            <use xlinkHref={"/sprite.svg#ToolTipWordIIcon"}></use>
                        </svg>
                    }/>
                </div>
            </div>
            <div className={cl.headerName}>
                <h1 style={{fontWeight: "500", marginBottom: "6px"}}>Башня Бога 2</h1>
                <span className={cl.othersNames}>Kami no Tou: Ouji no Kikan</span>
                <span className={cl.othersNames}>Tower of God: Return of the Prince</span>
            </div>
        </div>
    );
};

export default HeaderGeneralInfo;