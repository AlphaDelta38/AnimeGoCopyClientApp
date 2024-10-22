import React, {useEffect, useState} from 'react';
import cl from '../modules/CommentsModules/Coments.module.css'
import ItemComments from "./ItemComments";
import CommentsAnswerArea from "./CommentsAnswerArea";
import {createNewComments, getAllCommentsAboutAnime} from "../../http/AnimePageItemApi";
import {useLocation} from "react-router-dom";
import {commentsItemsInterface, createCommentsInterface} from "../../types";

interface commentsDataInterface{
    generalComments: commentsItemsInterface[],
    childrenComments: commentsItemsInterface[][],
}



const Coments = () => {


    const [mainFieldActive,setMainFielActive] = useState<boolean>(true)
    const [currentActiveId, setCurrentActiveId] = useState<number>(0)
    const [commentsData, setCommentsData] = useState<commentsDataInterface>()
    const [dataAnswerArea, setDataAnswerArea] = useState<string>("");

    const location = useLocation()

    async function getComments(){
        const comments = await getAllCommentsAboutAnime(Number(location.pathname.split("/")[2]))



        let parentMassive: commentsItemsInterface[] = [];
        let childrenMassive:commentsItemsInterface[][] = [];

        function getAllChildrenComments(inputAnswers: commentsItemsInterface[], idMassive: number){
            const answers = inputAnswers



            for (let i = 0; i < answers.length; i++) {
                let forPush = {...answers[i]};
                let likes = 0;

                for (let j = 0; j < forPush.likes.length; j++) {
                    if(forPush.likes[j] > 0){
                        likes++;
                    }else if(forPush.likes[j] < 0){
                        likes--;
                    }
                }

                forPush.answers = [];
                childrenMassive[idMassive].push({...forPush, likes: [...forPush.likes, likes]});
            }

            for (const answer of answers) {

                if(answer.answers){
                    getAllChildrenComments(answer.answers, idMassive)
                }
            }

        }

        if(comments && comments.length > 0){

            for (let i = 0; i < comments.length; i++) {
                let likes = 0;
                for (let j = 0; j < comments[i].likes.length; j++) {
                    if(comments[i].likes[j] > 0){
                        likes++;
                    }else if(comments[i].likes[j] < 0){
                        likes--;
                    }
                }

                parentMassive.push({...comments[i],likes: [...comments[i].likes, likes] })
                childrenMassive.push([]);
            }

            for (let i = 0; i < comments.length; i++) {

                getAllChildrenComments(comments[i].answers!, i)
            }


        }

        setCommentsData({generalComments: parentMassive, childrenComments:childrenMassive})


    }





     async function createComments(body: createCommentsInterface){
        try {
            let newComment:commentsItemsInterface | undefined;
            if(body.commentsId){
                newComment  = await createNewComments(body);
            }else{
                newComment  = await createNewComments({userId: body.userId, likes: [0], message: body.message, animePageId: body.animePageId});
            }
            if(newComment) {
                setDataAnswerArea("");
                setMainFielActive(true);
                const parent = [...commentsData!.generalComments]
                const children = [...commentsData!.childrenComments]
                let next = false;
                parent.forEach((value, index) => {
                    if(value.id === newComment?.commentsId){

                        children[index].push(newComment);
                        next = true;
                    }
                })
                if(next){
                    return 0;
                }

                for (let i = 0; i < children.length; i++) {
                    let signal = false;
                    children[i].forEach((value,index)=>{
                        if(value.id === newComment?.commentsId){
                            children[i].push(newComment);
                            next = true;
                            signal = true;
                        }
                    })
                    if(signal){
                        break;
                    }
                }
                if(next){
                    return 0;
                }

                parent.push(newComment);
                setCommentsData({generalComments: parent, childrenComments: children});



            }
        }catch (e){

        }
     }


    useEffect(() => {
        getComments()
    }, []);

    return (
        <div className={cl.container}>
            <div className={cl.createComentContainer}>
                <h2>Коментарии</h2>
                <div style={mainFieldActive ? {} : {display:"none"}} className={cl.commentAreaField}>
                    <CommentsAnswerArea  createCommentFunc={createComments}  setData={setDataAnswerArea}  data={dataAnswerArea} cancelBtnFalse={true}/>
                </div>
            </div>
            <div  className={cl.commentsContainer}>
                {
                    commentsData && commentsData.generalComments.map((value,index)=>
                        <ItemComments
                            createCommentFunc={createComments}
                            data={dataAnswerArea}
                            setData={setDataAnswerArea}
                            key ={value.id}
                            item={commentsData?.generalComments[index]}
                            childrenItems={commentsData?.childrenComments[index]}
                            mainCommentFieldActive={mainFieldActive}
                            setMainCommentFieldActe={setMainFielActive}
                            setCurrentActiveId={setCurrentActiveId}
                            currentActiveId={currentActiveId} id={value.id} />
                    )
                }

            </div>
        </div>
    );
};

export default Coments;


