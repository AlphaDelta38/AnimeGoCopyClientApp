import React from 'react';
import cl from "../modules/HeaderModules/Header.module.css";
import {Link} from "react-router-dom";
import {routes} from "../../routes";
import {useTypedSelector} from "../../hooks/useTypeSelector";


interface LoginFalse {
    searching: boolean,
    setSerching: (value:boolean) => void,
}



const WithOutLoginBar = ({searching, setSerching}:LoginFalse) => {




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
                <li className={cl.SecondLi}>
                   <Link style={{textDecoration:"none", color:"inherit"}} to={routes.login}>Войти</Link>
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