import React, { Component } from "react";
import { Dialog } from 'primereact/dialog';
import { InputMask } from 'primereact/inputmask';
import { Calendar } from 'primereact/calendar';

const completeRouteFragment = (footer, state, onChange, hide)=> {
    return (
        <React.Fragment>
            <Dialog header="Route Completed:" visible={state.visible} style={{ width: '50vw' }} footer={footer} onHide={hide} >
                <div>Date Completed:
            <Calendar value={state.date} onChange={(e)=>onChange("date", e)} placeholder="mm/dd/yy"></Calendar>
                </div>
                <div>Time to Complete:
            <InputMask required true mask = "99:99:99" value={state.time} onChange={(e) => onChange( "time", e)} placeholder="hh:mm:ss"  />
                </div>
            </Dialog>

        </React.Fragment >
    )
}

export default completeRouteFragment