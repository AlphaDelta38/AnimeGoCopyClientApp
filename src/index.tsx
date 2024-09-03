import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {DateContext} from "./context/context";
import {ToggleProvider} from "./context/ToggleProvider";
import {$host} from "./http";
import {Provider} from "react-redux";
import {store} from "./Store";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const CurrentYear = new Date().getFullYear();

root.render(
    <Provider store={store}>
        <DateContext.Provider value={{
            CurrentYear
        }}>
            <ToggleProvider>
                <App />
            </ToggleProvider>
        </DateContext.Provider>
    </Provider>
);

