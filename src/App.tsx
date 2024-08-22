import React, {useState} from 'react';
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



function App() {

    const [FilterBarActive, setFilterBarActive] = useState(false);




  return (
      <BrowserRouter>
          <Header setFilterBarActive={setFilterBarActive}  FilterBarActive={FilterBarActive} ></Header>
          <Routes>
              <Route path={routes.HomePage} element={<GeneralPage setFilterBarActive={setFilterBarActive} />} />
              <Route path={routes.AnimeList} element={<AnimeContent SearchButtonAvaible={false}  setFilterBarActive={setFilterBarActive} header={"Список Аниме"} />} />
              <Route path={routes.MangaList} element={<AnimeContent SearchButtonAvaible={false}  setFilterBarActive={setFilterBarActive} header={"Список Манги"} />} />
              <Route path={routes.Characters} element={<CharactersList/>} />
              <Route path={routes.Profile} element={<ProfilePage/>} />
              <Route path={routes.Friends} element={<FriendsPage/>} />
              <Route path={routes.OwnAnimeList} element={<AnimeListPage/>} />
              <Route path={routes.OwnMangaList} element={<MangaListPage/>} />
              <Route path={routes.MyProfileSettings} element={<SettingsPage/>} />
              <Route path={routes.Notification} element={<MobileMessagePage/>} />
              <Route path={routes.FriendRequests} element={<MobileFriendsRequestMesseages/>} />
              <Route path={routes.Anime} element={<AnimePage/>} />
              <Route path={"/*"} element={<GeneralPage setFilterBarActive={setFilterBarActive} />} />
              <Route path={routes.ReviewPage} element={<ReviewPage/>}/>
          </Routes>
          <Footer/>
      </BrowserRouter>
  );
}

export default App;
