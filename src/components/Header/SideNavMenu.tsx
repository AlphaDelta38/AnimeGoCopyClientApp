import React from 'react';
import cl from "../modules/HeaderModules/Header.module.css"
import AdpativeFilters from "../AnimeChooseContent/AdpativeFilters";



interface SideNavMenuInterface {
    mobileActive: boolean
    FilterBarActive:boolean
    setFilterBarActive: (e:boolean) => void
}



const SideNavMenu = ({mobileActive, FilterBarActive,setFilterBarActive}: SideNavMenuInterface) => {

    function FilterSideBarDisable(){
            setFilterBarActive(false)
            document.documentElement.style.setProperty('--GLobalOverFlow', `visible`);
    }

    return (
        <div  className={mobileActive ? cl.SideBarMenuActive : FilterBarActive ? cl.SideBarMenuActive : cl.SideBarMenu  }>
            {mobileActive &&
                <div>
                    <div className={cl.SideBarHeader}>
                        <div>

                        </div>
                        <div>
                            alphadelta38
                        </div>
                    </div>
                    <ul className={cl.SideBarNav}>
                        <li>
                            <span>Аниме</span>
                            <div><img width="20px" height="20px" src='/shevron.png' alt={"sorry"}/></div>
                        </li>
                        <li>
                            <span>Манга</span>
                            <div><img width="20" height="20" src='/shevron.png' alt={"sorry"}/></div>
                        </li>
                        <li>
                            <span>Случайное Аниме</span>
                        </li>
                    </ul>
                </div>
            }
            <div className={FilterBarActive ? cl.CloseBtnForFiltersActive : cl.CloseBtnForFilters }>
                <button onClick={()=>FilterSideBarDisable()}>Закрыть фильтр</button>
            </div>
            {
                FilterBarActive &&
                <AdpativeFilters/>
            }
        </div>
    );
};


export default SideNavMenu;