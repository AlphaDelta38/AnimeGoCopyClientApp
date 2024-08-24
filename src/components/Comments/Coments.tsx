import React, {useContext, useRef, useState} from 'react';
import cl from '../modules/CommentsModules/Coments.module.css'
import TextWithAdditionalInfo from "../AdditionalComponents/TextWithAdditionalInfo";
import {textEncoder} from "../../util/TextEncoder";
import ItemComments from "./ItemComments";
import CommentsAnswerArea from "./CommentsAnswerArea";


const Coments = () => {


    const [mainFieldActive,setMainFielActive] = useState<boolean>(true)
    const [currentActiveId, setCurrentActiveId] = useState<number>(0)



    return (
        <div className={cl.container}>
            <div className={cl.createComentContainer}>
                <h2>Коментарии</h2>
                <div style={mainFieldActive ? {} : {display:"none"}} className={cl.commentAreaField}>
                    <CommentsAnswerArea cancelBtnFalse={true}/>
                </div>
            </div>
            <div  className={cl.commentsContainer}>
                <ItemComments mainCommentFieldActive={mainFieldActive} setMainCommentFieldActe={setMainFielActive} setCurrentActiveId={setCurrentActiveId} currentActiveId={currentActiveId} id={1} />
                <ItemComments mainCommentFieldActive={mainFieldActive} setMainCommentFieldActe={setMainFielActive} setCurrentActiveId={setCurrentActiveId} currentActiveId={currentActiveId} id={2} />
            </div>
        </div>
    );
};

export default Coments;


