import React, {useContext, useEffect, useState} from 'react';
import cl from "../modules/ProfilePageModules/UserProfileShowPage.module.css"
import SideNavigationProfile from "./SideNavigationProfile";
import {ToggleContext, ToggleContextProps} from "../../context/ToggleProvider";
import {useTypedSelector} from "../../hooks/useTypeSelector";
import {Months} from "../../util/CurrentDate";
import {useLocation, useNavigate} from "react-router-dom";
import {getOneUser} from "../../http/UserApi";
import {DateObject, getAllFriensRequest, getOneUserInterFace} from "../../types";
import {AxiosResponse} from "axios";
import {addFriend, deleteOrCancelRequest, getAllMyFriedns} from "../../http/FriendsApi";



const UserProfileShowPage = () => {

    const [btnMoreInfoActive, setBtnMoreInfoActive] = useState(false);
    const {MobileNavBarActive, setMobileNavBarActive}:ToggleContextProps = useContext(ToggleContext)!
    const [aboutInfoMassive, setAboutInfoMassive] = useState<any[]>([])
    const [userInfoObject, setUserInfoObject] = useState<getOneUserInterFace>({name:"", createdAt:""})
    const [onSiteFromdate, setOnSiteFromdate] = useState<DateObject>({day: 0, month:0, year:0})
    const [stageOfFrindsWay, setStageOfFrindsWay] = useState<string>("")
    const [activeDropDownMenu, setactiveDropDownMenu] = useState<boolean>(false)


    const location = useLocation();
    const navigate = useNavigate();

    const data = useTypedSelector(state => state.user)



    function changeBtnActive(){
        if(btnMoreInfoActive){
            setBtnMoreInfoActive(false)
        }else{
            setBtnMoreInfoActive(true)
        }
    }





    async function getInfoOfuser(){
        const dated: getOneUserInterFace| undefined = await getOneUser(Number(location.pathname.split("/")[2]))

        if(dated){
            setUserInfoObject(
                {
                    name: dated.name,
                    createdAt: dated.createdAt,
                    backGroundPhoto: dated.backGroundPhoto,
                    profilePhoto: dated.profilePhoto
                }
            )

            let tempMassive = Object.entries(
                {
                    name: dated.fullname?.split(" ")[0],
                    famalyName: dated.fullname?.split(" ")[1],
                    birthday: dated.birthDayDate,
                    country: dated.country,
                    city: dated.city,
                    gender: dated.gender,
                    aboutUser: dated.aboutUser,
                    lifeStatus: dated.lifeStatus,
                })
            setAboutInfoMassive(tempMassive.filter((value)=>value[1] !== undefined && value[1] !== null && value[1] !=="" && value[1] !== " " && value[0] !=="fullname"))

            let onSiteFromdate = new Date(dated.createdAt)

            const year = onSiteFromdate!.getUTCFullYear();
            const month = onSiteFromdate!.getUTCMonth() + 1;
            const day = onSiteFromdate!.getUTCDate();
            setOnSiteFromdate({year: year, month: month, day: day})
        }else{
            navigate("/")
        }
    }

    useEffect(() => {
        getInfoOfuser()

    }, [location]);


    useEffect(() => {
        if(Number(location.pathname.split("/")[2]) === data.id){
            navigate("/profile")

        }
        if(data.id){
            getAndSetFriendShip(data.id, "checkStage")

        }
    }, [data.id, location.pathname]);

      async  function getAndSetFriendShip(id: number,actions: string, status?: string, ){
        if(id){
            let friends: getAllFriensRequest[] | undefined;
            if(!status){
                friends = await getAllMyFriedns(id)
            }else{
                friends = await getAllMyFriedns(id, status)
            }

            if(actions === "checkStage"){
                const check = friends?.some((value)=>{
                    if(value.userId === Number(location.pathname.split("/")[2])){
                        setStageOfFrindsWay(value.status);
                        return true;
                    }else{
                        return false;
                    }
                })
                if(!check){
                    setStageOfFrindsWay("noFriend");
                }
            }
            if(actions === "returnFriends"){
                return friends;
            }
        }
    }



    function convertorToRussianText(text: string, additional?:string):string{

        if(text === "name"){
            return "Имя"
        }else if(text === "famalyName") {
            return "Фамилия"
        }else if(text === "gender"){
            return "Пол"
        }else if(text === "country"){
            return "Страна"
        }else if(text === "city"){
            return "Город"
        }else if(text === "birthday"){
            return "День рождение"
        }else if(text === "lifeStatus"){
            return "Статус"
        }else if(text === "aboutUser"){
            return "О себе"
        }

        return ""
    }



    function activeControllerDropDownMenu(){
        if(activeDropDownMenu){
            setactiveDropDownMenu(false)
        }else{
            setactiveDropDownMenu(true)
        }
    }


     async function friendStateControll(type: string){
        if(type === "add"){
            const response = await addFriend(data.id, Number(location.pathname.split("/")[2]))
            setStageOfFrindsWay(response);
        }else if(type === "del"){
            const response = await deleteOrCancelRequest(data.id, Number(location.pathname.split("/")[2]));
            setStageOfFrindsWay(response);
        }
    }

    useEffect(() => {
        console.log(stageOfFrindsWay)
    }, [stageOfFrindsWay]);

    return (
        <div style={ MobileNavBarActive ?  {transform:"translate3d(var(--translate-value), 0, 0)"} : {}} className={cl.container}>
            <div className={cl.row}>
                <div className={cl.MainContentContainer}>
                    <div className={cl.MainContent}>
                        <div style={userInfoObject.backGroundPhoto ? {backgroundImage:`url(${process.env.REACT_APP_API_URL}${userInfoObject.backGroundPhoto})`} : {}} className={cl.BackgroundImage}>
                            <div  className={cl.ProfileImgAndBtnContainer}>
                                <div className={cl.ProfileImg}>
                                    <img width={"100%"} height={"100%"}
                                         src={userInfoObject.profilePhoto ? `${process.env.REACT_APP_API_URL}${userInfoObject.profilePhoto}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQzLhg0HDlP9pTv_UW4xk1SftSxAvz8wRSxA&s"}
                                         alt={""}/>
                                </div>
                                <div className={cl.changeBtns}>
                                    {stageOfFrindsWay === "noFriend" &&
                                        <>
                                            <label onClick={()=>friendStateControll("add")} className={cl.LabelBtn}>
                                                <span>
                                                    <svg width={"16px"} height={"16px"}>
                                                        <use xlinkHref={"/sprite.svg#CameraIcon"}></use>
                                                    </svg>
                                                </span>
                                                    Добавить в друзья
                                            </label>
                                        </>
                                    }
                                    {stageOfFrindsWay === "friends" &&
                                        <>
                                            <label onClick={()=>activeControllerDropDownMenu()} className={cl.LabelBtn}>
                                                <span>
                                                    <svg width={"16px"} height={"16px"}>
                                                        <use xlinkHref={"/sprite.svg#CameraIcon"}></use>
                                                    </svg>
                                                </span>
                                                Вы друзья
                                                <div style={activeDropDownMenu ? {display: "flex"}  : {display: "none"}} className={cl.dropDownMenuContainer}>
                                                    <span onClick={()=>friendStateControll("del")}>Убрать из друзей</span>
                                                </div>
                                            </label>
                                        </>
                                    }
                                    {stageOfFrindsWay === "sent" &&
                                        <>
                                            <label onClick={()=>activeControllerDropDownMenu()} className={cl.LabelBtn}>
                                                <span>
                                                    <svg width={"16px"} height={"16px"}>
                                                        <use xlinkHref={"/sprite.svg#CameraIcon"}></use>
                                                    </svg>
                                                </span>
                                                Отменить запрос в друзья
                                                <div   style={activeDropDownMenu ? {display: "flex"} : {display: "none"}} className={cl.dropDownMenuContainer}>
                                                    <span onClick={()=>friendStateControll("del")} >Отменить запрос</span>
                                                </div>
                                            </label>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={cl.UserInfo}>
                            <div className={cl.HeaderInfo}>
                                {stageOfFrindsWay === "noFriend" &&
                                    <>
                                        <label className={cl.LabelBtnSub}>
                                            <span>
                                                <svg width={"16px"} height={"16px"}>
                                                    <use xlinkHref={"/sprite.svg#CameraIcon"}></use>
                                                </svg>
                                            </span>
                                            Добавить в друзья
                                        </label>
                                    </>
                                }
                                {stageOfFrindsWay === "friends" &&
                                    <>
                                        <label onClick={()=>activeControllerDropDownMenu()} className={cl.LabelBtnSub}>
                                            <span>
                                                <svg width={"16px"} height={"16px"}>
                                                    <use xlinkHref={"/sprite.svg#CameraIcon"}></use>
                                                </svg>
                                            </span>
                                            Вы друзья
                                            <div style={activeDropDownMenu ? {display: "flex"} : {display: "none"}}
                                                 className={cl.dropDownMenuContainer}>
                                                <span onClick={() => friendStateControll("del")}>Убрать из друзей</span>
                                            </div>
                                        </label>
                                    </>
                                }
                                {stageOfFrindsWay === "sent" &&
                                    <>
                                        <label className={cl.LabelBtnSub}>
                                            <span>
                                                <svg width={"16px"} height={"16px"}>
                                                    <use xlinkHref={"/sprite.svg#CameraIcon"}></use>
                                                </svg>
                                            </span>
                                            Отменить запрос в друзья
                                            <div style={activeDropDownMenu ? {display: "flex"} : {display: "none"}}
                                                 className={cl.dropDownMenuContainer}>
                                                <span onClick={() => friendStateControll("del")}>Отменить запрос</span>
                                            </div>
                                        </label>
                                    </>
                                }
                                <h2>
                                    {userInfoObject.name}
                                </h2>
                                <span>
                                    на сайте с {`${onSiteFromdate.day} ${Months[onSiteFromdate.month]} ${onSiteFromdate.year} года`}
                                </span>
                            </div>
                            <div className={cl.MainInfo}>
                                <dl style={btnMoreInfoActive ? {maxHeight: "100%"} : {}}>
                                    {aboutInfoMassive.map((value, index) =>
                                        <>
                                            <dt key={index}>{`${convertorToRussianText(value[0], value[1])}`}:</dt>
                                            <dd>{`${value[1]}`}</dd>
                                        </>
                                    )}

                                </dl>
                                <div style={aboutInfoMassive.length >= 1 ? {} : {display:"none"}} onClick={() => changeBtnActive()} className={cl.BtnOpenMoreInfo}>
                                    <button>{btnMoreInfoActive ? "Скрыть подробную информацию" : "Показать полную информацию"}</button>
                                </div>
                            </div>
                            <div className={cl.StatisticOfAnime}>
                                <div className={cl.StatisticHeader}>
                                    <h5> Статистика</h5>
                                </div>
                                <div className={cl.UnderHeaderTitle}>
                                    <h5>
                                        Аниме
                                    </h5>
                                    <div className={cl.TimeManageContainer}>
                                        <span>
                                            Время за просмотром:
                                        </span>
                                        <span>
                                            Средний балл:
                                        </span>
                                    </div>
                                </div>
                                <div className={cl.ProgressiveBar}>
                                    <div style={{width:"100%"}} className={cl.Watch}></div>
                                    <div className={cl.Watched}></div>
                                    <div className={cl.ForLater}></div>
                                    <div className={cl.ThrowDown}></div>
                                    <div className={cl.Planing}></div>
                                </div>
                                <div className={cl.WatchStatistics}>
                                    <dl className={cl.StatisticsTable}>
                                        <dt>Смотрю</dt>
                                        <dd>61</dd>
                                        <dt>Просмотрено</dt>
                                        <dd>10</dd>
                                        <dt>Отложено</dt>
                                        <dd>5</dd>
                                        <dt>Брошено</dt>
                                        <dd>6</dd>
                                        <dt>Запланировано</dt>
                                        <dd>7</dd>
                                    </dl>
                                    <dl className={cl.StatisticsTable}>
                                        <dt>Всего в списках</dt>
                                        <dd>252</dd>
                                        <dt>Эпизодов</dt>
                                        <dd>3462</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <SideNavigationProfile/>
            </div>
        </div>
    );
};

export default UserProfileShowPage;