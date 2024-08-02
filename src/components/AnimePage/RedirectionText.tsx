import React, {FC} from 'react';
import cl from '../modules/AnimePageModules/RedirectionText.module.css'

interface  RedirectionTextInterface{
    children: React.ReactNode,
}

const RedirectionText: FC<RedirectionTextInterface>  = ({children}) => {

    return (
        <span className={cl.redirectionText}>
            {children}
        </span>
    );
};

export default RedirectionText;