import React, {useEffect, useState} from 'react';
import cl from "../modules/HeaderModules/Header.module.css";



interface AdditionalNavigationMobileProps {
    scrollPosition:number,
    mobActiva: boolean
}

const AdditionalNavigationMobile = ({scrollPosition, mobActiva}:AdditionalNavigationMobileProps) => {
    const [temp, setTemp] = useState(0);
    const [visible, setVIsible] = useState(false);

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
        <div  className={ visible ? cl.AdditionalNavigationActive :  cl.AdditionalNavigation }>
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