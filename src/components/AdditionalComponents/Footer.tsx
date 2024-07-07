import React, {useContext} from 'react';
import cl from "../modules/GeneralPageModules/GeneralPage.module.css";
import {DateContext} from "../../context/context";
import {ToggleContext, ToggleContextProps} from "../../context/ToggleProvider";

const Footer = () => {

    const CurrentYear = useContext(DateContext)?.CurrentYear
    const {MobileNavBarActive, setMobileNavBarActive}:ToggleContextProps = useContext(ToggleContext)!


    return (
        <footer  style={ MobileNavBarActive ?  {transform:"translate3d(var(--translate-value), 0, 0)"} : {}} className={cl.footer}>
            <div className={cl.footerContainer}>
                <div className={cl.footerContent}>
                    <ul className={cl.PolicyInfoList}>
                        <li>
                            Соглашение
                        </li>
                        <li>
                            Конфиденциальность
                        </li>
                        <li>
                            Для правообладателей
                        </li>
                    </ul>
                    <div className={cl.CopyRight}>
                        {` © animego.org 2017-${CurrentYear}`}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;