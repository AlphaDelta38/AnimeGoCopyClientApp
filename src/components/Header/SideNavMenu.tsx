import React from 'react';
import cl from "../modules/Header.module.css"



interface SideNavMenuInterface {
    mobileActive: boolean
}

const SideNavMenu = ({mobileActive}: SideNavMenuInterface) => {
    return (
        <div  className={mobileActive ? cl.SideBarMenuActive : cl.SideBarMenu}>
            <div className={cl.SideBarHeader}>
                <div>

                </div>
                <div>
                    alphadelta38
                </div>
            </div>
            <ul className={cl.SideBarNav}>
                <li>
                    <span>Аниме</span>
                    <div><img width="20px" height="20px" src='/shevron.png' alt={"sorry"}/></div>
                </li>
                <li>
                    <span>Манга</span>
                    <div><img width="20" height="20" src='/shevron.png' alt={"sorry"}/></div>
                </li>
                <li>
                    <span>Случайное Аниме</span>
                </li>
            </ul>
        </div>
    );
};




export default SideNavMenu;