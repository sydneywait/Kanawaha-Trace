import React  from "react";
import "./Maintenance.css"
import MaintenanceRequestForm from "./MaintenanceRequestForm"



const basicUser=(state, props, onChange, onCheck, handleSubmit, handleError)=> {
    return (
        <React.Fragment>

            <div className="maint-cont">

                <div className="maint-req-form">

                    {MaintenanceRequestForm(state, props, onChange, onCheck, handleSubmit, handleError)}

                </div>
                <div>
                    <div className="maint-req-list">
                        <div className="maint-req-header">Ongoing Maintenance</div>
                        {props.maintenance.map(m =>
                            <p>mile {m.mile}--{m.description}</p>

                        )}
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}


export default basicUser
