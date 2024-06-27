import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {DateContext} from "./context/context";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const CurrentYear = new Date().getFullYear();



root.render(
    <DateContext.Provider value={{
        CurrentYear
    }}>
        <App />
    </DateContext.Provider>
);

