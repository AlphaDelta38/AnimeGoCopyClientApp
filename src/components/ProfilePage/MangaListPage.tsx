import React, {useContext, useState} from 'react';
import cl from "../modules/ProfilePageModules/AnimeListPage.module.css";
import SideNavigationProfile from "./SideNavigationProfile";
import {ToggleContext, ToggleContextProps} from "../../context/ToggleProvider";
import {useNavigate} from "react-router-dom";






const MangaListPage = () => {

    const {MobileNavBarActive, setMobileNavBarActive}:ToggleContextProps = useContext(ToggleContext)!
    const [choseType, setChoseType] = useState("All")
    const navigate = useNavigate();

    function changeChooseFilter(type:string){
        setChoseType(type)
    }


    return (
        <div style={MobileNavBarActive ? {transform: "translate3d(var(--translate-value), 0, 0)"} : {}}
             className={cl.container}>
            <div className={cl.row}>
                <div className={cl.OwnAnimeListContainer}>
                    <div className={cl.ListHeaderContainer}>
                        <div onClick={()=>navigate(-1)} className={cl.returnButtonContainer}>
                            <div className={cl.BtnContainer}>
                                 <span className={cl.returnArrowImgContainer}>
                                     <svg width={"16px"} height={"16px"} fill={"black"}>
                                        <use xlinkHref={"/sprite.svg#LongShevronIcon"}></use>
                                     </svg>
                                 </span>
                                <span className={cl.returnButton}>
                                    назад
                                 </span>
                            </div>
                            <h5>Список манги</h5>
                        </div>
                        <div className={cl.filterWatchStatusContainer}>
                            <div onClick={() => changeChooseFilter("All")} className={cl.btn_filterStatusContainer}>
                                <div style={choseType === "All" ? {color: "black"} : {}}
                                     className={cl.filterStatus}>Все
                                </div>
                                <span>252</span>
                            </div>
                            <div onClick={() => changeChooseFilter("Watching")}
                                 className={cl.btn_filterStatusContainer}>
                                <div style={choseType === "Watching" ? {color: "black"} : {}}
                                     className={cl.filterStatus}>Читаю
                                </div>
                                <span>252</span>
                            </div>
                            <div onClick={() => changeChooseFilter("Watched")} className={cl.btn_filterStatusContainer}>
                                <div style={choseType === "Watched" ? {color: "black"} : {}}
                                     className={cl.filterStatus}>Прочитано
                                </div>
                                <span>252</span>
                            </div>
                            <div onClick={() => changeChooseFilter("Later")} className={cl.btn_filterStatusContainer}>
                                <div style={choseType === "Later" ? {color: "black"} : {}}
                                     className={cl.filterStatus}>Отложено
                                </div>
                                <span>252</span>
                            </div>
                            <div onClick={() => changeChooseFilter("Throw")} className={cl.btn_filterStatusContainer}>
                                <div style={choseType === "Throw" ? {color: "black"} : {}}
                                     className={cl.filterStatus}>Брошено
                                </div>
                                <span>252</span>
                            </div>
                            <div onClick={() => changeChooseFilter("Planing")} className={cl.btn_filterStatusContainer}>
                                <div style={choseType === "Planing" ? {color: "black"} : {}}
                                     className={cl.filterStatus}>Запланировано
                                </div>
                                <span>252</span>
                            </div>
                        </div>
                    </div>

                    <table className={cl.TableOfAnime}>
                        <thead className={cl.HeaderOfTable}>
                        <tr>
                            <th>#</th>
                            <th></th>
                            <th>Название</th>
                            <th>В списке</th>
                            <th>Оценка</th>
                            <th>Главы</th>
                            <th>Тип</th>
                        </tr>
                        </thead>
                        <tbody className={cl.BodyOfTable}>
                        <tr style={{display: "flex"}}>
                            <th>1</th>
                            <td>
                                <img width="100%" height="100%" src={"https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg"} alt={""}/>
                            </td>
                            <td>
                                <div className={cl.TbodyNameOfAnime}>
                                    Абсалютный дуэт
                                </div>
                                <span>
                                    Absolute duo
                                </span>
                            </td>
                            <td>
                                <div className={cl.CircleStatus}></div>
                                <span className={cl.Animestatus}>Просмотрено</span>
                            </td>
                            <td>-</td>
                            <td>0</td>
                            <td>
                               Манга
                            </td>


                            <td className={cl.AdaptiveHorizontalInfo}>
                                <div className={cl.Horizontal_AnimeName}>
                                    <div className={cl.TbodyNameOfAnime}>
                                        Абсалютный дуэт
                                    </div>
                                    <span>
                                    Absolute duo
                                </span>
                                </div>
                                <div className={cl.AdaptiveHorizontalListStatus}>
                                    <span>В списке </span>
                                    <div className={cl.CircleStatus}></div>
                                </div>
                                <div className={cl.AdaptiveHorizontalAppraisal}>
                                    <span>Оценка</span>
                                    <span> -</span>
                                </div>
                                <div className={cl.AdaptiveHorizontalEpisodes}>
                                    <span>
                                        Эпизоды
                                    </span>
                                    <span>
                                        0
                                    </span>
                                </div>
                                <div className={cl.AdaptiveHorizontalType}>
                                    <span>
                                        Тип
                                    </span>
                                    <span>
                                        Манга
                                    </span>
                                </div>
                            </td>


                        </tr>
                        <tr style={{display: "flex"}}>
                            <th>1</th>
                            <td>
                                <img width="100%" height="100%"
                                     src={"https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg"}
                                     alt={""}/>
                            </td>
                            <td>
                                <div className={cl.TbodyNameOfAnime}>
                                    Абсалютный дуэт
                                </div>
                                <span>
                                    Absolute duo
                                </span>
                            </td>
                            <td>
                                <div className={cl.CircleStatus}></div>
                                <span className={cl.Animestatus}>Просмотрено</span>
                            </td>
                            <td>-</td>
                            <td>0</td>
                            <td>
                                Манга
                            </td>


                            <td className={cl.AdaptiveHorizontalInfo}>
                                <div className={cl.Horizontal_AnimeName}>
                                    <div className={cl.TbodyNameOfAnime}>
                                        Абсалютный дуэт
                                    </div>
                                    <span>
                                    Absolute duo
                                </span>
                                </div>
                                <div className={cl.AdaptiveHorizontalListStatus}>
                                    <span>В списке </span>
                                    <div className={cl.CircleStatus}></div>
                                </div>
                                <div className={cl.AdaptiveHorizontalAppraisal}>
                                    <span>Оценка</span>
                                    <span> -</span>
                                </div>
                                <div className={cl.AdaptiveHorizontalEpisodes}>
                                    <span>
                                        Эпизоды
                                    </span>
                                    <span>
                                        0
                                    </span>
                                </div>
                                <div className={cl.AdaptiveHorizontalType}>
                                    <span>
                                        Тип
                                    </span>
                                    <span>
                                        Манга
                                    </span>
                                </div>
                            </td>


                        </tr>
                        <tr style={{display: "flex"}}>
                            <th>1</th>
                            <td>
                                <img width="100%" height="100%"
                                     src={"https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg"}
                                     alt={""}/>
                            </td>
                            <td>
                                <div className={cl.TbodyNameOfAnime}>
                                    Абсалютный дуэт
                                </div>
                                <span>
                                    Absolute duo
                                </span>
                            </td>
                            <td>
                                <div className={cl.CircleStatus}></div>
                                <span className={cl.Animestatus}>Просмотрено</span>
                            </td>
                            <td>-</td>
                            <td>0</td>
                            <td>
                                Манга
                            </td>


                            <td className={cl.AdaptiveHorizontalInfo}>
                                <div className={cl.Horizontal_AnimeName}>
                                    <div className={cl.TbodyNameOfAnime}>
                                        Абсалютный дуэт
                                    </div>
                                    <span>
                                    Absolute duo
                                </span>
                                </div>
                                <div className={cl.AdaptiveHorizontalListStatus}>
                                    <span>В списке </span>
                                    <div className={cl.CircleStatus}></div>
                                </div>
                                <div className={cl.AdaptiveHorizontalAppraisal}>
                                    <span>Оценка</span>
                                    <span> -</span>
                                </div>
                                <div className={cl.AdaptiveHorizontalEpisodes}>
                                    <span>
                                        Эпизоды
                                    </span>
                                    <span>
                                        0
                                    </span>
                                </div>
                                <div className={cl.AdaptiveHorizontalType}>
                                    <span>
                                        Тип
                                    </span>
                                    <span>
                                        Манга
                                    </span>
                                </div>
                            </td>


                        </tr>
                        <tr style={{display: "flex"}}>
                            <th>1</th>
                            <td>
                                <img width="100%" height="100%"
                                     src={"https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg"}
                                     alt={""}/>
                            </td>
                            <td>
                                <div className={cl.TbodyNameOfAnime}>
                                    Абсалютный дуэт
                                </div>
                                <span>
                                    Absolute duo
                                </span>
                            </td>
                            <td>
                                <div className={cl.CircleStatus}></div>
                                <span className={cl.Animestatus}>Просмотрено</span>
                            </td>
                            <td>-</td>
                            <td>0</td>
                            <td>
                                Манга
                            </td>


                            <td className={cl.AdaptiveHorizontalInfo}>
                                <div className={cl.Horizontal_AnimeName}>
                                    <div className={cl.TbodyNameOfAnime}>
                                        Абсалютный дуэт
                                    </div>
                                    <span>
                                    Absolute duo
                                </span>
                                </div>
                                <div className={cl.AdaptiveHorizontalListStatus}>
                                    <span>В списке </span>
                                    <div className={cl.CircleStatus}></div>
                                </div>
                                <div className={cl.AdaptiveHorizontalAppraisal}>
                                    <span>Оценка</span>
                                    <span> -</span>
                                </div>
                                <div className={cl.AdaptiveHorizontalEpisodes}>
                                    <span>
                                        Эпизоды
                                    </span>
                                    <span>
                                        0
                                    </span>
                                </div>
                                <div className={cl.AdaptiveHorizontalType}>
                                    <span>
                                        Тип
                                    </span>
                                    <span>
                                        Манга
                                    </span>
                                </div>
                            </td>


                        </tr>
                        </tbody>
                    </table>

                </div>
                <SideNavigationProfile/>
            </div>
        </div>
    );
};

export default MangaListPage;