import React from 'react';
import cl from '../modules/AnimePageModules/AnimePage.module.css'






const AnimePage = () => {
    return (
        <div className={cl.container}>
            <div className={cl.row}>
                <div className={cl.contentContainer}>
                    <div className={cl.headerContainer}>
                        <div className={cl.mainInfo}>
                            <div className={cl.sideImageAndActions}>
                                <div className={cl.imageContainer}>
                                    <img width="100%" height="100%"
                                         src={"https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg"}
                                         alt={""}/>
                                </div>
                                <div className={cl.actionsContainer}>
                                    <button className={cl.watchOnlineBtn}>
                                        <span className={cl.watchOnlineBtn__icon}><div></div></span>
                                        Смотреть онлайн
                                    </button>
                                    <button className={cl.writeFeedbackBtn}>
                                        <img className={cl.penIcon} width="100%" height="100%" src={"/pen.png"} alt={""}/>
                                        Написать отзыв
                                    </button>
                                    <div className={cl.statusList}>
                                        <button className={cl.statusList__openerBtn}>
                                            Добавить в список
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>


                </div>
            </div>
        </div>
    );
};

export default AnimePage;