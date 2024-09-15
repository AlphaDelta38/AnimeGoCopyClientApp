import React, {useContext} from 'react';
import cl from "../modules/HeaderModules/Header.module.css"
import AdpativeFilters from "../AnimeChooseContent/AdpativeFilters";
import {ToggleContext, ToggleContextProps} from "../../context/ToggleProvider";
import TranslationsSideBar from "../AnimePage/TranslationsSideBar";
import {useTypedSelector} from "../../hooks/useTypeSelector";
import {Link} from "react-router-dom";
import {routes} from "../../routes";
import {useDispatch} from "react-redux";
import {ExitUserSetActionCreator} from "../../Store/action-creator/userActionCreator";



interface SideNavMenuInterface {

    FilterBarActive:boolean
    setFilterBarActive: (e:boolean) => void
}



const SideNavMenu = ({ FilterBarActive,setFilterBarActive}: SideNavMenuInterface) => {

    const {MobileNavBarActive, setMobileNavBarActive, TranslationsSideBarActive}:ToggleContextProps = useContext(ToggleContext)!
    const data = useTypedSelector(state => state.user)
    const dispatch = useDispatch()

    function FilterSideBarDisable(){
        setFilterBarActive(false)
        setMobileNavBarActive(false)
        document.documentElement.style.setProperty('--GLobalOverFlow', `visible`);
    }

    function Exit(){
        dispatch(ExitUserSetActionCreator());
        FilterSideBarDisable();
    }

    return (
        <div  className={MobileNavBarActive ? cl.SideBarMenuActive : FilterBarActive ? cl.SideBarMenuActive : TranslationsSideBarActive ? cl.SideBarMenuActive :  cl.SideBarMenu  }>
            {MobileNavBarActive &&
                !FilterBarActive &&
                !TranslationsSideBarActive &&
                <div>
                    <div className={cl.SideBarHeader}>
                        <div>
                             <img  width={"100"} height={"100%"}  alt={""} src={data.profilePhoto ? `${process.env.REACT_APP_API_URL}${data.profilePhoto}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQzLhg0HDlP9pTv_UW4xk1SftSxAvz8wRSxA&s"} />
                        </div>
                        <div>
                            {data.isLogin ?
                                <Link onClick={()=>FilterSideBarDisable()} style={{textDecoration:"none", color:"inherit"}} to={routes.Profile}>{data.login}</Link>
                            :
                                <Link onClick={()=>FilterSideBarDisable()} style={{textDecoration:"none", color:"inherit"}} to={routes.login}>Войти</Link>
                            }
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
                        {data.isLogin &&
                            <li onClick={() => Exit()}
                                style={{textAlign: "center", justifyContent: "center", backgroundColor: "#ff5c57"}}>
                                <span style={{marginLeft: "auto", color: "white"}}>Выйти</span>
                            </li>
                        }
                    </ul>
                </div>
            }
            <div className={FilterBarActive ? cl.CloseBtnForFiltersActive : cl.CloseBtnForFilters}>
                <button onClick={() => FilterSideBarDisable()}>Закрыть фильтр</button>
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