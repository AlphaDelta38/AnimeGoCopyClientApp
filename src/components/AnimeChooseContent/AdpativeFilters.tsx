import React from 'react';
import cl from '../modules/AdaptiveFilters.module.css'
import RangeFilter from "./RangeFilter";






const AdpativeFilters = () => {
    return (
        <div className={cl.container}>
            <div className={cl.header}>
                <div>
                    <img  width="20" height="20" src={"./ForFilter.png"} alt=""/>
                </div>
                <div>Фильтр</div>
            </div>
            <div className={cl.content}>
                 <RangeFilter/>
            </div>
        </div>
    );
};

export default AdpativeFilters;