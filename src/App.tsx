import React, {useEffect, useState} from 'react';
import './App.css';
import Header from "./components/Header/Header";

function App() {

    const [MobileNavBarActive, setMobileNavBarActive] = useState(false);



  return (
    <div className={ MobileNavBarActive ? "AppTranslate" : "App"}>
         <Header  MobileNavBarActive={MobileNavBarActive} setMobileBarActive = {setMobileNavBarActive}></Header>

    </div>
  );
}

export default App;
