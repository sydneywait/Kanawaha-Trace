import React from "react";
import { Link } from "react-router-dom"
import "./Maintenance.css"
import { Checkbox } from "primereact/checkbox";

import MaintenanceRequestForm from "./MaintenanceRequestForm";



const adminUser = (state, props, onChange, onCheck, handleSubmit, onClick) => {

    return (
        <React.Fragment>

            <div className="maint-cont">
                <div className="maint-req-form">
                {MaintenanceRequestForm(state, props, onChange, onCheck, handleSubmit)}
                </div>
                <div className="maint-lists-cont">
                <div className="maint-assigned">
                    <h2>assigned to me</h2>
                    {props.maintenance.filter((request) => request.isComplete === false && request.userId === props.activeUser).map(m =>

                        <div><Checkbox id={`checkbox-${m.id}`} onChange={(e) => onClick(e)}></Checkbox>

                            <Link to={`/maintenance/${m.id}`}>mile {m.mile}--{m.description}</Link></div>

                    )}
                </div>
                <div className="maint-unassigned">
                    <h2>assigned to others</h2>
                    {props.maintenance.filter((request) => request.isComplete === false && request.userId !== props.activeUser).map(m =>
                        <div><Link to={`/maintenance/${m.id}`}>mile {m.mile}--{m.description}</Link></div>
                    )}
                </div>
                <div className="maint-complete">
                    <h2>complete</h2>
                    {props.maintenance.filter((request) => request.isComplete === true).map(m =>
                        <div><Checkbox checked="checked"></Checkbox>

                            <Link to={`/maintenance/${m.id}`}>mile {m.mile}--{m.description}</Link></div>

                    )}
                    </div>
                </div>
            </div>

        </React.Fragment>

    )

}

export default adminUser;