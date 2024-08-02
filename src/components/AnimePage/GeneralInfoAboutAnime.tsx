import React from 'react';
import cl from '../modules/AnimePageModules/GeneralInfoAboutAnime.module.css'
import InfoToolTip from "../AdditionalComponents/InfoToolTip";
import TextWithAdditionalInfo from "../AdditionalComponents/TextWithAdditionalInfo";
import RedirectionText from "./RedirectionText";
import MiniWindowPage from "../AdditionalComponents/MiniWindowPage";



const GeneralInfoAboutAnime = () => {
    return (
        <dl className={cl.tableData}>
            <dt>
                Следующий эпизод
                <span>
                    <InfoToolTip cssProperties={{marginLeft: "4px"}} width={18} height={18} message={"Указана дата выхода Эпизода на телеэкранах Японии. На сайте появится в течении нескольких часов"}/>
                </span>
            </dt>
            <dd>
                <TextWithAdditionalInfo textAbove={"Через 6 дней"} title={"7 авг. 2024 ср 17.30"}/>
                ожидается выход 6 серии
            </dd>
            <dd className={cl.hr}></dd>
            <dt>Тип</dt>
            <dd>ТВ Сериал</dd>
            <dt>Эпизоды</dt>
            <dd>12</dd>
            <dt>Статус</dt>
            <dd>
                <RedirectionText>Онгоинг</RedirectionText>
            </dd>
            <dt>Жанр</dt>
            <dd>
                <RedirectionText>Комедия</RedirectionText>,
                <RedirectionText>Романтика</RedirectionText>,
                <RedirectionText>Школа</RedirectionText>,
            </dd>
            <dt>Первоисточник</dt>
            <dd>Легкая новвела</dd>
            <dt>Сезон</dt>
            <dd>
                <RedirectionText>Лето 2024</RedirectionText>
            </dd>
            <dt>Выпуск</dt>
            <dd>с 3 июля 2024</dd>
            <dt>Студия</dt>
            <dd>
                <RedirectionText>Dogakobo</RedirectionText>
            </dd>
            <dt>Рейтинг MPAA
                <InfoToolTip cssProperties={{marginLeft:"6px"}} message={"Принятая в США система оценки содержания фильма, введённая Американской киноассоциацией (MPAA). Для расшифровки значений иконки, наведите на нее курсор мыши."}/>
            </dt>
            <dd>
                <TextWithAdditionalInfo textAbove={"дети до 13 лет допускаются на фильм только с родителями"} title={"PG-13"}/>
            </dd>
            <dt>Возрастные ограничения</dt>
            <dd>
                <span style={{background:"black", borderRadius:"8px", color:"white", padding:"0 6px 0 6px", fontWeight:"700"}}>16+</span>
            </dd>
            <dt>
                Длительность
            </dt>
            <dd>24 мин. ~ серия</dd>
            <dt>Снят по ранобэ</dt>
            <dd>
                <MiniWindowPage basicState={"top"} title={"Аля иногда кокетничает со мной по-русски"}>
                    <MiniWindowPage title={"хуй"} basicState={"top"}><MiniWindowPage title={"хуй"} basicState={"top"}><MiniWindowPage title={"хуй"} basicState={"top"}><MiniWindowPage title={"хуй"} basicState={"top"}><MiniWindowPage title={"хуй"} basicState={"top"}><MiniWindowPage title={"хуй"} basicState={"top"}><MiniWindowPage title={"хуй"} basicState={"top"}><MiniWindowPage title={"хуй"} basicState={"top"}><MiniWindowPage title={"хуй"} basicState={"top"}><MiniWindowPage title={"хуй"} basicState={"top"}><MiniWindowPage title={"хуй"} basicState={"top"}><MiniWindowPage title={"хуй"} basicState={"top"}><MiniWindowPage title={"хуй"} basicState={"top"}><MiniWindowPage title={"хуй"} basicState={"top"}><MiniWindowPage title={"хуй"} basicState={"top"}>dadasdasdasdasdasd</MiniWindowPage></MiniWindowPage></MiniWindowPage></MiniWindowPage></MiniWindowPage></MiniWindowPage></MiniWindowPage></MiniWindowPage></MiniWindowPage></MiniWindowPage></MiniWindowPage></MiniWindowPage></MiniWindowPage></MiniWindowPage></MiniWindowPage>
                </MiniWindowPage>
            </dd>
        </dl>

    );
};

export default GeneralInfoAboutAnime;