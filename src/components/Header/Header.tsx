import React, {useContext, useEffect, useState} from 'react';
import cl from '../modules/HeaderModules/Header.module.css'
import WithOutLoginBar from "./WithOutLoginBar";
import WithLoginBar from "./WithLoginBar";
import MobileHeader from "./MobileHeader";
import AdditionalNavigationMobile from "./AdditionalNavigationMobile";
import SideNavMenu from "./SideNavMenu";
import PopatUniversal from "./popatUniversal";
import {Link} from "react-router-dom";
import {routes} from "../../routes";
import {ToggleContext, ToggleContextProps} from "../../context/ToggleProvider";


interface HeaderInterface{

    FilterBarActive: boolean;
    setFilterBarActive: (e:boolean)=>void
}


const Header = ({ FilterBarActive, setFilterBarActive}:HeaderInterface) => {
    const [WidthState, setWidthState] = useState(false);
    const [IsLogin, setIsLogin] = useState(false);
    const [searching, setSerching] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const {MobileNavBarActive, setMobileNavBarActive}:ToggleContextProps = useContext(ToggleContext)!


    const handleScroll = () => {
        let position = window.scrollY;
        setScrollPosition(position);
    };



    function updateWidth() {
       const width = window.innerWidth;

        let percentValue = 80; // Процентное значение по умолчанию
        let maxPixels = 440;
        let screenWidth = window.innerWidth;

        // Вычисление смещения в пикселях
        let translatePixels = screenWidth * (percentValue / 100);

        // Ограничение до максимального значения
        if (translatePixels > maxPixels) {
            translatePixels = maxPixels;
        }

        document.documentElement.style.setProperty('--translate-value', `${translatePixels}px`);

       if(width > 992 ){
           setWidthState(false);
           if(!WidthState){
               setMobileNavBarActive(false)
               setFilterBarActive(false)
               document.documentElement.style.setProperty('--GLobalOverFlow', `visible`);
           }

        }else{
           setWidthState(true);
       }
    }

    useEffect(()=>{
        updateWidth()
    },[])


    function  CloserFildSideBar(){
        setMobileNavBarActive(false);
        setFilterBarActive(false)
        document.documentElement.style.setProperty('--GLobalOverFlow', `visible`);
    }

    window.addEventListener('resize', updateWidth);
    window.addEventListener('scroll', ()=>{
        setTimeout(handleScroll, 100)
    });





    return (
      <div >

          <SideNavMenu setFilterBarActive={setFilterBarActive}  FilterBarActive={FilterBarActive} />
          <div  onClick={()=>{CloserFildSideBar()}} className={ MobileNavBarActive ? cl.CLoseFieldForSideNavBarActive : FilterBarActive ? cl.CLoseFieldForSideNavBarActive :cl.CLoseFieldForSideNavBar }></div>
            <div  style={ MobileNavBarActive ?  {transform:"translate3d(var(--translate-value), 0, 0)"} : {}} className={ scrollPosition < 2 ? cl.HeaderContainer : cl.HeaderContainerScrollPosition}>
                {
                    WidthState ?< MobileHeader setFilterBarActive={setFilterBarActive} />
                    :
                <div className={cl.container}>
                    <div className={cl.Logo}>
                        <svg className={cl.HeaderSVGlogo} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 95.55 22.53"
                             style={{width: "5.8rem", height: "1.4rem", color: "white"}} role="img">
                            <path
                                d="M12.81,30.78l-.69-4.17-4.47.18L6.51,32.43l-4.2-.36L7.68,10.32l5.55.48,3.93,20.34ZM10.17,14.25,8.28,23.58l3.36-.12Z"
                                transform="translate(-2.31 -9.9)"></path>
                            <path
                                d="M25.41,16.8q4,0,4,6.6,0,3.48-.39,7.38l-3.51-.33q.33-3.42.33-6.91c0-2.33-.33-3.5-1-3.5-.32,0-.73.81-1.23,2.42a21.53,21.53,0,0,0-.93,4.72q.06,1.23.24,4.44l-3.51-.33q-.33-4.23-.33-7.44t.18-5.76l2.22.24q.06.24.45,2Q23.64,16.8,25.41,16.8Z"
                                transform="translate(-2.31 -9.9)"></path>
                            <path d="M32.73,11.49l3.36.39-.3,3.36-3.36-.42Zm-.24,5.28,3.42.33V31.5l-3.42-.33Z"
                                  transform="translate(-2.31 -9.9)"></path>
                            <path
                                d="M45.63,17.7A3.29,3.29,0,0,1,48.42,19q1.56-2.28,3.09-2.28,4.17,0,4.17,6.27a74.35,74.35,0,0,1-.6,8.58l-3.48-.3q.57-5.61.57-8.55t-1-2.94q-.42,0-1,1.35a10.64,10.64,0,0,0-.75,3q-.06,3.75-.24,6.69l-3.51-.33q.24-4.23.24-7t-.75-2.73c-.32,0-.73.56-1.24,1.67a14.47,14.47,0,0,0-1.1,3.49q0,2.76.27,5.7l-3.51-.33q-.33-4.23-.33-7.71t.18-6.51l2.49.18q.18.81.51,2.94Q44.07,17.7,45.63,17.7Z"
                                transform="translate(-2.31 -9.9)"></path>
                            <path
                                d="M62.43,28.92q1.14,0,2.43-2.19l2.28,1.35a15.91,15.91,0,0,1-1.09,1.68,5.54,5.54,0,0,1-1.58,1.32,4.46,4.46,0,0,1-2.34.63A3.93,3.93,0,0,1,59,30.11a6.74,6.74,0,0,1-1.29-4.34A15.16,15.16,0,0,1,58.77,20a5.69,5.69,0,0,1,1.73-2.29,3.71,3.71,0,0,1,2.31-.89,4.11,4.11,0,0,1,1.9.38,4.29,4.29,0,0,1,1.16.84,4,4,0,0,1,.76,1.36,13.78,13.78,0,0,1,.47,1.47,12.11,12.11,0,0,1,.22,1.65q.12,1.44.12,2.61a51.36,51.36,0,0,1-6.21,1.2,5.71,5.71,0,0,0,.42,1.92Q62,28.92,62.43,28.92Zm.66-9.21c-.44,0-.83.44-1.18,1.32a9.6,9.6,0,0,0-.62,3.06q1.59-.33,2.76-.63Q64.05,19.71,63.09,19.71Z"
                                transform="translate(-2.31 -9.9)"></path>
                            <path
                                d="M77.91,19.17a11.17,11.17,0,0,0,.12-2,6.88,6.88,0,0,0-.45-2.52c-.3-.77-.74-1.16-1.32-1.16s-1.38.91-2,2.72a16.86,16.86,0,0,0-1,5.82,15.59,15.59,0,0,0,.6,4.86c.4,1.17,1,1.75,1.77,1.75a1.92,1.92,0,0,0,1.77-1.08,9.54,9.54,0,0,0,.9-3.18,13.76,13.76,0,0,0-2.31.21l-.63-3q2.73-.18,6.84-.66a25,25,0,0,1,.18,2.85,9,9,0,0,1-.76,3.21,9.66,9.66,0,0,1-2.28,3.39A4.69,4.69,0,0,1,76,31.92a6,6,0,0,1-5-2.43,11,11,0,0,1-1.88-6.87,22.3,22.3,0,0,1,.81-6.12,12,12,0,0,1,2.4-4.68A4.72,4.72,0,0,1,76,10a5.74,5.74,0,0,1,3.72,1.44,5.27,5.27,0,0,1,1.46,2.15,7.81,7.81,0,0,1,.55,2.92,16.08,16.08,0,0,1-.27,3Z"
                                transform="translate(-2.31 -9.9)"></path>
                            <path
                                d="M90.68,32.1a5.89,5.89,0,0,1-4.83-2.56q-2-2.57-2-7.8A15.42,15.42,0,0,1,86,13.2q2.14-3.3,5-3.3a5.85,5.85,0,0,1,4.85,2.58q1.93,2.58,1.93,7.77a15.39,15.39,0,0,1-2.16,8.52Q93.54,32.1,90.68,32.1ZM88.83,15.8a15.42,15.42,0,0,0-1,5.85,12.5,12.5,0,0,0,.83,5.22c.55,1.13,1.23,1.69,2,1.69s1.55-.78,2.18-2.34a15.74,15.74,0,0,0,.94-5.86,12.86,12.86,0,0,0-.79-5.21c-.53-1.12-1.19-1.68-2-1.68S89.47,14.25,88.83,15.8Z"
                                transform="translate(-2.31 -9.9)"></path>
                        </svg>
                    </div>
                    <div className={cl.navigation}>
                        <ul className={cl.firstNavigation}>

                            <li className={cl.firstLi}>
                                <Link style={{textDecoration: "none", color:"inherit"}} to={routes.AnimeList}>
                                    Аниме
                                </Link>
                            </li>

                            <li className={cl.firstLi}>
                                <Link style={{textDecoration: "none", color:"inherit"}} to={routes.MangaList}>
                                    Манга
                                </Link>
                            </li>
                            <li className={cl.firstLi}>
                                <Link style={{textDecoration: "none", color:"inherit"}} to={routes.Characters}>
                                    Персонажи
                                </Link>
                            </li>
                            <li className={cl.firstLi}>
                                <Link style={{textDecoration: "none", color:"inherit"}} to={routes.HomePage}>
                                    Случайное аниме
                                </Link>
                            </li>


                        </ul>
                        <ul className={cl.SecondNavigation}>
                            {IsLogin
                                ?
                                <WithLoginBar setSerching={setSerching}  searching={searching} setIsLogin={setIsLogin}/>
                                :
                                <WithOutLoginBar setSerching={setSerching} searching={searching} setIsLogin={setIsLogin}/>
                            }
                        </ul>
                    </div>
                </div>
                }
            </div>
          { WidthState && <AdditionalNavigationMobile scrollPosition={scrollPosition} />}
      </div>
    );
};

export default Header;