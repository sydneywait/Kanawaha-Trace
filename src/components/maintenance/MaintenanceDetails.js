import React, { Component } from "react";
import ResourceManager from "../../modules/ResourceAPIManager"
import { Button } from 'primereact/button';
import CompleteMaintenance from "./CompleteMaintenance"
import CompleteMaintenanceFragment from "./CompleteMaintenanceForm"

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
                    id: request.id,
                    updatedDescription: (request.isComplete === true ? request.updatedDescription : "")
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
            date: "",
            updatedDescription: "",
            target:""
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
        const maintObject = CompleteMaintenance(this.state.updatedDescription, this.state.date)
        // patch the maintenance_request with the submitted information
        this.props.patchMaint("maintenance_requests", maintId, maintObject)


    }

    assignMaint(){

        console.log("inside assign maint")
    }

    render() {
        const footer = (
            <div>
                <Button label="Submit" className="p-button-success" icon="pi pi-check"
                    onClick={() => {
                        this.onHide()
                        this.state.target==="maint-complete-btn"?this.completeMaint():this.assignMaint()
                    }}
                />
            </div>
        )




        return (
            <React.Fragment>
            <div><h1>this is the maintenance details page</h1>
                <p>mile: {" " + this.state.mile}</p>

                {this.state.isComplete === true ? <p>{this.state.updatedDescription}</p> : ""}
                {this.state.okToContact === true ? <p>Submitted by:{" " + this.state.submitName}<br></br>
                    Contact phone:{" " + this.state.phone}</p> : ""}
                <p>Description of Problem:{" " + this.state.description}</p>

                {this.state.userId ? <p>Assigned to: {this.state.adminName}</p> : <p>unassigned</p>}
                <div>
                    <Button label="Assign"
                        icon="pi pi-user-plus" iconPos="right"
                        id="maint-assign-btn"
                        className="p-button-raised p-button-rounded"
                        onClick={(e)=>{
                            console.log("you clicked",e.currentTarget.id)
                            this.setState({visible:true, target:e.currentTarget.id})
                            }}>
                    </Button>
                    <Button label="Complete"
                        icon="pi pi-check" iconPos="right"
                        id="maint-complete-btn"
                        className="p-button-raised p-button-rounded p-button-success"
                        onClick={(e)=>{

                            console.log("you clicked",e.currentTarget.id)
                            this.setState({visible:true, target:e.currentTarget.id})

                        }}
                        >
                    </Button>
                </div>

            </div>
            <div>
                {this.state.target==="maint-complete-btn"?
                CompleteMaintenanceFragment(footer, this.state, this.onChange, this.onHide):""}
            </div>
            </React.Fragment>
        )

    }
}