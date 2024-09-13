import React, {useContext, useEffect, useRef, useState} from 'react';
import cl from '../modules/LoginRegistrationModules/LoginRegistration.module.css'
import {userDataAuthAndRegistation} from "../../types";
import {login, registration} from "../../http/UserApi";
import {useTypedSelector} from "../../hooks/useTypeSelector";
import {useDispatch} from "react-redux";
import {Link, useLocation} from "react-router-dom";
import {routes} from "../../routes";
import {ToggleContext, ToggleContextProps} from "../../context/ToggleProvider";
import {AxiosResponse} from "axios";
import {JwtPayload} from "jwt-decode";
import {SetUserActionCreator} from "../../Store/action-creator/userActionCreator";



const LoginRegistrationPage = () => {

    const {MobileNavBarActive, setMobileNavBarActive}:ToggleContextProps = useContext(ToggleContext)!

    const [userData, setUserData] = useState<userDataAuthAndRegistation>({id: 0, email:"", name:"", password:"", createAt: ""})
    const [matchPassword, setMatchPassword] = useState<boolean | null>(null)
    const [showPasswrod, setShowPasswrod] = useState<boolean>(false)
    const [errorsMassive, setErrorsMassive] = useState<string[]>([])

    const checkPasswordFiledRef = useRef<HTMLInputElement | null>(null)
    const errorMassiveRef = useRef<string[] >([])

    const data = useTypedSelector(state => state.user)
    const dispatch = useDispatch()
    const location = useLocation()

    console.log(data)
    function checkMatchPassword(password:string){

        if(password.length  >0 && userData.password.length > 0 ){
            if(password === userData.password){
                setMatchPassword(true)
                let massive = [...errorMassiveRef.current];
                errorMassiveRef.current= massive.filter((value)=>value !== "Пароли должны совпадать")
            }else{
                setMatchPassword(false)
                if(!errorMassiveRef.current.includes("Пароли должны совпадать")){
                    let massive = [...errorMassiveRef.current];
                    massive.push("Пароли должны совпадать")
                    errorMassiveRef.current = massive
                }
            }
        }else{
            setMatchPassword(null)
            let massive = [...errorMassiveRef.current];
            setErrorsMassive(  massive.filter((value)=>value !== "Пароли должны совпадать"))
        }
    }




    function controlDataUser(){
        let massive:any[]= [...errorMassiveRef.current];

        if((userData.password.length < 15 && userData.password.length > 4) || userData.password.length === 0 ){
            massive = massive.filter((value)=>value !== "Длинна пароля должна быть больше 5 меньше 16 символов")
        }else{
            if(!errorMassiveRef.current.includes("Длинна пароля должна быть больше 5 меньше 16 символов") && userData.password.length !== 0 ){
                massive.push( "Длинна пароля должна быть больше 5 меньше 16 символов")
            }
        }
        if((userData.email.length > 0 && userData.email.length < 40 && userData.email.includes("@gmail.com")) || userData.email.length === 0){
            massive = massive.filter((value)=>value !== "Почта должна содержать @gmail.com")
        }else{
            if(!errorMassiveRef.current.includes("Почта должна содержать @gmail.com") && userData.email.length !== 0 ){
                massive.push( "Почта должна содержать @gmail.com")
            }
        }
        if((userData.name.length > 0 && userData.name.length < 16) || userData.name.length === 0){
            massive = massive.filter((value)=>value !== "Login должен быть больше 5 и меньше 16 символов")
        }else{
            if(!errorMassiveRef.current.includes("Login должен быть больше 5 и меньше 16 символов") && userData.name.length !== 0 ){
                massive.push( "Login должен быть больше 5 и меньше 16 символов")
            }
        }
        setErrorsMassive(massive)

    }


    async function loginOrRegistrationPage(){
        if(location.pathname === routes.login){
           if(errorsMassive.length  === 0){
               const data=  await login(userData.email, userData.password);
               if(data){
                   dispatch(SetUserActionCreator(
                       {
                           id: data.id,
                           email:data?.email,
                           login: data.name,
                           isLogin:true,
                           aboutData:{aboutUser: data.aboutUser, city:data.city, gender: data.gender, birthday: data.birthDayDate, country:data.country, fullname: data.fullname, lifeStatus: data.lifeStatus},
                           accessRule: {whoCanCommentMyProfile: data.whoCanCommentMyProfile, whoCanSentFriendRequest: data.whoCanSentFriendRequest, whoCanViewMyList: data.whoCanViewMyList},
                           createAt: data.createAt,
                       }))
               }
           }
        }else if(location.pathname === routes.registration){
           if(errorsMassive.length  === 0 && matchPassword){
              const data= await registration({email: userData.email, password: userData.password, login: userData.name});

               if(data){
                   dispatch(SetUserActionCreator({
                       id: data.id,
                       email:data?.email,
                       login: data.name,
                       isLogin:true,
                       aboutData:{aboutUser: data.aboutUser, city:data.city, gender: data.gender, birthday: data.birthDayDate, country:data.country, fullname: data.fullname, lifeStatus: data.lifeStatus},
                       accessRule: {whoCanCommentMyProfile: data.whoCanCommentMyProfile, whoCanSentFriendRequest: data.whoCanSentFriendRequest, whoCanViewMyList: data.whoCanViewMyList},
                       createAt: data.createAt,
                   }))
               }
           }
        }
    }

    useEffect(()=>{
        if(location.pathname === routes.registration){
            checkMatchPassword(checkPasswordFiledRef.current?.value!)
        }
        controlDataUser()
    },[userData, matchPassword])

    useEffect(()=>{
        errorMassiveRef.current = errorsMassive;
    },[errorsMassive])

    useEffect(() => {
        setMatchPassword(null)
        if(errorsMassive.includes("Пароли должны совпадать")){
            let massive = [...errorMassiveRef.current];
            errorMassiveRef.current= massive.filter((value)=>value !== "Пароли должны совпадать")
        }
        if(errorsMassive.includes("Login должен быть больше 5 и меньше 16 символов")){
            let massive = [...errorMassiveRef.current];
            setErrorsMassive(massive.filter((value)=>value !== "Login должен быть больше 5 и меньше 16 символов"))
            setUserData({...userData, name: ""})
        }
    }, [location.pathname]);





    return (
        <div style={ MobileNavBarActive ?  {transform:"translate3d(var(--translate-value), 0, 0)"} : {}} className={cl.container}>
            <div className={cl.row}>
                <div className={cl.formContainer}>
                    {location.pathname === routes.login &&
                        <div className={cl.loginContainer}>
                            <h2>Авторизация</h2>
                            <label className={cl.customLabel}>Адрес электронной почты</label>
                            <input value={userData.email} onChange={(e)=>setUserData({...userData, email:e.target.value})}  placeholder={"email"} className={cl.customInput}/>
                            <label style={{marginTop:"1rem"}} className={cl.customLabel}>Пароль</label>
                            <div className={cl.passwordContainer}>
                                <input value={userData.password} onChange={(e)=> setUserData({...userData, password:e.target.value}) }
                                       type={showPasswrod ? "text" : "password"} placeholder={"password"} className={cl.customInput}
                                />
                                <span onClick={()=>showPasswrod ? setShowPasswrod(false) : setShowPasswrod(true)} className={cl.hidePasswordBtn}>
                                    <svg width={showPasswrod ? "20px" : "24px"} height={showPasswrod ? "20px" : "24px"}>
                                        <use xlinkHref={ showPasswrod ? "/sprite.svg#EyeCrossedIcon" : "/sprite.svg#EyeIcon"}></use>
                                    </svg>
                                </span>
                            </div>
                            <div className={cl.ErrorsField}>
                                {
                                    errorsMassive.map((value, index,) =>
                                        <span key={index}>{value}</span>
                                    )
                                }
                            </div>
                            <div className={cl.btnContainer}>
                                <button onClick={()=>loginOrRegistrationPage()} className={cl.customBtn}>Войти</button>
                                <Link to={routes.registration}>
                                    <button className={cl.otherBtn}>Регистрация</button>
                                </Link>
                            </div>
                        </div>
                    }
                    {location.pathname === routes.registration &&
                        <div className={cl.loginContainer}>
                            <h2>Регистрация</h2>
                            <label className={cl.customLabel}>Адрес электронной почты</label>
                            <input value={userData.email}
                                   onChange={(e) => setUserData({...userData, email: e.target.value})}
                                   placeholder={"email"} className={cl.customInput}/>

                            <label style={{marginTop:"16px"}} className={cl.customLabel}>Логин</label>
                            <input value={userData.name}
                                   onChange={(e) => setUserData({...userData, name: e.target.value})}
                                   placeholder={"login"} className={cl.customInput}/>

                            <label style={{marginTop: "1rem"}} className={cl.customLabel}>Пароль</label>
                            <div className={cl.passwordContainer}>
                                <input value={userData.password}
                                       onChange={(e) => setUserData({...userData, password: e.target.value})}
                                       type={showPasswrod ? "text" : "password"} placeholder={"password"}
                                       className={cl.customInput}/>
                                <span onClick={() => showPasswrod ? setShowPasswrod(false) : setShowPasswrod(true)}
                                      className={cl.hidePasswordBtn}>
                                    <svg width={showPasswrod ? "20px" : "24px"} height={showPasswrod ? "20px" : "24px"}>
                                        <use
                                            xlinkHref={showPasswrod ? "/sprite.svg#EyeCrossedIcon" : "/sprite.svg#EyeIcon"}></use>
                                    </svg>
                                </span>
                            </div>
                            <label className={cl.customLabel}>Подтвердите пароль</label>
                            <div className={cl.passwordContainer}>
                                <input ref={checkPasswordFiledRef} onChange={(e) => checkMatchPassword(e.target.value)}
                                       style={{marginBottom: "1rem"}} type={showPasswrod ? "text" : "password"}
                                       placeholder={"the same password"} className={cl.customInput}/>
                                <span style={matchPassword === null ? {display: "none"} : {}}
                                      className={cl.hidePasswordBtn}>
                                    {matchPassword ?
                                        <svg width={"18px"} height={"18px"} fill={"green"} style={{marginTop: "2px"}}>
                                            <use
                                                xlinkHref={matchPassword ? "/sprite.svg#ReadyIcon" : "/sprite.svg#CloseBtnIcon"}></use>
                                        </svg>
                                        :
                                        <svg width={"18px"} height={"18px"} stroke={"#ff5c57"} strokeWidth={2}
                                             strokeMiterlimit={10} style={{marginTop: "2px"}}>
                                            <use
                                                xlinkHref={matchPassword ? "/sprite.svg#ReadyIcon" : "/sprite.svg#CloseBtnIcon"}></use>
                                        </svg>
                                    }
                                </span>
                            </div>
                            <div className={cl.ErrorsField}>
                                {
                                    errorsMassive.map((value, index,) =>
                                        <span key={index}>{value}</span>
                                    )
                                }
                            </div>
                            <div className={cl.btnContainer}>
                                <button onClick={() => loginOrRegistrationPage()}
                                        className={cl.customBtn}>Зарегистрироваться
                                </button>
                                <Link to={routes.login}>
                                    <button className={cl.otherBtn}>Авторизироваться</button>
                                </Link>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default LoginRegistrationPage;