import React, {useState} from 'react';
import cl from "../modules/WeeklyItem.module.css"
import {WeeklyOjbectInterface} from "../../types";
import AnimeWeeklyItem from "./AnimeWeeklyItem";

interface WeeklyItemInterface{
    title: string
    objects: WeeklyOjbectInterface[]
}


const WeeklyItem  = ({title, objects}: WeeklyItemInterface) => {
    const [active, setActive] = useState(false);

    function checkActive(){
        if(active){
            setActive(false)
        }else{
            setActive(true)
        }
    }



    return (
        <div className={cl.container}>
            <div className={cl.HeaderContainer}>
                <div className={cl.title}>
                    {title}
                </div>
                <div className={cl.btnContainer}>
                   <button style={active ? {borderBottom: "none"} : {}} onClick={()=>checkActive()} >{active ? "Свернуть" : "Развернуть"}</button>
                </div>
            </div>
            <div style={active ? {maxHeight: "456px"} : {maxHeight: "0"}} className={cl.content}>
                {objects.map((value,index) => <AnimeWeeklyItem key={index + value.animeName.length} imgUrl={value.imgUrl} animeName={value.animeName} episode={value.episode} additional={value.additional}/>)}
            </div>
        </div>
    );
};

export default WeeklyItem;