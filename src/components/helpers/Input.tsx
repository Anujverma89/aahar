import { FormEventHandler } from "react"

interface InputType{
    type:string,
    Representation:string,
    classes:string,
    name:string,
    id:string,
    datadiv:string,
    changeHandler:FormEventHandler,
    value:string,
}

interface SelectInput{
    id:string,
    name:string,
    labelRep:string,
    optionsred:string[],
    selectclass:string,
    value:string,
    changeHandler:FormEventHandler,
}

const Input:React.FC<InputType> = ({classes,type,Representation,name,id,datadiv, changeHandler,value})=>{
    return(
        <div className="text-black w-full h-fit px-5 py-1 flex flex-col">
            <label htmlFor={id}>{Representation}</label>
            <input type={type} id={id} name={name} className={classes} value={value} data-input={datadiv} onChange={changeHandler} required autoComplete="true"></input>
        </div>
    )
}


export const Selectinput:React.FC<SelectInput> =({id,name,optionsred, value, selectclass, changeHandler,labelRep})=>{
    return(
        <div className="text-black w-full h-fit px-5 py-1 flex flex-col">
            <label htmlFor={id}>{labelRep}</label> 
            <select className={selectclass} name={name} value={value} id={id} onChange={changeHandler}>
            {
                optionsred.map((value)=>(<option>{value}</option>))
            }
            </select>
        </div>
    )
}

export default Input;