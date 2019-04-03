import React  from "react";
import "./Maintenance.css"
import { Checkbox } from "primereact/checkbox";



const adminUser=(props, onClick)=> {

    return (
        <React.Fragment>

            <div className="maint-cont">
                <div className="maint-assigned">
                    <h2>assigned to me</h2>
                    {props.maintenance.filter((request) => request.isComplete === false && request.userId === props.activeUser).map(m =>

                        <div><Checkbox id={`checkbox-${m.id}`} onChange={(e) => onClick(e)}></Checkbox>
                            <a href={`/maintenance/${m.id}`}> mile {m.mile}--{m.description}</a></div>

                    )}
                </div>
                <div className="maint-unassigned">
                    <h2>unassigned/assigned to others</h2>
                    {props.maintenance.filter((request) => request.isComplete === false && request.userId !== props.activeUser).map(m =>
                        <div><a href={`/maintenance/${m.id}`}> mile {m.mile}--{m.description}</a></div>
                    )}
                </div>
                <div className="maint-complete">
                    <h2>complete</h2>
                    {props.maintenance.filter((request) => request.isComplete === true).map(m =>
                        <div><Checkbox checked="checked"></Checkbox>
                            <a href={`/maintenance/${m.id}`}> mile {m.mile}--{m.description}</a></div>

                    )}
                </div>
            </div>

        </React.Fragment>

    )
}

export default adminUser;