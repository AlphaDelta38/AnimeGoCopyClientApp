import React, {useState} from 'react';
import cl from '../modules/AdditionalComponentsModules/CustomBtn.module.css'




const CustomButton = () => {
    const [active, setActive]  = useState(false)

    function  activateBtn(){
        if(active){
            setActive(false)
        }else{
            setActive(true)
        }
    }

    return (
        <div onClick={()=>{activateBtn()}} className={ active ? cl.btnActive : cl.btn }>
            <div className={ active ? cl.btn__circleActive : cl.btn__circle}>

            </div>
        </div>
    );
};

export default CustomButton;