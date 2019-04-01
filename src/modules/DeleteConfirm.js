import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import React from "react";

const deleteConfirmation =(path, id, userId, visible, hide, deleteFunction, history)=> {

    const footer = (
        <div>
            <Button label="yes" className="p-button-danger" icon="pi pi-check"
                onClick={() => {
                    hide()
                    deleteFunction(path, id, userId)
                    history.push("/routes")

                }}
            />
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