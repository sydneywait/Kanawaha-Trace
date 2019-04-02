import React from "react";
import { Dialog } from 'primereact/dialog';
import { Dropdown} from 'primereact/dropdown';

const AssignMaintFragment = (footer, state, admins, onChange, hide)=> {

    return (
        <React.Fragment>
            <Dialog header="Assign an Admin to this Request:"
            visible={state.visible} style={{ width: '50vw' }}
             footer={footer} onHide={hide} >
                <div>Assign:
                <Dropdown
                  options={admins.map(m=>m)}
                  onChange={onChange}
                  optionLabel="name"
                   placeholder="Select a Person"/>
                </div>
            </Dialog>

        </React.Fragment >
    )
}
export default AssignMaintFragment