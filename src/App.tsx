import React, {useEffect, useState} from 'react';
import './App.css';
import Header from "./components/Header/Header";
import AnimeContent from "./components/AnimeChooseContent/AnimeContent";
import GeneralPage from "./components/GeneralPage/GeneralPage";

function App() {

    const [MobileNavBarActive, setMobileNavBarActive] = useState(false);
    const [FilterBarActive, setFilterBarActive] = useState(false);



  return (
    <div className={ MobileNavBarActive ? "AppTranslate" : FilterBarActive ? "AppTranslate" : "App" }>
         <Header setFilterBarActive={setFilterBarActive}  FilterBarActive={FilterBarActive} MobileNavBarActive={MobileNavBarActive} setMobileBarActive = {setMobileNavBarActive}></Header>
         <GeneralPage setFilterBarActive={setFilterBarActive}/>
    </div>
  );
}

export default App;
