import React, {useState} from 'react';
import cl from "../modules/DropDownFilters.module.css";
import CustomButton from "../AdditionalComponents/CustomButton";
import InfoToolTip from "../AdditionalComponents/InfoToolTip";


interface FilterbtnInterface {
    Titlejanr:string
    SingleName: string
    janrs: string[]
    chosenFilter:string[]
    AddToChose: (e:string)=>void
}



const FilterBtn = ({ Titlejanr, SingleName,  janrs, chosenFilter, AddToChose }:FilterbtnInterface) => {

    const [activeBtn, setActiveBtn] = useState(false);


    function activateBtn(){
        if(activeBtn){
            setActiveBtn(false)
        }else{
            setActiveBtn(true)
        }
    }

    return (
        <div className={cl.MainFilter}>
            <div className={cl.MainFilter__Header}>
                <div>
                    {Titlejanr}
                </div>
            </div>
            <div className={cl.DrowDownBtn}>
                <button onClick={() => activateBtn()}>
                    Выберите {SingleName}
                </button>
                <div style={activeBtn ? {visibility: "visible"} : {visibility: "hidden"}} className={cl.DropMenuForBtn}>
                    {janrs.map((value, index, array) =>
                        <div key={index + array.length} onClick={() => AddToChose(value)} className={cl.DropDownItem}>
                            <div className={chosenFilter.includes(value) ? cl.CheckBoxActive : cl.CheckBox}>

                            </div>
                            {value}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FilterBtn;