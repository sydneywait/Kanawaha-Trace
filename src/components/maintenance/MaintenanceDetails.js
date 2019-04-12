import React, { Component } from "react";
import ResourceManager from "../../modules/ResourceAPIManager"
import { Button } from 'primereact/button';
import CompleteMaintenance from "./CompleteMaintenancePatch"
import CompleteMaintenanceFragment from "./CompleteMaintenanceForm"
import AssignMaintenanceFragment from "./AssignMaintenanceForm"
import EditMaintenanceFragment from "./EditMaintenanceForm"
import Moment from 'react-moment';
import DeleteConfirm from "../../modules/DeleteConfirm"
import { Link } from "react-router-dom";


export default class MaintenanceDetails extends Component {

    state = {

    }


    componentDidMount() {
        let newState = {}
        ResourceManager.getSingleItem("maintenance", this.props.match.params.maintenanceId)
            .then((request => {

                newState = {
                    mile: request.mile,
                    hazardId: request.hazardId,
                    submittedBy: request.submittedBy,
                    isComplete: request.isComplete,
                    okToContact: request.okToContact,
                    phone: request.phone,
                    description: request.description,
                    dateSubmitted: request.dateSubmitted,
                    id: request.id,
                    updatedDescription: (request.isComplete === true ? request.updatedDescription : ""),
                    dateCompleted: (request.isComplete === true ? request.dateCompleted : "")
                }
                if (request.userId) {
                    newState.userId = request.userId
                }
            }
            )

            )
            // get the hazard type
            .then(() => ResourceManager.getSingleItem("hazards", newState.hazardId))
            .then((hazard) => newState.hazard = hazard)
            // get the user who submitted the request
            .then(() => ResourceManager.getSingleItem("users", newState.submittedBy))
            .then((user) => {
                newState.submitName = user.name
                // get the admin info, if one is assigned
                if (newState.userId) {
                    ResourceManager.getSingleItem("users", newState.userId)
                        .then((assigned) => {
                            newState.assigned = assigned
                            this.setState(newState)
                        })
                }
                // set state with the information
                else { this.setState(newState) }

            })
    }

    constructor() {
        super();
        this.state = {
            visible: false,
            activeUser: parseInt(sessionStorage.getItem("credentials")),
            dateCompleted: "",
            updatedDescription: "",
            target: "",
            hazard: { type: "", id: "" },
            assigned: {},
            warning: ""


        };
        this.onChange = this.onChange.bind(this);
        this.completeMaint = this.completeMaint.bind(this)
        this.onHide = this.onHide.bind(this);
        // this.deleteMaint = this.deleteMaint.bind(this);
    }

    onHide() {
        this.setState({
            visible: false,
            warning: ""
        });
    }

    onChange(e) {
        const stateToChange = {}
        stateToChange[e.target.name] = e.target.value
        this.setState(stateToChange)
    }

    completeMaint() {
        // get the id of the target maintenance_request object
        const maintId = this.state.id
        // create a patch object from info in popup
        const maintObject = CompleteMaintenance(this.state.updatedDescription, this.state.dateCompleted)
        // patch the maintenance_request with the submitted information
        this.setState({isComplete: true})
        this.props.patchMaint("maintenance", maintId, maintObject)
        this.props.history.push(`/maintenance/${this.state.id}`)


    }





    editMaint() {
        let editedObject = {}
        // create an object based on the edited fields
        editedObject = {

            mile: this.state.mile,
            hazardId: this.state.hazard.id,
            description: this.state.description,
        }
        // check to see if a person was selected to be assigned
        if (this.state.assigned.id) {
            // add a field of userId to the object
            editedObject.userId = this.state.assigned.id
        }

        // post the patch to the database
        this.props.patchMaint("maintenance", this.state.id, editedObject)
        this.onHide()
        this.props.history.push(`/maintenance/${this.state.id}`)


    }



    render() {
        const footer = (
            <div>
                <Button label="Submit" className="p-button-success" icon="pi pi-check"
                    onClick={() => {

                        if (this.state.target === "maint-complete-btn") {
                            if (this.state.dateCompleted !== "" && this.state.updatedDescription !== "") {
                                this.completeMaint()
                                this.onHide()

                            }
                            else {

                                this.setState({ warning: "Please complete all fields" })
                            }
                        }

                        if (this.state.target === "maint-edit-btn") {
                            this.editMaint()
                            this.onHide()
                        }


                    }}
                />
            </div>
        )

        return (
            <React.Fragment>
                <h2>Request Details</h2>
                <div className={this.state.isComplete ? "request-details-complete" : "request-details"}>

                    <p>mile: {" " + this.state.mile}</p>
                    <p>Hazard: {this.state.hazard.type}</p>
                    <p> Submitted:{" "} <Moment format="MM/DD/YY">{this.state.dateSubmitted}</Moment></p>
                    <p>Submitted by:{" " + this.state.submitName}</p>
                    {this.state.okToContact === true ? <p>Contact phone:{" " + this.state.phone}</p> : ""}
                    <p>Description of Problem:{" " + this.state.description}</p>

                    {this.state.isComplete === true ? <p>Resolution:{" " + this.state.updatedDescription}</p> : ""}

                    {this.state.assigned.name ? <p>Assigned to: {this.state.assigned.name}</p> : <p>unassigned</p>}
                    {this.state.isComplete ? <h3>Completed:{" "}<Moment format="MM/DD/YY">{this.state.dateCompleted}</Moment> </h3> : ""}
                    <div>

                        {this.state.isComplete === false ? <Button label="Complete"
                            icon="pi pi-check" iconPos="right"
                            id="maint-complete-btn"
                            className="p-button-raised p-button-rounded p-button-success"
                            onClick={(e) => {

                                console.log("you clicked", e.currentTarget.id)
                                this.setState({ visible: true, target: e.currentTarget.id })

                            }}
                        >
                        </Button> : ""}

                        {this.state.isComplete === false ? <Button label="Edit"
                            icon="pi pi-pencil" iconPos="right"
                            id="maint-edit-btn"
                            className="p-button-raised p-button-rounded p-button-primary"
                            onClick={(e) => {

                                console.log("you clicked", e.currentTarget.id)
                                this.setState({ visible: true, target: e.currentTarget.id })

                            }}
                        >
                        </Button> : ""}


                        <Button label="Delete"
                            icon="pi pi-times" iconPos="right"
                            id="maint-delete-btn"
                            className="p-button-raised p-button-rounded p-button-danger"
                            onClick={(e) => {

                                console.log("you clicked", e.currentTarget.id)
                                this.setState({ visible: true, target: e.currentTarget.id })

                            }}
                        >
                        </Button>
                    </div>

                </div>
                <i className="pi pi-chevron-left"></i>

                <Link className="back-to-maint" to={"/maintenance"}>Back to Maintenance List</Link>
                <div>
                    {this.state.target === "maint-complete-btn" ?
                        CompleteMaintenanceFragment(footer, this.state, this.onChange, this.onHide) : ""}
                    {this.state.target === "maint-assign-btn" ?
                        AssignMaintenanceFragment(footer, this.state, this.props.admins, this.onChange, this.onHide) : ""}
                    {this.state.target === "maint-edit-btn" ?
                        EditMaintenanceFragment(footer, this.state, this.props.admins, this.props.hazards, this.onChange, this.onHide) : ""}
                    {this.state.target === "maint-delete-btn" ?
                        DeleteConfirm("maintenance", this.state.id, this.state.visible, this.onHide, this.props.deleteMaint, this.props.history) : ""}
                </div>
            </React.Fragment>
        )

    }
}