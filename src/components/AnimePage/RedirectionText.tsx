import React, {CSSProperties, FC} from 'react';
import cl from '../modules/AnimePageModules/RedirectionText.module.css'

interface  RedirectionTextInterface{
    children: React.ReactNode,
    variant?: string
}

const RedirectionText: FC<RedirectionTextInterface>  = ({children,variant}) => {

    return (
        <span className={ variant === "black" ? cl.redirectionTextBlackVerison : cl.redirectionText}>
            {children}
        </span>
    );
};

export default RedirectionText;