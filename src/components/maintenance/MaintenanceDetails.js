import React, { Component } from "react";
import ResourceManager from "../../modules/ResourceAPIManager"
import { Button } from 'primereact/button';
import CompleteMaintenance from "./CompleteMaintenance"
import CompleteMaintenanceFragment from "./CompleteMaintenanceForm"
import AssignMaintenanceFragment from "./AssignMaintenanceForm"
import Moment from 'react-moment';

export default class MaintenanceDetails extends Component {

    state = {

    }


    componentDidMount() {
        let newState = {}
        ResourceManager.getSingleItem("maintenance_requests", this.props.match.params.maintenanceId)
            .then((request =>

                newState = {
                    mile: request.mile,
                    hazardId: request.hazardId,
                    submittedBy: request.submittedBy,
                    isComplete: request.isComplete,
                    userId: request.userId,
                    okToContact: request.okToContact,
                    phone: request.phone,
                    description: request.description,
                    dateSubmitted: request.dateSubmitted,
                    id: request.id,
                    updatedDescription: (request.isComplete === true ? request.updatedDescription : ""),
                    dateCompleted: (request.isComplete === true ? request.dateCompleted : "")
                })
            )
            .then(() => ResourceManager.getSingleItem("users", newState.userId))
            .then((user) => newState.adminName = user.name)
            .then(() => ResourceManager.getSingleItem("users", newState.submittedBy))
            .then((user) => {
                newState.submitName = user.name
                this.setState(newState)
            }
            )
    }

    constructor() {
        super();
        this.state = {
            visible: false,
            activeUser: parseInt(sessionStorage.getItem("credentials")),
            dateCompleted: "",
            updatedDescription: "",
            target: ""
        };
        this.onChange = this.onChange.bind(this);
        this.completeMaint = this.completeMaint.bind(this)
        this.onHide = this.onHide.bind(this);
    }

    onHide(event) {
        this.setState({ visible: false });
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
        this.props.patchMaint("maintenance_requests", maintId, maintObject)
        this.props.history.push("/maintenance")


    }

    assignMaint() {

        console.log("inside assign maint")
    }

    render() {
        const footer = (
            <div>
                <Button label="Submit" className="p-button-success" icon="pi pi-check"
                    onClick={() => {
                        this.onHide()
                        this.state.target === "maint-complete-btn" ? this.completeMaint() : this.assignMaint()
                    }}
                />
            </div>
        )




        return (
            <React.Fragment>
                <h2>Request Details</h2>
                <div className={this.state.isComplete ? "request-details-complete" : "request-details"}>

                    <p>mile: {" " + this.state.mile}</p>
                    <p> Submitted:{" "} <Moment format="MM/DD/YY">{this.state.dateSubmitted}</Moment></p>
                    {this.state.okToContact === true ? <p>Submitted by:{" " + this.state.submitName}<br></br>
                        Contact phone:{" " + this.state.phone}</p> : ""}
                    <p>Description of Problem:{" " + this.state.description}</p>

                    {this.state.isComplete === true ? <p>Resolution:{" " + this.state.updatedDescription}</p> : ""}

                    {this.state.userId ? <p>Assigned to: {this.state.adminName}</p> : <p>unassigned</p>}
                    {this.state.isComplete ? <h3>Completed:{" "}<Moment format="MM/DD/YY">{this.state.dateCompleted}</Moment> </h3> : ""}
                    <div>
                        <Button label={this.state.userId ? "Reassign" : "Assign"}

                            icon="pi pi-user-plus" iconPos="right"
                            id="maint-assign-btn"
                            className="p-button-raised p-button-rounded"
                            onClick={(e) => {
                                console.log("you clicked", e.currentTarget.id)
                                this.setState({ visible: true, target: e.currentTarget.id })
                            }}>
                        </Button>
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
                    </div>

                </div>
                <div>
                    {this.state.target === "maint-complete-btn" ?
                        CompleteMaintenanceFragment(footer, this.state, this.onChange, this.onHide) : ""}
                        {this.state.target === "maint-assign-btn" ?
                        AssignMaintenanceFragment(footer, this.state, this.onChange, this.onHide) : ""}
                </div>
            </React.Fragment>
        )

    }
}