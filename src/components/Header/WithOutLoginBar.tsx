import React from 'react';
import cl from "../modules/HeaderModules/Header.module.css";


interface LoginFalse {
    searching: boolean,
    setIsLogin: (value:boolean) => void,
    setSerching: (value:boolean) => void,
}



const WithOutLoginBar = ({searching, setIsLogin, setSerching}:LoginFalse) => {
    return (
        <ul className={cl.SecondNavigation}>
            {searching ?
                <li className={cl.SecondLiSearch}>
                    <div>
                        <input placeholder="Поиск людей,манги,аниме,и персонажей"/>
                        <div className={cl.SearchIconInput}>
                            <svg width={"16px"} height={"16px"} stroke={"black"} fill={"none"}>
                                <use xlinkHref={"/sprite.svg#SearchIconPCVersion"}></use>
                            </svg>
                        </div>
                    </div>
                </li>
                :
                <li onClick={() => {
                    setIsLogin(true)
                }} className={cl.SecondLi}>
                    Войти
                </li>
            }
            {searching ?
                <li onClick={()=>{setSerching(false)}} className={cl.SecondLi}>
                    <svg width={"16px"} height={"16px"} stroke={"white"} fill={"white"} strokeWidth={"2"}>
                        <use xlinkHref={"/sprite.svg#CloseBtnIcon"}></use>
                    </svg>
                </li>
                :
                <li onClick={() => {
                    setSerching(true)
                }} className={cl.SecondLi}>
                    <svg width={"16px"} height={"16px"} stroke={"white"} fill={"none"}>
                        <use xlinkHref={"/sprite.svg#SearchIconPCVersion"}></use>
                    </svg>
                </li>
            }
        </ul>
    );
};

export default WithOutLoginBar;