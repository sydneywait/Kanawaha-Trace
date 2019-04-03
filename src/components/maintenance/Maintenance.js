import React, { Component } from "react";
import "./Maintenance.css"
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputMask } from 'primereact/inputmask'
import ResourceManager from "../../modules/ResourceAPIManager"
import CompleteMaintenance from "./CompleteMaintenance"
import CompleteMaintenanceFragment from "./CompleteMaintenanceForm"

import basicUser from "./BasicUserPage"
import adminUser from "./AdminUserPage"


export default class Maintenance extends Component {

    componentDidMount() {


    }

    addMaint(maintObject) {

        ResourceManager.addNewItem("maintenance, maintObject")
            .then(() => ResourceManager.getAllItems("maintenance"))
            .then(maint => this.setState({ maintenance: maint }))
    }




    constructor() {
        super();
        this.state = {
            visible: false,
            activeUser: parseInt(sessionStorage.getItem("credentials")),
            location: "",
            description: "",
            date: "",
            updatedDescription: "",
            hazard: "",
            checked: false,
            phone: "",
            maintId: ""
        };
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.completeMaint = this.completeMaint.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onHide = this.onHide.bind(this);
        this.onCheck = this.onCheck.bind(this);
    }
    onClick(e) {
        this.setState({ visible: true, maintId: e.target.id })
            ;
    }

    onHide(event) {
        this.setState({ visible: false });
    }

    onChange(e) {
        const stateToChange = {}
        stateToChange[e.target.name] = e.target.value
        this.setState(stateToChange)
    }

    onCheck(e) {
        this.setState({ checked: e.checked })
    }


    handleSubmit() {
        // create an object representing the request

        const maintObject = {
            mile: this.state.location,
            hazardId: this.state.hazard.id,
            submittedBy: this.state.activeUser,
            isComplete: false,
            userId: "",
            okToContact: this.state.checked,
            phone: this.state.phone,
            description: this.state.description,
            dateSubmitted: new Date()

        }


        // post it to the database
        this.props.addMaint("maintenance", maintObject)
        this.props.history.push("/maintenance")
    }


    completeMaint() {
        // get the id of the target maintenance_request object
        const maintId = parseInt(this.state.maintId.split("-")[1])
        // create a patch object from info in popup
        const maintObject = CompleteMaintenance(this.state.updatedDescription, this.state.date)
        // patch the maintenance_request with the submitted information
        this.props.patchMaint("maintenance", maintId, maintObject)


    }


    // adminUser() {

    //     return (
    //         <React.Fragment>

    //             <div className="maint-cont">
    //                 <div className="maint-assigned">
    //                     <h2>assigned to me</h2>
    //                     {this.props.maintenance.filter((request) => request.isComplete === false && request.userId === this.props.activeUser).map(m =>

    //                         <div><Checkbox id={`checkbox-${m.id}`} onChange={(e) => this.onClick(e)}></Checkbox>
    //                             <a href={`/maintenance/${m.id}`}> mile {m.mile}--{m.description}</a></div>

    //                     )}
    //                 </div>
    //                 <div className="maint-unassigned">
    //                     <h2>unassigned/assigned to others</h2>
    //                     {this.props.maintenance.filter((request) => request.isComplete === false && request.userId !== this.props.activeUser).map(m =>
    //                         <div><a href={`/maintenance/${m.id}`}> mile {m.mile}--{m.description}</a></div>
    //                     )}
    //                 </div>
    //                 <div className="maint-complete">
    //                     <h2>complete</h2>
    //                     {this.props.maintenance.filter((request) => request.isComplete === true).map(m =>
    //                         <div><Checkbox checked="checked"></Checkbox>
    //                             <a href={`/maintenance/${m.id}`}> mile {m.mile}--{m.description}</a></div>

    //                     )}
    //                 </div>
    //             </div>

    //         </React.Fragment>

    //     )
    // }


    render() {
        const footer = (
            <div>
                <Button label="Submit" className="p-button-success" icon="pi pi-check"
                    onClick={() => {
                        this.onHide()
                        this.completeMaint()
                    }}
                />
            </div>
        )
        return (
            <React.Fragment>

                {this.props.user.isAdmin === false ?
                    basicUser(this.state, this.onChange, this.props, this.onCheck, this.handleSubmit)
                    :adminUser(this.props, this.onClick)}

                {CompleteMaintenanceFragment(footer, this.state, this.onChange, this.onHide)}

            </React.Fragment>
        )
    }
}