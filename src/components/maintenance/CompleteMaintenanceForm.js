import React from "react";
import { Dialog } from 'primereact/dialog';
import {InputTextarea} from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';



const CompleteMaintFragment = (footer, state, onChange, hide)=> {
    return (
        <React.Fragment>
            <Dialog header="Maintenance Request Completed:"
            visible={state.visible} style={{ width: '50vw' }}
             footer={footer} onHide={hide} >
                <div>Date Completed:</div>
            <div><Calendar value={state.date} inline={true}
            required
            monthNavigator={true}
            name="date"
            onChange={onChange}
            placeholder="mm/dd/yy"></Calendar>
                </div>
                <div>Description of work:
            <InputTextarea required
            value={state.updatedDescription}
            style={{ width: '45vw' }}
            onChange={onChange}
            name="updatedDescription"
            placeholder="describe the work completed and any pertinent details or future recommendations"  />
                </div>
                <div className="error-message">{state.warning}</div>
            </Dialog>

        </React.Fragment >
    )
}

export default CompleteMaintFragment