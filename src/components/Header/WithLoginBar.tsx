import React, {useEffect, useState} from 'react';
import cl from "../modules/HeaderModules/Header.module.css";
import PopatUniversal from "./popatUniversal";
import {Link} from "react-router-dom";
import {routes} from "../../routes";
import {useTypedSelector} from "../../hooks/useTypeSelector";
import {useDispatch} from "react-redux";
import {ExitUserSetActionCreator} from "../../Store/action-creator/userActionCreator";
import {getAllFriensRequest} from "../../types";
import {getAllMyFriedns} from "../../http/FriendsApi";


interface WithLogin {
    searching: boolean,
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


const WithLoginBar = ({searching, setSerching}:WithLogin) => {

    const [PopatActive, setPopatActive] = useState(false);
    const [TypeDataPopat, setTypeDataPopat] = useState("");
    const [PopatTitle, setPopatTitle] = useState("");
    const [messegeas, setMessegeas] = useState("");
    const [distansePopat, setDistancePopat] = useState(0);
    const [tempTypePopat, setTempTypePopat] = useState("none");
    const data = useTypedSelector(state => state.user)
    const dataFriend = useTypedSelector(state => state.friends)
    const dispatch = useDispatch()

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
                                <svg width={"16px"} height={"16px"} stroke={"black"} fill={"none"}>
                                    <use xlinkHref={"/sprite.svg#SearchIconPCVersion"}></use>
                                </svg>
                            </div>
                        </div>
                :
                <ul className={cl.navigationUser}>
                    <li>
                        <Link style={{textDecoration: "none", color: "inherit"}} to={routes.Profile}>
                            {data.login}
                        </Link>
                    </li>
                    <li onClick={() => {ActivateUpdatePopat(ObjectsType.friends)}}>
                       <svg width={"18"} height={"18"} fill={"white"} >
                           <use xlinkHref={"/sprite.svg#friendsIcon"}></use>
                       </svg>
                        <div style={dataFriend.friendsRequest.length > 0 ? {}  : {display:"none"}} className={cl.friendsMessageCircle}>
                            <span>{dataFriend.friendsRequest.length}</span>
                        </div>
                    </li>
                    <li onClick={() => {ActivateUpdatePopat(ObjectsType.messeges)}}>
                        <svg width={"16"} height={"16"} fill={"none"} stroke={"#FFF"} strokeWidth={"16px"} strokeMiterlimit={"10px"} >
                            <use xlinkHref={"/sprite.svg#messegesBell"}></use>
                        </svg>
                    </li>
                    <PopatUniversal
                        objects2={dataFriend.friendsRequest}
                        objects={meseggesObjects}
                        distanse={distansePopat}
                        active={PopatActive}
                        type={TypeDataPopat}
                        Title={PopatTitle}
                        message={messegeas}
                    />

                </ul>
            }
            {searching ?
                <li onClick={() => {setSerching(false)}} className={cl.SecondLi}>
                    <svg width={"16px"} height={"16px"} stroke={"white"} fill={"white"} strokeWidth={"2"}>
                        <use xlinkHref={"/sprite.svg#CloseBtnIcon"}></use>
                    </svg>
                </li>
                :
                <li onClick={() => {
                    setSerching(true)
                }} className={cl.SecondLi}>
                    <svg width={"16px"} height={"16px"} stroke={"white"} fill={"none"} >
                        <use xlinkHref={"/sprite.svg#SearchIconPCVersion"}></use>
                    </svg>
                </li>
            }
            <li onClick={() => {
                dispatch(ExitUserSetActionCreator())
            }}>Выйти
            </li>
        </ul>
    );
};

export default WithLoginBar;