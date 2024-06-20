import React, {useEffect, useState} from 'react';
import './App.css';
import Header from "./components/Header/Header";
import AnimeContent from "./components/AnimeChooseContent/AnimeContent";

function App() {

    const [MobileNavBarActive, setMobileNavBarActive] = useState(false);
    const [FilterBarActive, setFilterBarActive] = useState(false);



  return (
    <div className={ MobileNavBarActive ? "AppTranslate" : FilterBarActive ? "AppTranslate" : "App" }>
         <Header setFilterBarActive={setFilterBarActive}  FilterBarActive={FilterBarActive} MobileNavBarActive={MobileNavBarActive} setMobileBarActive = {setMobileNavBarActive}></Header>
         <AnimeContent setFilterBarActive={setFilterBarActive} header={"Список аниме"}/>
    </div>
  );
}

export default App;
