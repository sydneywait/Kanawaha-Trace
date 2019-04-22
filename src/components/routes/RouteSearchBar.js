import React from "react";
import { InputText } from 'primereact/inputtext';

const RouteSearchBar=(value, valueParam, onChange)=>{
return(
<React.Fragment>
<span className={`p-float-label ${valueParam}`}>
<InputText id={valueParam} style = {valueParam ==="searchPlan"?{"width": "85%"}:{"width": "50%"}}
        value={value}
        onChange={(e)=>{onChange(valueParam,e)}} placeholder={(valueParam==="searchPlan"? "Search for Routes by Name":"Search for Routes by Name or Date")}/>
    {/* <label htmlFor="in">{(valueParam==="searchPlan"? "Search for Routes by Name":"Search for Routes by Name or Date")}</label> */}
</span>
</React.Fragment>
)
}

export default RouteSearchBar