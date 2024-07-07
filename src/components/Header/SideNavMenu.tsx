import React, {useContext} from 'react';
import cl from "../modules/HeaderModules/Header.module.css"
import AdpativeFilters from "../AnimeChooseContent/AdpativeFilters";
import {ToggleContext, ToggleContextProps} from "../../context/ToggleProvider";



interface SideNavMenuInterface {

    FilterBarActive:boolean
    setFilterBarActive: (e:boolean) => void
}



const SideNavMenu = ({ FilterBarActive,setFilterBarActive}: SideNavMenuInterface) => {

    const {MobileNavBarActive, setMobileNavBarActive}:ToggleContextProps = useContext(ToggleContext)!



    function FilterSideBarDisable(){
            setFilterBarActive(false)
            document.documentElement.style.setProperty('--GLobalOverFlow', `visible`);
    }

    return (
        <div  className={MobileNavBarActive ? cl.SideBarMenuActive : FilterBarActive ? cl.SideBarMenuActive : cl.SideBarMenu  }>
            {MobileNavBarActive &&
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