import React, {useState} from 'react';
import cl from '../modules/AnimeChooseContentModules/DropDownFilters.module.css'
import CustomButton from "../AdditionalComponents/CustomButton";
import InfoToolTip from "../AdditionalComponents/InfoToolTip";
import FilterBtn from "./FilterBtn";

interface DropDownFiltersInterface{
    Titlejanr: string,
    SingleName: string,
    janrs: string[],
}

interface DropDownFilterProps {
    filters: DropDownFiltersInterface[]

}


const DropDownFilters: React.FC<DropDownFilterProps> = ({filters}) => {




    const [activeBtn, setActiveBtn] = useState(false);
    const [chosenFilter, setChosenFilter] = useState<string[]>([]);
    let ForOtherRender = filters.filter((value, index, array)=> index !== 0)
    const [ForOutJarns, setForOutJarns] = useState<string[]>([]);


    function AddToChose(e:string){
        let newChose = [...chosenFilter, e];
        if(!chosenFilter.includes(e)){
            setChosenFilter(newChose)
        }else{
            let withOut = [...chosenFilter].filter((value)=> value !== e);
            setChosenFilter(withOut)
        }
    }

    function AddToGlobalAndOwn(value:string){

        AddToChose(value)

        if(ForOutJarns){
            let newMassvie = [...ForOutJarns, value]
            if(!ForOutJarns.includes(value)){
                setForOutJarns(newMassvie)
            }else{
                let withOut = [...ForOutJarns].filter((e)=> e !== value);
                setForOutJarns(withOut)
            }
        }
    }

    function activateBtn(){
        if(activeBtn){
            setActiveBtn(false)
        }else{
            setActiveBtn(true)
        }
    }

    return (
        <div className={cl.container}>
            <div className={cl.MainFilter}>
                <div className={cl.MainFilter__Header}>
                    <div>
                        {filters[0].Titlejanr}

                    </div>
                    <div className={cl.AdditionalFunctions}>
                        <div>
                            <CustomButton/>
                        </div>
                        <div>
                            <InfoToolTip/>
                        </div>
                    </div>
                </div>
                <div className={cl.DrowDownBtn}>
                    <button onClick={()=>activateBtn()}>
                        {ForOutJarns?.length !== 0 ?
                            ForOutJarns.map((value)=>`${value},`)

                            :

                            ` Выберите ${filters[0].SingleName}`
                        }
                    </button>
                    <div style={ activeBtn ? {visibility:"visible"} : {visibility:"hidden"}} className={cl.DropMenuForBtn}>
                        {filters[0].janrs.map((value, index, array)=>
                                <div key={index + array.length} onClick={()=>AddToGlobalAndOwn(value)} className={cl.DropDownItem}>
                                    <div  className={chosenFilter.includes(value) ? cl.CheckBoxActive : cl.CheckBox}>

                                    </div>
                                    {value}
                                </div>
                        )}
                    </div>
                </div>
            </div>
            {ForOtherRender.map((value, index, array)=><FilterBtn key={index + array.length} Titlejanr={value.Titlejanr} SingleName={value.SingleName} janrs={value.janrs} chosenFilter={chosenFilter} AddToChose={AddToChose}/>)}
        </div>
    );
};

export default DropDownFilters;