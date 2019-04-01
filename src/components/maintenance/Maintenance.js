import React, { Component } from "react";
import "./Maintenance.css"
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Checkbox} from "primereact/checkbox";
import {RadioButton} from "primereact/radiobutton";
import {Dropdown} from 'primereact/dropdown';
import {InputTextarea} from 'primereact/inputtextarea';

export default class Maintenance extends Component {

    basicUser() {
        return (
            <React.Fragment>

                <div className="maint-cont">
                    <div className="maint-req-form">
                        <InputText></InputText>
                        <Dropdown></Dropdown>
                    </div>
                    <div className="maint-req-list">
                        list
                    </div>
                </div>

            </React.Fragment>
        )
    }

    adminUser() {
        return (
            <React.Fragment>

                <div className="maint-cont">
                    <div className="maint-assigned">
                        assigned
                    </div>
                    <div className="maint-unassigned">
                        list
                    </div>
                    <div className="maint-complete">
                        complete
                    </div>
                </div>

            </React.Fragment>


        )
    }



    render() {
        return (
            <React.Fragment>
                <h2>Maintenance Requests</h2>
                {this.props.user.isAdmin === false ? this.basicUser() : this.adminUser()}


            </React.Fragment>
        )
    }
}