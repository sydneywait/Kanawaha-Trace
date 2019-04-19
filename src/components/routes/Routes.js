import React, { Component } from "react";
import Moment from 'react-moment';
import "./Routes.css"
import { Button } from 'primereact/button';
import CompleteRoutePatch from "./CompleteRoutePatch"
import CompleteRouteFragment from "./CompleteRouteForm"
import ReverseRoutePatch from "./ReverseRoutePatch"
import deleteConfirm from "../../modules/DeleteConfirm"
import buildRouteCards from "./BuildRouteCards"




export default class Routes extends Component {

    // construct the initial conditions of the state
    constructor() {
        super();
        this.state = {
            visible: false,
            activeUser: parseInt(sessionStorage.getItem("credentials")),
            date: "",
            time: "",
            currentRoute: {},
            target: ""
        };

        // Bind functions to this component
        this.onClick = this.onClick.bind(this);
        this.onHide = this.onHide.bind(this);
        this.reverseRoute=this.reverseRoute.bind(this);
    }

    // These functions handle the visibility of the modal/pop-ups
    onClick(e, route) {
        this.setState({
            visible: true,
            currentRoute: route,
            target: e.currentTarget.id
        })

    }

    onHide(event) {
        this.setState({ visible: false });
    }

    // this function is called to set the date and time completed
    onChange = (dateOrTime, e) => { this.setState({ [dateOrTime]: e.target.value }) }

    // This function is used to mark the route as complete
    completeRoute() {
        // Get the ID of the route to edit
        const routeId = this.state.currentRoute.id
        // Build the patch object
        const patchObject = CompleteRoutePatch(this.state)
        // Send the patch request to the database
        this.props.patchRoute("routes", routeId, patchObject, this.state.activeUser)
    }

    // This function is used to reverse the direction of the route
    reverseRoute(route) {

        const routeId = route.id
        // Build the patch object
        const patchObject = ReverseRoutePatch(route)
        // Send the patch request to the database
        this.props.patchRoute("routes", routeId, patchObject, this.state.activeUser)
    }


       render() {
        // This footer is used for the modal popup to mark route complete
        const footer = (
            <div>
                <Button label="Submit" className="p-button-success" icon="pi pi-check"
                    onClick={() => {
                        // Verifies that the correct format was used in submitting date and time
                        if (this.state.date !== "" && /^([0-1]?\d|2[0-3]):([0-5]?\d):([0-5]?\d)$/.test(this.state.time)) {
                            this.onHide()
                            this.completeRoute()
                        }
                        else {

                        }
                    }}
                />
            </div>
        )

        return (
            <React.Fragment>
                {/* Build two columns (sections) for planned and completed routes */}
                <div className="route-cont">
                    <div className="plan-route-cont"><h2 className="route-cont-header">Planned Routes</h2>
                        <div className="plan-card-cont">{buildRouteCards(false, this.props, this.reverseRoute, this.onClick)}</div>
                    </div>

                    <div className="comp-route-cont">
                        <h2 className="route-cont-header">Completed Routes</h2>
                        <div className="comp-card-cont">{buildRouteCards(true,this.props, this.reverseRoute, this.onClick)}</div>
                    </div>

                </div>
                {/* Controls which modal appears based on the button target--delete confirmation modal */}
                {(this.state.target === "delete-route" ?
                    deleteConfirm("routes", this.state.currentRoute.id, this.state.visible, this.onHide, this.props.deleteRoute, this.props.history, this.state.currentRoute.userId) : "")}
                {/*  Controls which modal appears based on the button target--compelte route modal */}
                {(this.state.target === "complete-route" ?
                    CompleteRouteFragment(footer, this.state, this.onChange, this.onHide) : "")}

            </React.Fragment>

        )
    }
}