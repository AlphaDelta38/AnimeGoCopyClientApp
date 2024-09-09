import React, {useEffect, useState} from 'react';
import './App.css';
import {routes} from "./routes";
import Header from "./components/Header/Header";
import AnimeContent from "./components/AnimeChooseContent/AnimeContent";
import GeneralPage from "./components/GeneralPage/GeneralPage";
import CharactersList from "./components/CharactersList/CharactersList";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import Footer from "./components/AdditionalComponents/Footer";
import FriendsPage from "./components/ProfilePage/FriendsPage";
import AnimeListPage from "./components/ProfilePage/AnimeListPage";
import MangaListPage from "./components/ProfilePage/MangaListPage";
import SettingsPage from "./components/ProfilePage/SettingsPage";
import MobileMessagePage from "./components/MobileMassegePage/MobileMessagePage";
import FriendRequest from "./components/Header/FriendRequest";
import MobileFriendsRequestMesseages from "./components/MobileMassegePage/MobileFriendsRequestMesseages";
import AnimePage from "./components/AnimePage/AnimePage";
import ReviewPage from "./components/ReviewPage/ReviewPage";
import MangaPage from "./components/AnimePage/MangaPage";
import CharacterPage from "./components/CharactersList/CharacterPage";
import LoginRegistrationPage from "./components/Login-registrationPage/LoginRegistrationPage";
import {check} from "./http/UserApi";
import {SetUserActionCreator} from "./Store/action-creator/userActionCreator";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "./hooks/useTypeSelector";



function App() {

    const [FilterBarActive, setFilterBarActive] = useState(false);
    const data = useTypedSelector(state=>state.user)
    const dispatch = useDispatch();



    const NoneAuthRoutes = [
        {route: routes.HomePage, element: <GeneralPage/>},
        {route: routes.AnimeList, element: <AnimeContent SearchButtonAvaible={false}  header={"Список Аниме"} />},
        {route: routes.MangaList, element: <AnimeContent SearchButtonAvaible={false}  header={"Список Манги"} />},
        {route: routes.Characters, element:<CharactersList/>},
        {route: routes.Anime, element: <AnimePage/>},
        {route: routes.Manga, element: <MangaPage/>},
        {route: routes.CharactersPage, element: <CharacterPage type={"character"}/>},
        {route: routes.VoiceOverPage, element: <CharacterPage type={"voicePerson"}/>},
        {route: routes.login, element: <LoginRegistrationPage/>},
        {route: routes.registration, element: <LoginRegistrationPage/>},
        {route: "/*", element:  <Route path={"/*"} element={<GeneralPage  />} />},
    ]


    const AuthRoutes = [
        {route: routes.HomePage, element: <GeneralPage/>},
        {route: routes.AnimeList, element: <AnimeContent SearchButtonAvaible={false}  header={"Список Аниме"} />},
        {route: routes.MangaList, element: <AnimeContent SearchButtonAvaible={false}  header={"Список Манги"} />},
        {route: routes.Characters, element:<CharactersList/>},
        {route: routes.Anime, element: <AnimePage/>},
        {route: routes.Manga, element: <MangaPage/>},
        {route: routes.CharactersPage, element: <CharacterPage type={"character"}/>},
        {route: routes.VoiceOverPage, element: <CharacterPage type={"voicePerson"}/>},
        {route: routes.Profile, element: <ProfilePage/>},
        {route: routes.Friends, element: <FriendsPage/>},
        {route: routes.OwnAnimeList, element: <AnimeListPage/>},
        {route: routes.OwnMangaList, element: <MangaListPage/>},
        {route: routes.MyProfileSettings, element: <SettingsPage/>},
        {route: routes.Notification, element: <MobileMessagePage/>},
        {route: routes.FriendRequests, element: <MobileFriendsRequestMesseages/>},
        {route: routes.ReviewPage, element: <ReviewPage/>},
        {route: "/*", element:  <Route path={"/*"} element={<GeneralPage  />} />},
    ]


    async function checkLogin(){
        try {
            const data = await check()
            if(data){
                dispatch(SetUserActionCreator({email:data?.email, login: data.name, isLogin:true}))
            }
        }catch (err){

        }
    }
    useEffect(()=>{
        checkLogin()
    }, [])


  return (
      <BrowserRouter>
          <Header setFilterBarActive={setFilterBarActive}  FilterBarActive={FilterBarActive} ></Header>
          <Routes>
              <Route path={"/*"} element={<GeneralPage  />} />
              {
                data.isLogin &&
                    AuthRoutes.map((value,index)=><Route key={index} path={value.route} element={value.element}/>)
              }
              {
                  !data.isLogin &&
                  NoneAuthRoutes.map((value,index)=><Route key={index} path={value.route} element={value.element}/>)
              }
          </Routes>
          <Footer/>
      </BrowserRouter>
  );
}

export default App;
