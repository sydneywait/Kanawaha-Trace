import React from "react";
import { Link } from "react-router-dom"
import "./Maintenance.css"
import { Checkbox } from "primereact/checkbox";
import MaintenanceRequestForm from "./MaintenanceRequestForm";



const adminUser = (state, props, onChange, onCheck, handleSubmit, handleError, onClick) => {
    const activeUser = parseInt(sessionStorage.getItem("credentials"))

    return (
        <React.Fragment>

            <div className="maint-cont">
                <div className="maint-req-form">
                {MaintenanceRequestForm(state, props, onChange, onCheck, handleSubmit, handleError)}
                </div>
                <div className="maint-lists-cont">
                <div className="maint-assigned">
                    <div className="maint-admin-col1">Assigned to me</div>
                    {props.maintenance.filter((request) => request.isComplete === false && request.userId === activeUser).map(m =>

                        <div className="maint-card-text" key={m.id} ><span className="maint-checkbox"><Checkbox id={`checkbox-${m.id}`} onChange={(e) => onClick(e)}></Checkbox></span>

                            <Link to={`/maintenance/${m.id}`}>mile {m.mile}--{m.description}</Link></div>

                    )}
                </div>
                <div className="maint-unassigned">
                    <div className="maint-admin-col2">Assigned to others or Unassigned</div>
                    {props.maintenance.filter((request) => request.isComplete === false && request.userId !== activeUser).map(m =>
                        <div   key ={m.id} className={!m.userId?"unassigned maint-card-text":"assigned maint-card-text"}><Link to={`/maintenance/${m.id}`}>mile {m.mile}--{m.description}</Link></div>
                    )}
                </div>
                <div className="maint-complete">
                    <div className="maint-admin-col1">Complete</div>
                    {props.maintenance.filter((request) => request.isComplete === true).map(m =>
                        <div className="maint-card-text" key={m.id} ><span className="maint-checkbox"><Checkbox checked={true}></Checkbox></span>

                            <Link to={`/maintenance/${m.id}`}>mile {m.mile}--{m.description}</Link></div>

                    )}
                    </div>
                </div>
            </div>


        </React.Fragment>

    )

}

export default adminUser;