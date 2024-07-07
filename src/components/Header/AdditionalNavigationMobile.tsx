import React, {useContext, useEffect, useState} from 'react';
import cl from "../modules/HeaderModules/Header.module.css";
import {ToggleContext, ToggleContextProps} from "../../context/ToggleProvider";



interface AdditionalNavigationMobileProps {
    scrollPosition:number,

}

const AdditionalNavigationMobile = ({scrollPosition}:AdditionalNavigationMobileProps) => {
    const [temp, setTemp] = useState(0);
    const [visible, setVIsible] = useState(false);
    const {MobileNavBarActive, setMobileNavBarActive}:ToggleContextProps = useContext(ToggleContext)!



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
                <div>
                    <img width="28"  alt="sorry" height="28" src="/friendsIconWhite28x28.png"/>
                </div>
                <div>
                    <img width="28" alt="sorry"  height="28" src="/bellMesage28x28.png"/>
                </div>
            </div>
        </div>
    );
};

export default AdditionalNavigationMobile;