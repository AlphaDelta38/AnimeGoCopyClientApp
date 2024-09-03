import React, {useContext, useEffect, useRef, useState} from 'react';
import cl from '../modules/LoginRegistrationModules/LoginRegistration.module.css'
import {userDataAuthAndRegistation} from "../../types";
import {login} from "../../http/UserApi";
import {useTypedSelector} from "../../hooks/useTypeSelector";
import {useDispatch} from "react-redux";
import {Link, useLocation} from "react-router-dom";
import {routes} from "../../routes";
import {ToggleContext, ToggleContextProps} from "../../context/ToggleProvider";


const LoginRegistrationPage = () => {

    const {MobileNavBarActive, setMobileNavBarActive}:ToggleContextProps = useContext(ToggleContext)!

    const [userData, setUserData] = useState<userDataAuthAndRegistation>({email:"", password:""})
    const [matchPassword, setMatchPassword] = useState<boolean | null>(null)
    const [showPasswrod, setShowPasswrod] = useState<boolean>(false)
    const [errorsMassive, setErrorsMassive] = useState<string[]>([])

    const checkPasswordFiledRef = useRef<HTMLInputElement | null>(null)
    const errorMassiveRef = useRef<string[] >([])

    const data = useTypedSelector(state => state.user)
    const dispatch = useDispatch()
    const location = useLocation()


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
        setErrorsMassive(massive)
    }


    async function loginOrRegistrationPage(){
        if(location.pathname === routes.login){

        }else if(location.pathname === routes.registration){

        }
    }

    useEffect(()=>{
        // dispatch(SetUserActionCreator({email:"xui", login:"xui2", isLogin:true, aboutData:{name:"da"}}))
    }, [])


    useEffect(()=>{
        if(location.pathname === routes.registration){
            checkMatchPassword(checkPasswordFiledRef.current?.value!)
        }
        controlDataUser()
    },[userData, matchPassword])

    useEffect(()=>{

        errorMassiveRef.current = errorsMassive
    },[errorsMassive])

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
                                <button className={cl.customBtn}>Войти</button>
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
                                <button className={cl.customBtn}>Зарегистрироваться</button>
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