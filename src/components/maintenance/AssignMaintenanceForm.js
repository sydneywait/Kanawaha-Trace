// this module creates the react fragment modal that will be used to assign an admin to a request
import React from "react";
import { Dialog } from 'primereact/dialog';
import { Dropdown} from 'primereact/dropdown';

const AssignMaintFragment = (footer, state, admins, onChange, hide)=> {

    // Option to assign maintenance to an admin (modal form)
    return (
        <React.Fragment>
            <Dialog header="Assign an Admin to this Request:"
            visible={state.visible} style={{ width: '50vw' }}
             footer={footer} onHide={hide} >
                <div>Assign:
                <Dropdown
                name="assigned"
                  options={admins.map(m=>m)}
                  onChange={onChange}
                  optionLabel="name"
                  value={state.assigned}
                   placeholder="Select a Person"/>
                </div>
            </Dialog>

        </React.Fragment >
    )
}
export default AssignMaintFragment