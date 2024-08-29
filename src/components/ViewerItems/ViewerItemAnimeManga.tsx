import React, {ReactNode, useState} from 'react';
import cl from '../modules/ViewerItemsModules/ViewerItemAnimeManga.module.css'
import InfoToolTip from "../AdditionalComponents/InfoToolTip";
import RedirectionText from "../AnimePage/RedirectionText";
import TextWithAdditionalInfo from "../AdditionalComponents/TextWithAdditionalInfo";


interface ViewerItemAnimeManga{
    id?: number
    type:string
}

const ViewerItemAnimeManga = ({id,type}:ViewerItemAnimeManga) => {

    const [hidingBtnActive, setHidingBtnActive] = useState(false);

    function getAdditionalInfo(type:string): ReactNode{
        let textWillReturn:string = "";
        if(type === "Манга"){
            textWillReturn = "Японские комиксы, иногда называемые комикку."
        }else if(type === "Манхва"){
            textWillReturn = "Корейские комиксы. Термин означает и анимационные мультфильмы, карикатуру, а за пределами Кореи обычно употребляется для обозначения исключительно корейских манг."
        }else if(type === "Ранобэ"){
            textWillReturn = "Ранобе, ранобэ — разновидность популярной японской литературы различных жанров (от любовных романов и научной фантастики до ужасов), " +
                "отличающейся преимущественно фантазийным сюжетом, обилием диалогов, иллюстрациями в стиле аниме и манга, " +
                "и ориентированной в основном на подростковую и юношескую аудиторию."
        }

        return <InfoToolTip cssProperties={{marginLeft:"4px"}} message={textWillReturn}/>
    }


    return (
        <div className={cl.container}>
            <div className={cl.contentContainer}>
                <div className={cl.header}>
                    <h4 className={cl.mainName}>Башня бога 2</h4>
                    <ul className={cl.otherNames}>
                        <li>負けヒロインが多すぎる！</li>
                        <li>Too Many Losing Heroines!</li>
                    </ul>
                </div>
                <hr className={cl.hr}/>
                <div className={cl.descriptionContainer}>
                    <div style={hidingBtnActive ? {maxHeight:"100%"} : {}} className={cl.description}>
                        В мире появилась таинственная сила, известная как Шинсу. А ещё есть Башня — дом для людей,
                        которые пользуются преимуществами Шинсу и называют себя «избранными». Говорят,
                        достигший вершины Башни исполнит все свои желания. Чтобы добраться до верха, «Избранные»,
                        отобранные хранителем Башни, обязаны пройти испытания… И вместе с ними на Башню взбирается Баам —
                        главный герой и «Незаконный», который сам открыл себе двери. Он делает это с одной-единственной целью —
                        найти Рахиль, что была для него всем.
                    </div>
                    <button className={cl.hidingBtn} onClick={()=>hidingBtnActive ? setHidingBtnActive(false) : setHidingBtnActive(true)}>
                        {hidingBtnActive ?
                            "Скрыть"
                            :
                            "Читать дальше"
                        }
                        <svg className={hidingBtnActive ? cl.closedIcon : cl.openIcon}>
                            <use xlinkHref={"/sprite.svg#ShevronIcon"}></use>
                        </svg>
                    </button>
                </div>
                <div className={cl.infoAboutItem}>
                    <dl className={cl.tableWithInfo}>
                        <dt>Тип</dt>
                        <dd>
                            {type}
                            {type !== "ТВ Сериал"
                                &&
                                getAdditionalInfo(type!)
                            }
                        </dd>
                        <dt>Эпизоды</dt>
                        <dd>13</dd>
                        <dt>Статус</dt>
                        <dd><RedirectionText>Вышел</RedirectionText></dd>
                        <dt>Жанр</dt>
                        <dd>
                            <RedirectionText>Фентези,</RedirectionText>
                            <RedirectionText>Детектив,</RedirectionText>
                            <RedirectionText>Экшен,</RedirectionText>
                            <RedirectionText>Драма,</RedirectionText>
                        </dd>
                        <dt>Первоисточник</dt>
                        <dd>Веб-манга</dd>
                        <dt>Сезон</dt>
                        <dd><RedirectionText>Весна 2020</RedirectionText></dd>
                        <dt>Выпуск</dt>
                        <dd>с 2 апреля 2020 по 25 июня 2020</dd>
                        <dt>Студия</dt>
                        <dd><RedirectionText>Telecom Animation Film</RedirectionText></dd>
                        <dt>Рейтинг MPAA
                            <span className={cl.raitingMpaaSpanForHide}>
                                <InfoToolTip cssProperties={{marginLeft: "6px"}}
                                             message={"Принятая в США система оценки содержания фильма, введённая Американской киноассоциацией (MPAA). Для расшифровки значений иконки, наведите на нее курсор мыши."}/>
                            </span>
                        </dt>
                        <dd>
                            <TextWithAdditionalInfo mainstyles={{maxHeight: "28px",color:"black"}}
                                                    textAbove={"дети до 13 лет допускаются на фильм только с родителями"}
                                                    title={"PG-13"}/>
                        </dd>
                        <dt>Длительность</dt>
                        <dd>23 мин. ~ серия</dd>
                        <dt>Озвучка <InfoToolTip cssProperties={{marginLeft: "4px"}}
                                                 message={"Создаётся в основном любителями-фандабберами, зачастую при помощи лишь микрофона, компьютера и текста."}/>
                        </dt>
                        <dd>
                            <RedirectionText>Anilibria,</RedirectionText>
                            <RedirectionText>JAMClub,</RedirectionText>
                        </dd>
                        <dt style={{marginTop:"1rem"}}>Снят по манге</dt>
                        <dd style={{marginTop:"1rem"}}>DADADA</dd>
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default ViewerItemAnimeManga;