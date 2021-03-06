import React, { Component } from "react";
import "./Maintenance.css"
import { Button } from "primereact/button";
import CompleteMaintenance from "./CompleteMaintenancePatch"
import CompleteMaintenanceFragment from "./CompleteMaintenanceForm"
import basicUser from "./BasicUserPage"
import adminUser from "./AdminUserPage"


export default class Maintenance extends Component {

    componentDidMount() {


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
            maintId: "",
            message: "",
            warning: ""
        };

        // Bind the functions to this component
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.completeMaint = this.completeMaint.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onHide = this.onHide.bind(this);
        this.onCheck = this.onCheck.bind(this);
        this.handleError = this.handleError.bind(this);
    }
    // functions for handling if modal is visible or hidden
    onClick(e) {
        this.setState({ visible: true, maintId: e.target.id })

    }

    onHide(e) {
        this.setState({ visible: false });
    }

    // function for handling input fields
    onChange(e) {
        const stateToChange = {}
        stateToChange[e.target.name] = e.target.value
        this.setState(stateToChange)
    }


    // function for handling checkbox
    onCheck(e) {
        this.setState({ checked: e.checked })
    }

    // function that is called when a new maintenance request is submitted

    handleSubmit() {
        // create an object representing the request

        const maintObject = {
            mile: this.state.location,
            hazardId: this.state.hazard.id,
            submittedBy: this.state.activeUser,
            isComplete: false,
            okToContact: this.state.checked,
            phone: this.state.phone,
            description: this.state.description,
            dateSubmitted: new Date()

        }


        // post it to the database
        this.props.addMaint("maintenance", maintObject)

        // reset state
        const newState = {
            description: "",
            hazard: "",
            location: "",
            checked: false,
            phone: "",
            message: ""
        }
        this.setState(newState)
        // re-render the page
        this.props.history.push("/maintenance")
    }


    completeMaint() {
        // get the id of the target maintenance_request object
        const maintId = parseInt(this.state.maintId.split("-")[1])
        // create a patch object from info in popup
        const maintObject = CompleteMaintenance(this.state.updatedDescription, this.state.dateCompleted)
        // patch the maintenance_request with the submitted information
        this.props.patchMaint("maintenance", maintId, maintObject)
        this.setState({ warning: "" })
    }

    // error message when form is not complete
    handleError() {
        this.setState({ message: "All fields must be complete before submitting this form" })
    }


    render() {
        const footer = (
            <div>
                <Button label="Submit" className="p-button-success" icon="pi pi-check"
                    onClick={() => {


                        if (this.state.updatedDescription !== "" && this.state.dateCompleted !== "") {
                            this.completeMaint()
                            this.onHide()
                        }
                        else {
                            this.setState({ warning: "Please complete both fields" })
                        }
                    }}
                />
            </div>
        )
        return (
            <React.Fragment>

                {/* determines which page is rendered based on if the user is an admin or not */}
                {this.props.user.isAdmin === false ?
                    basicUser(this.state, this.props, this.onChange, this.onCheck, this.handleSubmit, this.handleError)
                    : adminUser(this.state, this.props, this.onChange, this.onCheck, this.handleSubmit, this.handleError, this.onClick)}

                {CompleteMaintenanceFragment(footer, this.state, this.onChange, this.onHide)}

            </React.Fragment>
        )
    }
}