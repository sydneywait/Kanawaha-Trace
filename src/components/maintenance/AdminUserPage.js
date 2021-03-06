import React from "react";
import { Link } from "react-router-dom"
import "./Maintenance.css"
import { Checkbox } from "primereact/checkbox";
import MaintenanceRequestForm from "./MaintenanceRequestForm";


// This function creates the view of the maintenance page that is seen if the user is an Admin
const adminUser = (state, props, onChange, onCheck, handleSubmit, handleError, onClick) => {

    const activeUser = parseInt(sessionStorage.getItem("credentials"))

    return (
        <React.Fragment>
            {/* Create the container for the page, consisting of 4 columns */}
            {/* The maint request form, assigned, unassigned, and completed maint tasks */}
            <div className="maint-cont">
                <div className="maint-req-form">
                    {MaintenanceRequestForm(state, props, onChange, onCheck, handleSubmit, handleError)}
                </div>
                <div className="maint-lists-cont">
                    <div className="maint-assigned">
                    {/* Tasks assigned to me, sorted by mile */}
                        <div className="maint-admin-col1"><span className="maint-admin-col-head">Assigned to me</span></div>
                        <div className="maint-card-text-cont">
                        {props.maintenance.sort((a,b)=>a.mile-b.mile).filter((request) => request.isComplete === false && request.userId === activeUser).map(m =>

                            <div className="maint-card-text" key={m.id} ><span className="maint-checkbox"><Checkbox id={`checkbox-${m.id}`} onChange={(e) => onClick(e)}></Checkbox></span>

                                <Link className="link" to={`/maintenance/${m.id}`}>mile {m.mile}--{m.description}</Link></div>

                        )}
                        </div>
                    </div>
                    <div className="maint-unassigned">
                    {/* Tasks assigned to other people, sorted by mile */}
                        <div className="maint-admin-col2"><span className="maint-admin-col-head">Assigned to others or Unassigned</span></div>
                        <div className="maint-card-text-cont">
                        {props.maintenance.sort((a,b)=>a.mile-b.mile).filter((request) => request.isComplete === false && request.userId !== activeUser).map(m =>
                            <div key={m.id} className={!m.userId ? "unassigned maint-card-text" : "assigned maint-card-text"}><Link className="link" to={`/maintenance/${m.id}`}>mile {m.mile}--{m.description}</Link></div>
                        )}</div>
                    </div>
                    <div className="maint-complete">
                    {/* Tasks that are complete, sorted by mile */}
                        <div className="maint-admin-col1"><span className="maint-admin-col-head">Complete</span></div>
                        <div className="maint-card-text-cont">
                        {props.maintenance.sort((a,b)=>a.mile-b.mile).filter((request) => request.isComplete === true).map(m =>
                            <div className="maint-card-text" key={m.id} ><span className="maint-checkbox"><Checkbox checked={true}></Checkbox></span>

                                <Link  className="link"to={`/maintenance/${m.id}`}>mile {m.mile}--{m.description}</Link></div>

                        )}
                        </div>
                    </div>
                </div>
            </div>


        </React.Fragment>

    )

}

export default adminUser;