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


    componentDidMount() {
        let newState = {}
        // Get the maintenance item the user clicked on
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
                // If the maintenance is assigned to an admin, get that ID
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

        // bind the functions to this component
        this.onChange = this.onChange.bind(this);
        this.completeMaint = this.completeMaint.bind(this)
        this.onHide = this.onHide.bind(this);
    }

    // Handles the visibility of the modal
    onHide() {
        this.setState({
            visible: false,
            warning: ""
        });
    }

    // Handles inputs to any field
    onChange(e) {
        const stateToChange = {}
        stateToChange[e.target.name] = e.target.value
        this.setState(stateToChange)
    }

    // Handles marking the maintenance request as complete
    completeMaint() {
        // get the id of the target maintenance_request object
        const maintId = this.state.id
        // create a patch object from info in popup
        const maintObject = CompleteMaintenance(this.state.updatedDescription, this.state.dateCompleted)
        // patch the maintenance_request with the submitted information
        this.setState({ isComplete: true })
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
        // re-render the page
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
                <div className="maint-details-card">
                    <div className="maint-details-header">Request Details</div>
                    <div className={this.state.isComplete ? "request-details-complete" : "request-details"}>
                        {/* // Details of the maintenance request printed to the DOM */}
                        <p><span className="maint-details-subheading">mile:</span> {" " + this.state.mile}</p>
                        <p><span className="maint-details-subheading">Hazard:</span> {this.state.hazard.type}</p>
                        <p> <span className="maint-details-subheading">Submitted:</span>{" "} <Moment format="MM/DD/YY">{this.state.dateSubmitted}</Moment></p>
                        <p><span className="maint-details-subheading">Submitted by:</span>{" " + this.state.submitName}</p>
                        {this.state.okToContact === true ? <p><span className="maint-details-subheading">Contact phone:</span>{" " + this.state.phone}</p> : ""}
                        <p><span className="maint-details-subheading">Description of Problem:</span>{" " + this.state.description}</p>

                        {this.state.isComplete === true ? <p><span className="maint-details-subheading">Resolution:</span>{" " + this.state.updatedDescription}</p> : ""}

                        <p><span className="maint-details-subheading">Assigned to:</span> {this.state.assigned.name ? this.state.assigned.name : <span className="unassigned">unassigned</span>}</p>
                        {this.state.isComplete ? <p><span className="maint-details-subheading">Completed:</span>{" "}<Moment format="MM/DD/YY">{this.state.dateCompleted}</Moment> </p> : ""}




                    </div>
                    <div className="maint-details-btn-cont">
                        {/* If maintenance is not marked as complete, it can be completed */}
                        {this.state.isComplete === false ? <Button label="Complete"
                            icon="pi pi-check" iconPos="right"
                            id="maint-complete-btn"
                            className="p-button-raised p-button-rounded p-button-success"
                            onClick={(e) => {


                                this.setState({ visible: true, target: e.currentTarget.id })

                            }}
                        >
                        </Button> : ""}

                        {/* If maintenance is not marked as complete, it can be edited */}
                        {this.state.isComplete === false ? <Button label="Edit"
                            icon="pi pi-pencil" iconPos="right"
                            id="maint-edit-btn"
                            className="p-button-raised p-button-rounded p-button-primary"
                            onClick={(e) => {

                                this.setState({ visible: true, target: e.currentTarget.id })

                            }}
                        >
                        </Button> : ""}

                        {/* Complete or incomplete, maintenance can be deleted */}
                        <Button label="Delete"
                            icon="pi pi-times" iconPos="right"
                            id="maint-delete-btn"
                            className="p-button-raised p-button-rounded p-button-danger"
                            onClick={(e) => {

                                this.setState({ visible: true, target: e.currentTarget.id })

                            }}
                        >
                        </Button>
                    </div>
                    <div className="maint-details-back-cont">
                        <i className="pi pi-chevron-left"></i>

                        <Link className="back-to-maint" to={"/maintenance"}>Back to Maintenance List</Link>
                    </div>
                    <div>

                        {/* Handles which modals to show */}
                        {this.state.target === "maint-complete-btn" ?
                            CompleteMaintenanceFragment(footer, this.state, this.onChange, this.onHide) : ""}
                        {this.state.target === "maint-assign-btn" ?
                            AssignMaintenanceFragment(footer, this.state, this.props.admins, this.onChange, this.onHide) : ""}
                        {this.state.target === "maint-edit-btn" ?
                            EditMaintenanceFragment(footer, this.state, this.props.admins, this.props.hazards, this.onChange, this.onHide) : ""}
                        {this.state.target === "maint-delete-btn" ?
                            DeleteConfirm("maintenance", this.state.id, this.state.visible, this.onHide, this.props.deleteMaint, this.props.history) : ""}
                    </div>
                </div>
            </React.Fragment>
        )

    }
}