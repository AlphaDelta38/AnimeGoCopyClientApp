import React, {useContext} from 'react';
import cl from "../modules/HeaderModules/Header.module.css"
import AdpativeFilters from "../AnimeChooseContent/AdpativeFilters";
import {ToggleContext, ToggleContextProps} from "../../context/ToggleProvider";
import TranslationsSideBar from "../AnimePage/TranslationsSideBar";



interface SideNavMenuInterface {

    FilterBarActive:boolean
    setFilterBarActive: (e:boolean) => void
}



const SideNavMenu = ({ FilterBarActive,setFilterBarActive}: SideNavMenuInterface) => {

    const {MobileNavBarActive, setMobileNavBarActive, TranslationsSideBarActive}:ToggleContextProps = useContext(ToggleContext)!



    function FilterSideBarDisable(){
        setFilterBarActive(false)
        setMobileNavBarActive(false)
        document.documentElement.style.setProperty('--GLobalOverFlow', `visible`);
    }

    return (
        <div  className={MobileNavBarActive ? cl.SideBarMenuActive : FilterBarActive ? cl.SideBarMenuActive : TranslationsSideBarActive ? cl.SideBarMenuActive :  cl.SideBarMenu  }>
            {MobileNavBarActive &&
                !FilterBarActive &&
                !TranslationsSideBarActive &&
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
                            <div>
                                <svg width={"14"} height={"14"} fill={"black"}>
                                    <use xlinkHref={"/sprite.svg#ShevronIcon"}></use>
                                </svg>
                            </div>
                        </li>
                        <li>
                            <span>Манга</span>
                            <div>
                                <svg width={"14"} height={"14"} fill={"black"}>
                                    <use xlinkHref={"/sprite.svg#ShevronIcon"}></use>
                                </svg>
                            </div>
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
            {
                TranslationsSideBarActive &&
                <TranslationsSideBar/>
            }
        </div>
    );
};


export default SideNavMenu;