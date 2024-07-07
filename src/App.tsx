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



function App() {

    const [MobileNavBarActive, setMobileNavBarActive] = useState(false);
    const [FilterBarActive, setFilterBarActive] = useState(false);




  return (
      <BrowserRouter>
          <Header setFilterBarActive={setFilterBarActive}  FilterBarActive={FilterBarActive} MobileNavBarActive={MobileNavBarActive} setMobileBarActive = {setMobileNavBarActive}></Header>
          <Routes>
              <Route path={routes.HomePage} element={<GeneralPage setFilterBarActive={setFilterBarActive} />} />
              <Route path={routes.AnimeList} element={<AnimeContent SearchButtonAvaible={false}  setFilterBarActive={setFilterBarActive} header={"Список Аниме"} />} />
              <Route path={routes.MangaList} element={<AnimeContent SearchButtonAvaible={false}  setFilterBarActive={setFilterBarActive} header={"Список Манги"} />} />
              <Route path={routes.Characters} element={<CharactersList/>} />
              <Route path={routes.Profile} element={<ProfilePage/>} />
              <Route path={routes.Friends} element={<FriendsPage/>} />
              <Route path={"/*"} element={<GeneralPage setFilterBarActive={setFilterBarActive} />} />
          </Routes>
          <Footer/>
      </BrowserRouter>
  );
}

export default App;
