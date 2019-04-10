import React from "react";
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';


const SelectRoutePoints = (footer, state, props, onStartChange, onEndChange, onHide)=> {
    const options=props.waypoints.filter(h => h.isAccess === true).map(h => h)

    return (
        <React.Fragment>
            <Dialog header="Edit Start and End Points" visible={state.visible} style={{ width: '50vw' }} footer={footer} onHide={onHide} >

                <div className="exp-dd-cont">

                    <Dropdown className="exp-dd" value={state.start} options={options} onChange={onStartChange} style={{ width: '200px' }} placeholder="Select a Start Point" optionLabel="name" />
                    <Dropdown className="exp-dd" value={state.end} options={options} onChange={onEndChange} style={{ width: '200px' }} placeholder="Select an End Point" optionLabel="name" />
                </div>
                <div className="error-message">{state.message}</div>
            </Dialog>


        </React.Fragment>
    )
}

export default SelectRoutePoints