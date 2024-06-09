import React from 'react';
import cl from "../modules/Header.module.css";


interface WithLogin {
    searching: boolean,
    setIsLogin: (value:boolean) => void,
    setSerching: (value:boolean) => void,
}




const WithLoginBar = ({searching, setIsLogin, setSerching}:WithLogin) => {
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
                    <li><img width="20" height="20" src='/friendsIconWhite.png' alt={"sorry"}/></li>
                    <li><img width="20" height="20" src='/messegeBellWhite.png' alt={"sorry"}/></li>
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