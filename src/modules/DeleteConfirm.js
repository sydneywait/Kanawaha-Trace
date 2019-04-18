import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import React from "react";
// This is the popup modal that requires the user to confirm before deleting anything
const deleteConfirmation =(path, id, visible, hide, deleteFunction, history, userId)=> {

    const footer = (
        <div>
            {/* If they click 'yes', delete the selected item */}
            <Button label="yes" className="p-button-danger" icon="pi pi-check"
                onClick={() => {
                    hide()
                    deleteFunction(path, id, userId)
                    history.push(`/${path}`)

                }}
            />
            {/* if they click 'no,' return to page */}
            <Button label="no" className="p-button-success" icon="pi pi-times"
                onClick={() => {
                    hide()
                }}
            />
        </div>
    )
    return(
    <React.Fragment>

            <Dialog header="Are you sure?" visible={visible} style={{ width: '50vw' }} footer={footer} onHide={hide} >
            This action cannot be undone.
            </Dialog>

        </React.Fragment >
    )
}

export default deleteConfirmation