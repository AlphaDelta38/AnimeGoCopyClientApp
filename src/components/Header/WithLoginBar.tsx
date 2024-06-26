import React, {useState} from 'react';
import cl from "../modules/Header.module.css";
import PopatUniversal from "./popatUniversal";


interface WithLogin {
    searching: boolean,
    setIsLogin: (value:boolean) => void,
    setSerching: (value:boolean) => void,
}

 export enum ObjectsType{
    friends = "friends",
    messeges = "messeges",
    friendTitle = "Заявки в друзья",
    friendMessseges = "Нет новых запросов на добавление в друзья.",
    messegesTitle = "Сообщения",
    messegesMesege = "Нет новых сообщений",
    friendsDistanse = 180,
    messegesDistanse = 124,
}


const WithLoginBar = ({searching, setIsLogin, setSerching}:WithLogin) => {

    const [PopatActive, setPopatActive] = useState(false);
    const [TypeDataPopat, setTypeDataPopat] = useState("");
    const [PopatTitle, setPopatTitle] = useState("");
    const [messegeas, setMessegeas] = useState("");
    const [distansePopat, setDistancePopat] = useState(0);
    const [tempTypePopat, setTempTypePopat] = useState("none");
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
    const [friendrequestObj, setfriendRequestObj] = useState([
        {
            friendName: "Кайдзю номер восемь",
        },
        {
            friendName: "AlphaDelta38",
        },
        {
            friendName: "AlphaDelta38",
        },
        {
            friendName: "AlphaDelta38",
        },

    ]);

    function ActivateUpdatePopat(type:string):void{
        if(type === ObjectsType.friends){
            setTypeDataPopat(ObjectsType.friends)
            setPopatTitle(ObjectsType.friendTitle)
            setMessegeas(ObjectsType.friendMessseges)
            setDistancePopat(ObjectsType.friendsDistanse)
        }
        if(type === ObjectsType.messeges){
            setTypeDataPopat(ObjectsType.messeges)
            setPopatTitle(ObjectsType.messegesTitle)
            setMessegeas(ObjectsType.messegesMesege)
            setDistancePopat(ObjectsType.messegesDistanse)
        }
        if(tempTypePopat === ObjectsType.friends && PopatActive && type === tempTypePopat){
            setPopatActive(false)
        }else if(tempTypePopat === ObjectsType.friends && !PopatActive){
            setPopatActive(true)
        }else if(tempTypePopat === ObjectsType.messeges && PopatActive && type === tempTypePopat){
            setPopatActive(false)
        }else if(tempTypePopat === ObjectsType.messeges && !PopatActive){
            setPopatActive(true)
        }

        if(tempTypePopat === "none" && !PopatActive){
            setPopatActive(true)
            setTempTypePopat(type)
        }

        setTempTypePopat(type)

    }



    return (
        <ul className={cl.WithLoginNavigation}>
            {searching ?
                        <div className={cl.WithLoginSearch}>
                            <input placeholder="Поиск аниме, манги, людей и персонажей"/>
                            <div className={cl.WithLoginSearchIconInput}>
                                <img width="20" height="20" src="/SearIconBlack.png" alt={"err"}/>
                            </div>
                        </div>
                :
                <ul className={cl.navigationUser}>
                    <li>AlphaDelta38</li>
                    <li onClick={()=>{ActivateUpdatePopat(ObjectsType.friends)}}><img width="20" height="20" src='/friendsIconWhite.png' alt={"sorry"}/></li>
                    <li onClick={()=>{ActivateUpdatePopat(ObjectsType.messeges)}}><img width="20" height="20" src='/messegeBellWhite.png' alt={"sorry"}/></li>
                    <PopatUniversal objects2={friendrequestObj} objects={meseggesObjects} distanse ={distansePopat} active={PopatActive} type={TypeDataPopat} Title={PopatTitle} message={messegeas}/>
                </ul>
            }
            {searching ?
                <li onClick={() => {
                    setSerching(false)
                }} className={cl.SecondLi}>
                    <img width="20" height="20" src='/CloseIconWhite.png' alt={"sorry"}/>
                </li>
                :
                <li onClick={() => {
                    setSerching(true)
                }} className={cl.SecondLi}>
                    <img width="20" height="20" src='/SearchIconWhite.png' alt={"sorry"}/>
                </li>
            }
            <li onClick={()=>{setIsLogin(false)}}>Выйти</li>
        </ul>
    );
};

export default WithLoginBar;