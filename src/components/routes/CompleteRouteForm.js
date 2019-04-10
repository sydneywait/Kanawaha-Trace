import React from "react";
import { Dialog } from 'primereact/dialog';
import { InputMask } from 'primereact/inputmask';
import { Calendar } from 'primereact/calendar';

const CompleteRouteFragment = (footer, state, onChange, hide)=> {
    return (
        <React.Fragment>
            <Dialog header="Route Completed" visible={state.visible} style={{ width: '50vw' }} footer={footer} onHide={hide} >
            <div>Date Completed:</div>
            <div className="p-inputgroup">
            <div>
            <Calendar inline={true} value={state.date} required  monthNavigator={true} onChange={(e)=>onChange("date", e)} placeholder="mm/dd/yy"></Calendar></div>
                </div>
                <div className="p-inputgroup"><div>Time to Complete:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <InputMask required mask = "99:99:99" value={state.time}

                onChange={(e) => onChange( "time", e)} placeholder="hh:mm:ss"  /><span className="p-inputgroup-addon"><i className="pi pi-clock"></i></span></div>
                </div>
                <div className="error-message">{state.message}</div>
            </Dialog>

        </React.Fragment >
    )
}

export default CompleteRouteFragment