import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import "./Routes.css"
import { Button } from 'primereact/button';
import CompleteRoutePatch from "./CompleteRoutePatch"
import ResourceManager from "../../modules/ResourceAPIManager"
import MakeNewRoute from "./MakeNewRoute"
import deleteConfirm from "../../modules/DeleteConfirm"
import CompleteRouteFragment from "./CompleteRouteForm"
import SelectRoutePoints from "./SelectRoutePoints"
import MapDetail from "../../modules/MapDetail"

export default class RouteDetails extends Component {

    componentDidMount() {
        this.updateComponent(this.props)
    }

    // This functions is called to update this component when any changes are made to this route
    // It causes the page to re-render
    updateComponent(props) {
        let newState = {}
        ResourceManager.getSingleItem("routes", props.match.params.routeId)
            .then(route => {
                newState = {
                    name: route.name,
                    userId: route.userId,
                    startId: route.startId,
                    endId: route.endId,
                    direction: route.direction,
                    isComplete: route.isComplete,
                    timeToComplete: route.timeToComplete,
                    dateCompleted: route.dateCompleted,
                    id: route.id,
                    date: route.isComplete === true ? new Date(route.dateCompleted) : "",
                    time: route.timeToComplete
                }
            })
            .then(() => ResourceManager.getSingleItem("waypoints", newState.startId))
            .then((start) => newState.start = start)
            .then(() => ResourceManager.getSingleItem("waypoints", newState.endId))
            .then((end) => {
                newState.end = end
                this.setState(newState)
            }
            )
    }
    constructor() {
        super();
        this.state = {
            visible: false,
            activeUser: parseInt(sessionStorage.getItem("credentials")),
            start: { name: "", id: "" },
            end: { name: "", id: "" },
            target: "",
            message: "",
            startId: "",
            endId: "",



        };
        // bind functions to this component
        this.onClick = this.onClick.bind(this);
        this.onHide = this.onHide.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onStartChange = this.onStartChange.bind(this);
        this.onEndChange = this.onEndChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // these functions are called as the dropdown select changes
    onStartChange(e) {
        this.setState({ start: e.value });
    }

    onEndChange(e) {
        this.setState({ end: e.value });
    }


    // these functions are called to hide and unhide modals

    onClick() {
        this.setState({ visible: true });
    }

    onHide() {
        this.setState({ visible: false });
    }

    // this function is called to set or change the date and time completed
    onChange = (dateOrTime, e) => { this.setState({ [dateOrTime]: e.target.value }) }

    completeRoute() {
        const routeId = this.state.id
        const patchObject = CompleteRoutePatch(this.state)
        this.setState({
            isComplete: patchObject.isComplete,
            timeToComplete: patchObject.timeToComplete,
            dateCompleted: patchObject.dateCompleted,
            message: null
        })
        this.props.patchRoute("routes", routeId, patchObject, this.state.activeUser)
    }

    // this function is called to make a new route object based on the edit of start and end points
    handleSubmit() {
        const thingReturned = MakeNewRoute(this.state)
        // If the route cannot be created, it returns an error message and an empty object
        // If the route is created, it returns and object and an empty error message
        const message = thingReturned[0]
        const newRoute = thingReturned[1]
        newRoute.id = this.state.id

        console.log(newRoute)
        this.setState(
            {
                message: message,
                startId: newRoute.startId,
                endId: newRoute.endId
            })
        // Check if the route was created.  If so, edit the route
        newRoute.name ? this.props.editRoute("routes", newRoute, this.state.userId) : console.log("no route")
        // Used to cause the map to mount again.  Map is built when the map component mounts (not render)
        window.location.reload(false)
    }



    render() {
        // this is the footer for the modal that pops up when user clicks edit or complete
        const footer = (
            <div>
                <Button type="submit" id="footer-submit" label="Submit" className="p-button-success" icon="pi pi-check"
                    onClick={(e) => {
                        // check to see which button was clicked.
                        if (this.state.target === "complete-route") {
                            // Make sure form fields are filled out correctly before executing submit

                            if (this.state.date !== ""
                                && /^([0-1]?\d|2[0-3]):([0-5]?\d):([0-5]?\d)$/.test(this.state.time)) {
                                this.onHide()
                                this.completeRoute()
                                this.setState({ target: e.currentTarget.id })
                            }
                            // Otherwise, set an error message according to which button was clicked

                            else {
                                this.setState({ message: "All fields must be completed correctly" })
                            }
                        }
                        // check to see which button was clicked.
                        if (this.state.target === "edit-route-detail") {
                            // Make sure start and end point do not match before executing submit
                            if (this.state.start.id !== this.state.end.id) {
                                this.onHide()
                                this.handleSubmit()
                                this.setState({ target: e.currentTarget.id })
                            }
                            // Otherwise, set an error message according to which button was clicked
                            else {
                                this.setState({ message: "Start and end points cannot be the same!" })
                            }
                        }

                    }}
                />
            </div>
        )



        /*
                   Using the route parameter, find the route that the
                   user clicked on by looking at the `this.props.routes`
                   collection that was passed down from ApplicationViews
        */
        //    Find the route that matches this route
        const route = this.props.routes.find(a => a.id === parseInt(this.props.match.params.routeId)) || {}

        // Find the start and end points and calculate the mileage difference
        const start = this.props.waypoints.find(a => a.id === this.state.startId) || { mile: "" }
        const end = this.props.waypoints.find(a => a.id === this.state.endId) || { mile: "" }
        const diff = start.mile - end.mile


        return (<React.Fragment>
            <div className="route-details-header">
                {/* insert trail marker picture based on the direction of travel */}
                {(route.direction === true ?
                    <img src={window.location.origin + "/images/west_east.jpg"} height="80px" className="route-marker" /> :
                    <img src={window.location.origin + "/images/east_west.jpg"} height="80px" className="route-marker" />
                )}
                <span className="route-name-details-header">{route.name}</span>
            </div>
            <div className="details-body-container">

                <div className="route-details-img-cont">
                    {/* this renders the map detail component */}
                    <MapDetail
                        routeId={this.props.match.params.routeId}
                        waypoints={this.props.waypoints}
                        start={this.state.start}
                        end={this.state.end}
                        updateComponent={this.updateComponent} />
                </div>
                {/* give information about the route such as length and any hazards or features */}
                <div className="route-text-detail-cont">
                    {(route.isComplete === true ?
                        <React.Fragment>
                            <p className="route-detail-text"><span className="route-detail-subheadings">Date Completed:</span> {<Moment format="MM/DD/YY">{this.state.dateCompleted}</Moment>}</p>
                            <p className="route-detail-text"><span className="route-detail-subheadings">Time to Complete:</span> {this.state.timeToComplete}</p>
                        </React.Fragment> : "")}
                    {/* <p className="route-detail-text"><span className="route-detail-subheadings">Elevation Gain:</span> </p> */}
                    <p className="route-detail-text"><span className="route-detail-subheadings">Mileage:</span> {Math.abs(diff).toFixed(2)} miles</p>
                    <p className="route-detail-text"><span className="route-detail-subheadings">Description:</span>
                        <ul>{this.props.waypoints.filter(w => w.mile >= (start.mile < end.mile ? start.mile : end.mile) && w.mile <= (start.mile < end.mile ? end.mile : start.mile)).sort((a, b) => a.mile - b.mile).map((w) =>
                            (w.description !== "" ? <li className="route-detail-bullets"><span className="route-detail-mile">Mile {w.mile}:</span> {w.description}</li> : ""))
                        }</ul></p>


                </div>


            </div>


            <div className="route-details-btn-cont">
                {/* Render the buttons conditionally if route is complete or not */}
                {/* If route is not complete, user can mark as complete */}
                {/* If route is complete, user can edit the date/time completed */}
                <Button label={route.isComplete === false ? "Complete" : "Edit Date/Time"}
                    icon={(route.isComplete === false ? "pi pi-check" : "pi pi-pencil")}
                    id="complete-route"
                    iconPos="right"
                    className={(route.isComplete === false ? "p-button-raised p-button-rounded p-button-success" :
                        "p-button-raised p-button-rounded p-button-primary")}
                    onClick={(e) => this.setState({
                        visible: true,
                        target: e.currentTarget.id,
                    })} />

                {/* Render the buttons conditionally if route is complete or not */}
                {/* If route is not complete, user can edit start and end points */}
                {/* If route is complete, user cannot edit start and end points, only date and time (see above) */}

                {route.isComplete === false ? <Button label="Edit" icon="pi pi-pencil"
                    id="edit-route-detail"
                    iconPos="right"
                    className="p-button-raised p-button-rounded p-button-primary"
                    onClick={(e) =>
                        this.setState({
                            visible: true,
                            target: e.currentTarget.id,
                        })
                    } /> : ""}
                <Button label="Delete"
                    id="delete-route"
                    icon="pi pi-trash" iconPos="right"
                    className="p-button-raised p-button-rounded p-button-danger"
                    onClick={(e) => {
                        this.setState({
                            visible: true,
                            target: e.currentTarget.id,
                        })
                    }} />
            </div>

            <i class="pi pi-chevron-left"></i>

            {/* Link to return to the routes page */}
            <Link className="back-to-routes" to={"/routes"}>Back to Route List</Link>


            {/* these logic operations will engage the modal pop-ups based on which button is clicked */}

            {(this.state.target === "complete-route" ?
                CompleteRouteFragment(footer, this.state, this.onChange, this.onHide) : "")}

            {(this.state.target === "edit-route-detail" ?
                SelectRoutePoints(footer, this.state, this.props, this.onStartChange, this.onEndChange, this.onHide) : "")}

            {(this.state.target === "delete-route" ?
                deleteConfirm("routes", this.state.id, this.state.visible, this.onHide, this.props.deleteRoute, this.props.history, this.state.userId) : "")}


        </React.Fragment>)

    }
}


