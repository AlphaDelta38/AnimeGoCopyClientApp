import React, {useState} from 'react';
import cl from '../modules/InfoToolTip.module.css'




const InfoToolTip = () => {
    const [active, setActive] = useState(false)

    function ActivateToltip(){
        if(active){
            setActive(false)
        }else{
            setActive(true)
        }

    }


    return (
        <div  className={cl.ToolTipContainer}>
            <div>
                <img onMouseLeave={()=>{ActivateToltip()}}  onMouseOver={()=>{ActivateToltip()}} width="20" height="20" src={"./toolTipIcon.png"}  alt={""}/>
                <div style={active ? {visibility: "visible"} : {visibility:"hidden"}} className={cl.Info}>
                    В синем положении индикатора, выводятся те аниме в которых присутствуют все выбранные вами жанры. В сером положении, выводятся аниме в которых присутствует хотя бы один из выбранных вами жанров.
                </div>
            </div>
        </div>
    );
};

export default InfoToolTip;