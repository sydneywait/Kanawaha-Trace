import React, { Component } from "react";
import "./Maintenance.css"

export default class MaintenanceRequest extends Component {


    render() {
        return (
            <React.Fragment>
                <div className="maint-header">
                <h1>Maintenance Requests</h1>
                </div>
                <div className="maint-cont">
                    <div className="maint-req-form">
                        form
                    </div>
                    <div className="maint-req-list">
                        list
                    </div>
                </div>

            </React.Fragment>
        )
    }
}