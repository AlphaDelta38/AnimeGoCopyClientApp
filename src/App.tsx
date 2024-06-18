import React, { useState} from 'react';
import './App.css';
import Header from "./components/Header/Header";
import AnimeContent from "./components/AnimeChooseContent/AnimeContent";

function App() {

    const [MobileNavBarActive, setMobileNavBarActive] = useState(false);



  return (
    <div className={ MobileNavBarActive ? "AppTranslate" : "App"}>
         <Header  MobileNavBarActive={MobileNavBarActive} setMobileBarActive = {setMobileNavBarActive}></Header>
         <AnimeContent header={"Список аниме"}/>
    </div>
  );
}

export default App;
