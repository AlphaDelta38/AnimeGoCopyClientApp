import React, {useContext} from 'react';
import cl from "../modules/GeneralPageModules/GeneralPage.module.css";
import {DateContext} from "../../context/context";

const Footer = () => {

    const CurrentYear = useContext(DateContext)?.CurrentYear

    return (
        <footer className={cl.footer}>
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