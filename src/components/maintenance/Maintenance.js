import React, { Component } from "react";
import "./Maintenance.css"
import { Button } from "primereact/button";
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
                    basicUser(this.state, this.props, this.onChange, this.onCheck, this.handleSubmit)
                    : adminUser(this.state, this.props, this.onChange, this.onCheck, this.handleSubmit, this.onClick)}

                {CompleteMaintenanceFragment(footer, this.state, this.onChange, this.onHide)}

            </React.Fragment>
        )
    }
}