import React, {useContext} from 'react';
import cl from '../modules/CharactersListModules/CharacterPage.module.css'
import MiniWindowPage from "../AdditionalComponents/MiniWindowPage";
import PhotoAndVideowiever from "../AnimePage/PhotoAndVideowiever";
import InfoToolTip from "../AdditionalComponents/InfoToolTip";
import {calculateAge} from "../../util/CurrentDate";
import RedirectionText from "../AnimePage/RedirectionText";
import ViewerItemAnimeManga from "../ViewerItems/ViewerItemAnimeManga";
import {ToggleContext, ToggleContextProps} from "../../context/ToggleProvider";
import {isMobileDevice} from "../../util/IsMobileUse";


 interface  CharacterPageInterface{
     type: string
 }



const CharacterPage = ({type}: CharacterPageInterface) => {

    const {MobileNavBarActive, setMobileNavBarActive}:ToggleContextProps = useContext(ToggleContext)!

    return (
        <div style={ MobileNavBarActive ?  {transform:"translate3d(var(--translate-value), 0, 0)"} : {}} className={cl.container}>
            <div className={cl.row}>
                <div className={cl.contentContainer}>
                    <div className={cl.personContainer}>
                        <div className={cl.personRow}>
                            <div className={cl.imgContainer}>
                                <div className={cl.imgContainerForAdaptive}>
                                    <PhotoAndVideowiever basePhotoPage={0} imgUrl={["https://animego.org/media/cache/thumbs_180x252/upload/character/637733f6a44b2400345509.jpg"]} type={"img"}/>
                                </div>
                                <div style={isMobileDevice() ? {} : {display: "none"}} className={cl.names}>
                                    <h1>Двадцать пятый Баам</h1>
                                    <ul>
                                        <li>Twenty-Fifth Bam</li>
                                        <li>스물다섯번째 밤 / 夜</li>
                                    </ul>
                                </div>
                            </div>
                            <div className={cl.infoContainer}>
                                <div style={isMobileDevice() ? {display: "none"} : {}} className={cl.names}>
                                    <h1>Двадцать пятый Баам</h1>
                                    <ul>
                                        <li>Twenty-Fifth Bam</li>
                                        <li>스물다섯번째 밤 / 夜</li>
                                    </ul>
                                </div>
                                <hr/>
                                {
                                    type === "character" &&
                                    <div className={cl.descriptionContainer}>
                                        <h2>Описание</h2>
                                        <div className={cl.description}>
                                            Молодой парень с короткими каштановыми волосами и золотистыми глазами.
                                            Вежлив с каждым человеком, которого встречает, независимо от того, кто перед ним —
                                            лучший друг или заклятый враг. Хорошо готовит (его кулинарные навыки не раз хвалили товарищи по команде),
                                            имеет непреодолимое желание стать сильнее, чтобы защитить тех, кто ему дорог. Попадает в башню, следуя за своей подругой Рахиль,
                                            незаконно, то есть сам открывает врата башни. До того как к Бааму не пришла Рахиль, жил под землёй и ничего не знал о внешнем мире.
                                        </div>
                                    </div>
                                }
                                {
                                    type === "voicePerson" &&
                                        <dl className={cl.aboutPersonContainer}>
                                            <dt className={cl.personInfoItemDT}>Карьера</dt>
                                            <dd className={cl.personInfoItemDD}>
                                                Сейю
                                                <InfoToolTip cssProperties={{marginLeft: "4px"}} message={"Актёры-сэйю, озвучивавшие персонажей аниме."}/>
                                            </dd>
                                            <dt className={cl.personInfoItemDT}>Дата рождения</dt>
                                            <dd className={cl.personInfoItemDD}>22 октября 1990 {`(${calculateAge("22 октября 1990")})`}</dd>
                                        </dl>
                                }
                            </div>
                        </div>
                    </div>
                    <div className={cl.allActivitiesContainer}>
                        <div className={cl.allActivitiesContent}>
                            <h2>{type === "voicePerson" ? "Озвучка в аниме" : "Аниме"}</h2>
                            <div className={cl.projectItemsContainer}>
                                <div className={cl.itemContainer}>
                                    <div className={cl.itemImgContainer}>
                                        <img src={"https://animego.org/upload/anime/images/66781e6ed31d4804836571.jpg"} alt={""} width={"100%"} height={"100%"}/>
                                    </div>
                                    <div className={cl.infoAboutItemContainer}>
                                        <div style={type === "voicePerson" ? {display: "none"} : {}} className={cl.secondCharacterName}>
                                            Главный Герой
                                        </div>
                                        <h5>Башня Бога 2</h5>
                                        <div className={cl.secondName}>Kami no Tou: Ouji no Kikan</div>
                                        <div className={cl.heshtags}>
                                            <RedirectionText variant={"black"}>Детектив,</RedirectionText>
                                            <RedirectionText variant={"black"}>Драма,</RedirectionText>
                                            <RedirectionText variant={"black"}>Приключения,</RedirectionText>
                                            <RedirectionText variant={"black"}>Фэнтези</RedirectionText>
                                            <span style={{marginLeft: "8px", marginRight: "8px"}}>/</span>
                                            <RedirectionText variant={"black"}>2024</RedirectionText>
                                            <span style={{marginLeft: "8px", marginRight: "8px"}}>/</span>
                                            <RedirectionText variant={"black"}>ТВ Сериал</RedirectionText>
                                        </div>
                                        <span>{type === "voicePerson" ? "Персонаж" : "Сэйю"}</span>
                                        <div className={cl.characterContainer}>
                                            <div className={cl.charactersImgContainer}>
                                                <MiniWindowPage title={
                                                    <img src={"https://animego.org/upload/character/637733f6a44b2400345509.jpg"} width={"100%"} height={"100%"} alt={""}/>
                                                } basicState={"right"}><ViewerItemAnimeManga type={"ТВ Сериал"}/></MiniWindowPage>
                                            </div>
                                            <div className={cl.charactersInfoContainer}>
                                                <MiniWindowPage title={
                                                    <span className={cl.generalName}>Двадцать пятый Баам</span>
                                                } basicState={"right"}>noneItem</MiniWindowPage>
                                                <div style={type === "character" ? {display: "none"} : {}} className={cl.secondCharacterName}>
                                                    Главный Герой
                                                </div>
                                            </div>
                                        </div>
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

export default CharacterPage;