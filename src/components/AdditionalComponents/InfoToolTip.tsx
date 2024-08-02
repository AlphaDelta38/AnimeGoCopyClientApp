import React, {CSSProperties, useState} from 'react';
import cl from '../modules/AdditionalComponentsModules/InfoToolTip.module.css'



interface InfoToolTipInterface{
    message: string
    width?: number
    height?: number
    cssProperties?: CSSProperties
}


const InfoToolTip = ({message, height, width, cssProperties}:InfoToolTipInterface) => {
    const [active, setActive] = useState(false)

    function ActivateToltip(){
        if(active){
            setActive(false)
        }else{
            setActive(true)
        }
    }


    return (
        <div    style={cssProperties} className={cl.ToolTipContainer}>
                <div style={active ? {visibility: "visible"} : {visibility: "hidden"}} className={cl.Info}>
                    {message}
                </div>
                <svg width={`${width ? width : "20"}`} height={`${height ? height : "20"}`}>
                    <use onMouseLeave={() => {ActivateToltip()}} onMouseOver={() => {ActivateToltip()}} xlinkHref={"/sprite.svg#toolTipIcon"}></use>
                </svg>
        </div>
    );
};

export default InfoToolTip;