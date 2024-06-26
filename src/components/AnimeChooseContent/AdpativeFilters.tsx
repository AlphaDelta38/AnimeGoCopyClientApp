import React, {useState} from 'react';
import cl from '../modules/AdaptiveFilters.module.css'
import RangeFilter from "./RangeFilter";
import DropDownFilters from "./DropDownFilters";


interface  AdpativeFiltersFilter{
    SearchButtonAvaible?:boolean
}



const AdpativeFilters = ({SearchButtonAvaible} : AdpativeFiltersFilter) => {

    const [filters, setFilters] = useState([
        { SingleName: "Жанр", Titlejanr: "Жанры", janrs: ["Исекай", "Басикай", "Сенён","Басикай", "Сенён","Басикай", "Сенён",]},
        { SingleName: "Рейтинг", Titlejanr: "Рейтинг", janrs: ["5.0", "10.0", "20.0","30", "Сенён","Басикай", "Сенён","Сенён",]},

        ]);


    return (
        <div className={cl.container}>
            <div className={cl.header}>
                <div>
                    <img width="20" height="20" src={"./ForFilter.png"} alt=""/>
                </div>
                <div>Фильтр</div>
            </div>
            <div className={cl.content}>
                <RangeFilter/>
                <DropDownFilters filters={filters}/>
                <div style={SearchButtonAvaible ? {} : {display: "none"}} className={cl.ButtonANimeContent}>
                    <button>Искать</button>
                </div>
            </div>
        </div>
    );
};

export default AdpativeFilters;