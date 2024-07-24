import React, {useState} from 'react';
import cl from '../modules/AnimeChooseContentModules/AdaptiveFilters.module.css'
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
                    <svg width={"18"} height={"18"} fill={"white"} style={{marginTop: "6px"}}>
                        <use xlinkHref={"/sprite.svg#OptionsIcon"}></use>
                    </svg>
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