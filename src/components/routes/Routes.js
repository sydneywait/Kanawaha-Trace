import React, { Component } from "react";
import Moment from 'react-moment';
import "./Routes.css"
import { Button } from 'primereact/button';
import CompleteRoutePatch from "./CompleteRoutePatch"
import CompleteRouteFragment from "./CompleteRouteForm"
import ReverseRoutePatch from "./ReverseRoutePatch"
import deleteConfirm from "../../modules/DeleteConfirm"




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
    }

    // These functions handle the visibility of the modal/pop-ups
    onClick(event) {
        this.setState({ visible: true });
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


    // Function used to build the route cards for each view (completed/not completed)
    buildRouteCards(status) {
        return (
            <React.Fragment>

                {
                    // conditionally create the route cards based on status (isComplete = true or false)
                    this.props.routes.filter((route) => route.isComplete === status).map((route) =>

                        <div className="route-card-cont">
                            <div className="route-card-header">
                                <h4 className="route-name-header">{route.name}</h4>
                            </div>
                            <div className="route-img-cont">
                                {/* Insert the trail marker based on the trail direction */}
                                {(route.direction === true ?
                                    <img src={window.location.origin + "/images/west_east.jpg"} height="100px" className="exp-map" /> :
                                    <img src={window.location.origin + "/images/east_west.jpg"} height="100px" className="exp-map" />
                                )}
                                {/* Insert a placeholder map that shows a section of trail */}
                                <img src={window.location.origin + "/images/section_map.jpg"} height="100px" className="exp-map" />
                            </div>
                            {/* Conditionally render date and time if route is complete */}
                            {(route.isComplete === true ?
                                <div className="route-text-cont">
                                    <div className="date-time">Date Completed: {<Moment format="MM/DD/YY">
                                        {route.dateCompleted}</Moment>}</div>
                                    <div className="date-time">Time to Complete: {route.timeToComplete}</div></div>
                                :
                                <div className="route-text-cont">
                                    </div>)}

                            {/* Conditionally render reverse button if route is not complete */}
                            {(route.isComplete === false ?
                                <div className="route-btn-cont">
                                    <Button label="Reverse"
                                        icon="pi pi-refresh" iconPos="right"
                                        className="p-button-raised p-button-rounded p-button-warning"
                                        onClick={() => {
                                            this.reverseRoute(route)
                                        }} />

                                    {/* Conditionally render complete button if route is not complete */}
                                    <Button label="Complete" icon="pi pi-check"
                                        id="complete-route"
                                        iconPos="right"
                                        className="p-button-raised p-button-rounded p-button-success"
                                        onClick={(e) => this.setState({
                                            visible: true,
                                            currentRoute: route,
                                            target: e.currentTarget.id
                                        })} />
                                </div> : "")}

                            <div className="route-btn-cont">
                                {/* Render details button and delete button regardless of complete or not complete */}
                                <Button label="Details" icon="pi pi-pencil"
                                    iconPos="right"
                                    className="p-button-raised p-button-rounded p-button-primary"
                                    onClick={() => { this.props.history.push(`/routes/${route.id}`) }} />
                                <Button label="Delete"
                                    id="delete-route"
                                    icon="pi pi-trash" iconPos="right"
                                    className="p-button-raised p-button-rounded p-button-danger"
                                    onClick={(e) => this.setState({
                                        visible: true,
                                        currentRoute: route,
                                        target: e.currentTarget.id
                                    })} />
                            </div>
                        </div>
                    )}

            </React.Fragment>
        )
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
                            console.log("try again")
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
                        <div className="plan-card-cont">{this.buildRouteCards(false)}</div>
                    </div>

                    <div className="comp-route-cont">
                        <h2 className="route-cont-header">Completed Routes</h2>
                        <div className="comp-card-cont">{this.buildRouteCards(true)}</div>
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