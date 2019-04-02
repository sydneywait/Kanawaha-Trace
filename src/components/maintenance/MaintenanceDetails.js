import React, { Component } from "react";
import ResourceManager from "../../modules/ResourceAPIManager"

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
            .then((user) =>newState.adminName = user.name)
            .then(() => ResourceManager.getSingleItem("users", newState.submittedBy))
            .then((user) => {
                newState.submitName = user.name
                this.setState(newState)
            }
            )
    }


    render() {




        return (
            <div><h1>this is the maintenance details page</h1>
                <p>mile: {" " + this.state.mile}</p>

                {this.state.isComplete === true ? <p>{this.state.updatedDescription}</p> : ""}
                {this.state.okToContact === true ? <p>Submitted by:{" " + this.state.submitName}<br></br>
                    Contact phone:{" " + this.state.phone}</p> : ""}
                <p>Description of Problem:{" " + this.state.description}</p>

                {this.state.userId ? <p>Assigned to: {this.state.adminName}</p> : <p>unassigned</p>}


            </div>
        )

    }
}