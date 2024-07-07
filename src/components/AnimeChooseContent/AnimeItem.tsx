import React from 'react';
import cl from '../modules/AnimeChooseContentModules/AnimeItem.module.css'
import TypeInfoAnime from "./TypeInfoAnime";



interface AnimeItemInterface {
    name: string
    secondName: string
    SetkaGridActive:string
}





const AnimeItem = ({name, secondName, SetkaGridActive}: AnimeItemInterface) => {



    return (
        <div  style={SetkaGridActive === '3x3' ? {flex: "25%"} : SetkaGridActive === '2x2'  ? {flex: "50%"} :  {flex: "100%"}  } className={ SetkaGridActive === '3x3' ? cl.container3x3 : SetkaGridActive === '2x2'  ? cl.container2x2 :  cl.container }>
            <div className={SetkaGridActive === "2x3" ? cl.content : SetkaGridActive === "2x2" ? cl.content : cl.content3x3 }>
                <div className={SetkaGridActive === "2x3" ? cl.imageContainer : SetkaGridActive === "2x2" ? cl.imageContainer2x2 : cl.imageContainer3x3 }>
                    <div  className={cl.Image}>
                    </div>
                </div>
                <div className={cl.InfoContent}>
                    <div style={SetkaGridActive === "3x3" ? {order: 2} : {}} className={cl.Name}>
                        {name}
                    </div>
                    <div style={SetkaGridActive === "3x3" ? {order: 1, marginTop: "10px"} : {}} className={cl.SecondName}>
                        {secondName}
                    </div>
                    <TypeInfoAnime SetkaGridActive={SetkaGridActive} type={"Тв сериал"} year={"2024"} ganres={["Романтика","Комедия","Сенён", "Эстетика"]}/>
                    <div style={SetkaGridActive === "3x3" || SetkaGridActive === "2x2" ? {display: "none"} : {marginTop: "10px", overflow: "hidden", maxHeight: "96px", textOverflow: "ellipsis", }}>
                         редстоит участие в конкурсе малых ансамблей «Анкон». Участвовать в конкурсе могут ансамбли от пяти до восьми человек. Однако оркест
                        редстоит участие в конкурсе малых ансамблей «Анкон». Участвовать в конкурсе могут ансамбли от пяти до восьми человек. Однако оркест

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimeItem;