import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {DateContext} from "./context/context";
import {ToggleProvider} from "./context/ToggleProvider";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const CurrentYear = new Date().getFullYear();



root.render(

    <DateContext.Provider value={{
        CurrentYear
    }}>
        <ToggleProvider>
            <App />
        </ToggleProvider>
    </DateContext.Provider>
);

