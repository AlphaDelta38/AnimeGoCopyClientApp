import React from 'react';
import cl from "../modules/AnimePageModules/GeneralInfoAboutAnime.module.css";
import InfoToolTip from "../AdditionalComponents/InfoToolTip";
import TextWithAdditionalInfo from "../AdditionalComponents/TextWithAdditionalInfo";
import RedirectionText from "./RedirectionText";
import MiniWindowPage from "../AdditionalComponents/MiniWindowPage";

const MangaGeneralInfo = () => {
    return (
        <dl className={cl.tableData}>
            <dt>
                Следующий эпизод
                <span>
                    <InfoToolTip cssProperties={{marginLeft: "4px"}} width={18} height={18}
                                 message={"Указана дата выхода Эпизода на телеэкранах Японии. На сайте появится в течении нескольких часов"}/>
                </span>
            </dt>
            <dd>
                <TextWithAdditionalInfo textAbove={"Через 6 дней"} title={"7 авг. 2024 ср 17.30"}/>
                ожидается выход 6 серии
            </dd>
            <dd className={cl.hr}></dd>
            <dt>Тип</dt>
            <dd>Манга <span><InfoToolTip cssProperties={{marginLeft: "4px"}}
                                         message={"Японские комиксы, иногда называемые комику."}/></span></dd>
            <dt>Выпуск</dt>
            <dd>с 3 июля 2024</dd>
            <dt>Жанр</dt>
            <dd>
                <RedirectionText>Комедия</RedirectionText>,
                <RedirectionText>Романтика</RedirectionText>,
                <RedirectionText>Школа</RedirectionText>,
            </dd>
            <dt>Издательство</dt>
            <dd>
                <RedirectionText>Dogakobo</RedirectionText>
            </dd>
            <dt>Авторы</dt>
            <dd style={{display: "flex", flexDirection: "column", alignItems: "start"}}>
                <div className={cl.generalPerson}>
                    <MiniWindowPage title={"Сараса Нагасэ"} basicState={"top"}>dad</MiniWindowPage>
                    <span style={{marginLeft: "6px"}}>
                        (Рисовка)
                    </span>
                </div>
                <div className={cl.generalPerson}>
                    <MiniWindowPage title={" Анко Юдзу"} basicState={"top"}>dad</MiniWindowPage>
                    <span style={{marginLeft: "6px"}}>
                        (Сюжет)
                    </span>
                </div>
            </dd>
            <dt>Главные герои</dt>
            <dd style={{display: "flex", flexDirection: "column", alignItems: "start"}}>
                <div className={cl.generalPerson}>
                    <MiniWindowPage title={"Алиса Михайловна Кудзё"} basicState={"top"}>dad</MiniWindowPage>
                </div>
                <div className={cl.generalPerson}>
                    <MiniWindowPage title={"Масатика Кудзэ"} basicState={"top"}>dad</MiniWindowPage>
                </div>
            </dd>
        </dl>
    );
};

export default MangaGeneralInfo;