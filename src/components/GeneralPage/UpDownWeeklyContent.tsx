import React from 'react';
import cl from '../modules/UpDownWeeklyContent.module.css'
import {WeeklyOjbectInterface} from "../../types";
import WeeklyItem from "./WeeklyItem";







interface UpDownWeeklyContentInterface{
    title: string,
    description?: string,
    itemDate: {
        WeeklyDay: string,
        objects: WeeklyOjbectInterface[],
    }[]
}



const UpDownWeeklyContent = ({title, description, itemDate}:UpDownWeeklyContentInterface) => {



    return (

        <div className={cl.container}>
            <div className={cl.header}>
                {title}
            </div>
            <div style={description ? {} : {display: "none"}} className={cl.description}>
                {description}
            </div>
            <div  className={cl.content}>
                {itemDate.map((value, index) =><WeeklyItem key={index + value.objects.length} objects={value.objects} title={value.WeeklyDay}/>)}
            </div>
        </div>
    );
};

export default UpDownWeeklyContent;