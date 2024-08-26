import React, {useContext, useEffect, useState} from 'react';
import cl from "../modules/HeaderModules/Header.module.css";
import {ToggleContext, ToggleContextProps} from "../../context/ToggleProvider";
import {Link} from "react-router-dom";
import {routes} from "../../routes";



interface AdditionalNavigationMobileProps {
    scrollPosition:number,

}

const AdditionalNavigationMobile = ({scrollPosition}:AdditionalNavigationMobileProps) => {
    const [temp, setTemp] = useState(0);
    const [visible, setVIsible] = useState(false);
    const {MobileNavBarActive, setMobileNavBarActive,TranslationsSideBarActive}:ToggleContextProps = useContext(ToggleContext)!



    function  visibleCheck(e:number):void{
        if(temp < scrollPosition){
            setVIsible(false);
        }else {
            setVIsible(true)
        }
        setTemp(scrollPosition);
    }


    useEffect(()=>{
        visibleCheck(scrollPosition)
    }, [scrollPosition])


    return (
        <div style={ MobileNavBarActive ?  {transform:"translate3d(var(--translate-value), 0, 0)"} : {}}  className={ visible ? cl.AdditionalNavigationActive :  cl.AdditionalNavigation }>
            <div className={cl.AdditionalNavigation__container}>
                <Link style={{width: "100%"}} to={routes.FriendRequests}>
                    <div className={cl.additionalImageContainer} style={{cursor: "pointer"}}>
                        <svg width={"24"} height={"24"} fill={"white"}>
                            <use xlinkHref={"/sprite.svg#friendsIcon"}></use>
                        </svg>
                    </div>
                </Link>
                <Link style={{width: "100%"}} to={routes.Notification}>
                    <div className={cl.additionalImageContainerTwo} style={{cursor: "pointer"}}>
                        <svg width={"22"} height={"22"} fill={"none"} stroke={"#FFF"} strokeWidth={"16px"} strokeMiterlimit={"10px"}>
                            <use xlinkHref={"/sprite.svg#messegesBell"}></use>
                        </svg>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default AdditionalNavigationMobile;