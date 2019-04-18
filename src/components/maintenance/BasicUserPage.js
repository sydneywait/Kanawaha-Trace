import React  from "react";
import "./Maintenance.css"
import MaintenanceRequestForm from "./MaintenanceRequestForm"


// This is the maintenance page that renders when the user logs in without admin credentials
const basicUser=(state, props, onChange, onCheck, handleSubmit, handleError)=> {
    return (

        <React.Fragment>
{/* There are two columns--the maintenance request for ma nd a list of ongoing maintenance */}
            <div className="basic-maint-cont">

                <div className="maint-req-form">

                    {MaintenanceRequestForm(state, props, onChange, onCheck, handleSubmit, handleError)}

                </div>
                <div>
                    <div className="maint-req-list">
                    {/* Ongoing maintenance sorted by mile.  Only show those that aren't complete */}
                        <div className="maint-req-header">Ongoing Maintenance</div>
                        <div className="maint-req-items">{props.maintenance.sort((a, b) => a.mile - b.mile).filter((m)=>m.isComplete===false).map(m =>
                            <p>mile {m.mile}--{m.description}</p>

                        )}
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}


export default basicUser
