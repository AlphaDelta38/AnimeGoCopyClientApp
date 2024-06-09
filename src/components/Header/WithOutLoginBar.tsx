import React from 'react';
import cl from "../modules/Header.module.css";


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
                            <img width="20" height="20" src="/SearIconBlack.png" alt={"err"}/>
                        </div>
                    </div>
                </li>
                :
                <li  onClick={()=>{setIsLogin(true)}} className={cl.SecondLi}>
                    Войти
                </li>
            }
            {searching ?
                <li onClick={()=>{setSerching(false)}} className={cl.SecondLi}>
                    <img width="20" height="20" src='/CloseIconWhite.png' alt={"sorry"}/>
                </li>
                :
                <li onClick={()=>{setSerching(true)}} className={cl.SecondLi}>
                    <img width="20" height="20" src='/SearchIconWhite.png' alt={"sorry"}/>
                </li>
            }
        </ul>
    );
};

export default WithOutLoginBar;