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
import {
    SetUserActionCreator,
    SetUserBackGroundImageCreator,
    SetUserProfilePhotoCreator
} from "./Store/action-creator/userActionCreator";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "./hooks/useTypeSelector";
import UserProfileShowPage from "./components/ProfilePage/UserProfileShowPage";
import {getAllMyFriedns} from "./http/FriendsApi";
import {setFriendsDataActionCreator} from "./Store/action-creator/friendsActionCreator";



function App() {

    const [FilterBarActive, setFilterBarActive] = useState(false);
    const data = useTypedSelector(state=>state.user)
    const data2 = useTypedSelector(state=>state.friends)
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
        {route: routes.UserPfofilePage, element: <UserProfileShowPage/>},
        {route: routes.UserFriends, element: <FriendsPage/>},
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
        {route: routes.UserPfofilePage, element: <UserProfileShowPage/>},
        {route: routes.UserFriends, element: <FriendsPage/>},
        {route: "/*", element:  <Route path={"/*"} element={<GeneralPage  />} />},
    ]

    console.log(data)
    async function checkLogin(){
        try {
            const data = await check()
            console.log(data)
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
                if(data.profilePhoto){
                    dispatch(SetUserProfilePhotoCreator(data.profilePhoto));
                }
                if(data.backGroundUrl){
                    dispatch(SetUserBackGroundImageCreator(data.backGroundUrl));
                }
            }
        }catch (err){

        }
    }



    async function initialFriends(){
        try {
            if(data.id){
                const allFriendsShips = await getAllMyFriedns(data.id);
                const friends = allFriendsShips?.filter((value)=>value.status === "friends");
                const friendsRequest = allFriendsShips?.filter((value)=>value.status === "pending")
                if(friends  && friendsRequest){
                    dispatch(setFriendsDataActionCreator({friends: friends, friendsRequest: friendsRequest}))
                }else if(friends  && !friendsRequest){
                    dispatch(setFriendsDataActionCreator({friends: friends, friendsRequest: []}))
                }else if(!friends  && friendsRequest){
                    dispatch(setFriendsDataActionCreator({friends: [], friendsRequest: friendsRequest}))
                }else{
                    dispatch(setFriendsDataActionCreator({friends: [], friendsRequest: []}))
                }
                console.log(friends)
            }
        }catch (e){

        }
    }

    useEffect(()=>{
        checkLogin()
    }, [])

    useEffect(() => {
        initialFriends()
    }, [data.id]);

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
