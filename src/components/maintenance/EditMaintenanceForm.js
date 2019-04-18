import React from "react";
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext'
import {InputTextarea} from 'primereact/inputtextarea'

// this module creates the react fragment modal that will be used to assign an admin to a request

const EditMaintFragment = (footer, state, admins, hazards, onChange, hide) => {


    return (
        <React.Fragment>


            <Dialog header="Edit Request Details:"
                visible={state.visible} style={{ width: '50vw' }}
                footer={footer} onHide={hide} >

                <div>
                    {/* review the mile point  */}
                    <InputText value={state.mile} onChange={onChange}
                        name="mile"
                        value={state.mile}
                        placeholder="Enter approx. mile mark">

                    </InputText>
                </div>
                <div >
                    {/* Select or change the hazard */}
                    <Dropdown
                        className="haz-dd" value={state.hazard}
                        name="hazard"
                        options={hazards.map((h)=>h)}
                        onChange={onChange}
                        style={{ width: '200px' }}
                        placeholder="Select a hazard type" optionLabel="type">
                    </Dropdown>
                </div>

                <div>
                    {/* Edit or update the description of the hazard */}
                    <InputTextarea placeholder="enter a brief description of the issue"
                        rows={5} cols={30}
                        name="description"
                        value={state.description}
                        onChange={onChange}
                        autoResize={true}>
                    </InputTextarea>
                </div>
                {/* Assign it to an administrator */}
                <div>Assign:
                <Dropdown
                        name="assigned"
                        options={admins.map(m => m)}
                        onChange={onChange}
                        optionLabel="name"
                        value={state.assigned}
                        placeholder="Select a Person" />
                </div>


            </Dialog>

        </React.Fragment >
    )
}
export default EditMaintFragment