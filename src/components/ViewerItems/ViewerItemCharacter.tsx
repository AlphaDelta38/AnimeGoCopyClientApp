import React, {useState} from 'react';
import cl from '../modules/ViewerItemsModules/ViewerItemCharacter.module.css'




const ViewerItemCharacter = () => {

    const description = "Симпатичный старшеклассник, который входит в 20% лучших учеников школы. Известен своим наисерьёзнейшим отношением к любви, а также поисками той самой, что предназначена ему судьбой. Не особо умеет заботиться о себе, но замечает всё в любимой и сделает ради неё что угодно. Влюбляется в Хотару Хинасэ, но получает мгновенный отказ. Тем не менее, он не хочет оставлять её в покое, стараясь узнать её получше, а также дать ей получше узнать его. Желает проводить с Хотару Хинасэ всё свободное время. Злится, когда кто-то мешает оставаться им наедине, и не проявляет желания сближаться с её окружением. Живёт один, потому что его родители-врачи постоянно путешествуют."


    const [activeBtn, setActiveBtn] = useState(false)

    function BtnClick(){
        if(activeBtn){
            setActiveBtn(false)
        }else{
            setActiveBtn(true)
        }
    }

    return (
        <div className={cl.container}>
            <div className={cl.row}>
                <div className={cl.header}>
                    <h5>
                        Волберг
                    </h5>
                    <span>
                        ХВАМЗ
                    </span>
                </div>
                <div className={cl.InfoContent}>
                    <div className={cl.ImgContainer}>
                        <img  width="100px" height="140px" src={"https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg"} alt={""}/>
                    </div>
                    <div className={cl.MainInfoWIthLinks}>
                        <div style={description.length > 2 ? {} : {display: "none"}} className={cl.description}>
                            <div style={activeBtn ? {maxHeight: "100%"} : {}} className={cl.description_textContainer}>
                                {description}
                            </div>
                            <div  style={description.length < 200 ? {display: "none"} : {}} className={cl.BtnMoreDescriptionContainer}>
                                <button  onClick={()=>BtnClick()}>{activeBtn ? "Скрыть" : "Подробнее"}
                                    <svg width={"12px"} height={"12px"} style={ activeBtn ? {transform:"rotate(-90deg)", marginLeft:"4px" } : {transform:"rotate(90deg)", marginLeft:"4px"}}  fill={"black"}>
                                        <use xlinkHref={"/sprite.svg#ShevronIcon"}></use>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className={cl.CharacterOfAnime}>
                            <div className={cl.nameInfo}>
                            Аниме
                            </div>
                            <div className={cl.TapeOfAnime}>
                                <div className={cl.SmallImgContainer}>
                                    <img width="100%" height="100%"
                                         src={"https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg"}
                                         alt={""}/>
                                </div>
                            </div>
                        </div>
                        <div className={cl.SeyuOfCharacter}>
                            <div className={cl.nameInfo}>
                                Сэйю
                            </div>
                            <div className={cl.SmallImgContainer}>
                                <img width="100%" height="100%"
                                     src={"https://upload.wikimedia.org/wikipedia/ru/0/08/Mushoku_Tensei.jpg"}
                                     alt={""}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewerItemCharacter;