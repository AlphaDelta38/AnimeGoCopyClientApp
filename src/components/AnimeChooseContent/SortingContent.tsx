import React, {useContext, useState} from 'react';
import cl from '../modules/AnimeChooseContentModules/SortingContent.module.css'
import {ToggleContext, ToggleContextProps} from "../../context/ToggleProvider";


interface SortingContentInterface{
    SetkaGridActive:string
    setSetkaGridActive: (e:string)=>void
    setFilterBarActive: (e:boolean)=>void
    SortingContentDisable?: boolean
}



const SortingContent = ({SetkaGridActive, setSetkaGridActive, setFilterBarActive, SortingContentDisable}: SortingContentInterface) => {
    const [choseVariant, setChoseVariant] = useState("Дате выхода");
    const [SortUp, setSortUp] = useState(false);
    const [dropDownActive, setDropDownActive] = useState(false);
    const {MobileNavBarActive, setMobileNavBarActive}:ToggleContextProps = useContext(ToggleContext)!

    function ChooseController(type:string){
        if(type === choseVariant){
            if(SortUp){
                setSortUp(false)
            }else{
                setSortUp(true)
            }
        }else{
            setSortUp(false)
            setChoseVariant(type)
        }
        setDropDownActive(false)
    }

    function dropDownCheck(){
        if(dropDownActive){
            setDropDownActive(false)
        }else{
            setDropDownActive(true)
        }
    }


    function setGridSetkaActive(SetkaType:string){
        if(SetkaType !== SetkaGridActive){
            setSetkaGridActive(SetkaType)
        }
    }

    function setFilterBar(){
        setFilterBarActive(true)
        setMobileNavBarActive(true)
        document.documentElement.style.setProperty('--GLobalOverFlow', `hidden`);
    }



    return (
        <div  style={SortingContentDisable ? {display: "none"} : {}} className={cl.container}>
            <div className={cl.content}>
                <div className={cl.chooseContent}>
                    <div  className={cl.sortInfo} style={{textWrap: "nowrap"}}>
                        Сортировать по:
                    </div>

                    <div  onClick={()=>{setFilterBar()}} className={cl.MobileFilterBtn}>
                        <button>Фильтр</button>
                        <div className={cl.FilterIcon}>
                            <span>
                                <svg width={"16"} height={"16"} fill={"black"}>
                                    <use xlinkHref={"/sprite.svg#OptionsIcon"}></use>
                                </svg>
                            </span>
                        </div>
                    </div>

                    <div onClick={() => {
                        dropDownCheck()
                    }} className={cl.btnContainer}>
                        <button>{choseVariant}</button>
                        <div className={cl.sortUpDown}>
                            {SortUp
                                ?
                                <svg width={"12"} height={"12"} fill={"black"} style={{transform:"rotate(-90deg)",  marginBottom:"2px"}}>
                                    <use xlinkHref={"/sprite.svg#ShevronIcon"}></use>
                                </svg>
                                :
                                <svg width={"12"} height={"12"} fill={"black"} style={{transform:"rotate(90deg)", marginBottom:"2px"}}>
                                    <use xlinkHref={"/sprite.svg#ShevronIcon"}></use>
                                </svg>
                            }
                        </div>
                    </div>
                    <div style={dropDownActive ? {visibility: "visible"} : {visibility: "hidden"}}
                         className={cl.dropDown }>
                        <div style={choseVariant === "Дате добавления" ? {backgroundColor: "#ff5c57", color:"#fff"} : {} } onClick={()=>{ChooseController("Дате добавления")}} className={cl.dropDown__Item}>
                            Дате добавления
                        </div>
                        <div style={choseVariant === "Дате выхода" ? {backgroundColor: "#ff5c57", color:"#fff"} : {} } onClick={()=>{ChooseController("Дате выхода")}} className={cl.dropDown__Item}>
                            Дате выхода
                        </div>
                        <div style={choseVariant === "Рейтингу" ? {backgroundColor: "#ff5c57", color:"#fff"} : {} } onClick={()=>{ChooseController("Рейтингу")}} className={cl.dropDown__Item}>
                            Рейтингу
                        </div>
                        <div style={choseVariant === "Названию" ? {backgroundColor: "#ff5c57", color:"#fff"} : {} } onClick={()=>{ChooseController("Названию")}} className={cl.dropDown__Item}>
                            Названию
                        </div>
                    </div>
                </div>
                <div className={cl.TypeChoose}>
                    <div style={SetkaGridActive === "3x3" ? {padding: ".5rem", backgroundColor: "#ff5c57"} : {} } onClick={()=>{setGridSetkaActive("3x3")}} >
                        {SetkaGridActive === "3x3"
                            ?
                            <svg className={cl.formatSetSvgIconActive}  width={"22px"} height={"22px"}>
                                <use xlinkHref={"/sprite.svg#3x3SetkaIcon"}></use>
                            </svg>
                            :
                            <svg className={cl.formatSetSvgIcon}  width={"22px"} height={"22px"}>
                                <use xlinkHref={"/sprite.svg#3x3SetkaIcon"}></use>
                            </svg>
                        }
                    </div>
                    <div style={SetkaGridActive === "2x2" ? {padding: ".5rem", backgroundColor: "#ff5c57"} : {} } onClick={()=>{setGridSetkaActive("2x2")}}>
                        {SetkaGridActive === "2x2"
                            ?
                            <svg className={cl.formatSetSvgIconActive}  width={"22px"} height={"22px"}>
                                <use xlinkHref={"/sprite.svg#2x2SetkaIcon"}></use>
                            </svg>
                            :
                            <svg className={cl.formatSetSvgIcon}  width={"22px"} height={"22px"}>
                                <use xlinkHref={"/sprite.svg#2x2SetkaIcon"}></use>
                            </svg>
                        }
                    </div>
                    <div style={SetkaGridActive === "2x3" ? {padding: ".5rem", backgroundColor: "#ff5c57"} : {} } onClick={()=>{setGridSetkaActive("2x3")}}>
                        {SetkaGridActive === "2x3"
                            ?
                            <svg className={cl.formatSetSvgIconActive}  width={"22px"} height={"22px"}>
                                <use xlinkHref={"/sprite.svg#2x3SetkaIcon"}></use>
                            </svg>
                            :
                            <svg className={cl.formatSetSvgIcon}  width={"22px"} height={"22px"}>
                                <use xlinkHref={"/sprite.svg#2x3SetkaIcon"}></use>
                            </svg>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SortingContent;