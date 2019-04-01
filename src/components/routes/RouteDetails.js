import React, { Component } from "react";
import Moment from 'react-moment';
import "./Routes.css"
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import CompleteRoutePatch from "./CompleteRoutePatch"
import { Dropdown } from 'primereact/dropdown';
import ResourceManager from "../../modules/ResourceAPIManager"
import MakeNewRoute from "./MakeNewRoute"
import deleteConfirm from "../../modules/DeleteConfirm"
import {InputMask} from 'primereact/inputmask';
import CompleteRouteFragment from "./CompleteRouteForm"

export default class RouteDetails extends Component {

    componentDidMount() {
        ResourceManager.getSingleItem("routes", this.props.match.params.routeId)
            .then(route => {
                this.setState({
                    name: route.name,
                    userId: route.userId,
                    startId: route.startId,
                    endId: route.endId,
                    direction: route.direction,
                    isComplete: route.isComplete,
                    timeToComplete: route.timeToComplete,
                    dateCompleted: route.dateCompleted,
                    id: route.id,
                    date: route.isComplete===true?new Date(route.dateCompleted):"",
                    time: route.timeToComplete
                });
            });
    }

    constructor() {
        super();
        this.state = {
            visible: false,
            activeUser: parseInt(sessionStorage.getItem("credentials")),
            start: null,
            end: null,
            target: "",
            message: ""
        };
        this.onClick = this.onClick.bind(this);
        this.onHide = this.onHide.bind(this);
        this.onChange=this.onChange.bind(this);
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

    onClick(event) {
        this.setState({ visible: true });
    }

    onHide(event) {
        this.setState({ visible: false });
    }

    // this function is called to set the date and time completed
    onChange = (dateOrTime, e)=>
    { this.setState({ [dateOrTime]: e.target.value })}

    completeRoute() {
        const routeId = this.state.id
        const patchObject = CompleteRoutePatch(this.state)
        this.props.patchRoute("routes", routeId, patchObject, this.state.activeUser)
    }

    // this function is called to make a new route
    handleSubmit() {
        const thingReturned = MakeNewRoute(this.state)
        const message = thingReturned[0]
        const newRoute = thingReturned[1]
        newRoute.id = this.state.id

        console.log(newRoute)
        this.setState({ message: message })
        newRoute.name ? this.props.editRoute("routes", newRoute, this.state.userId) : console.log("no route")
    }


    editRouteFragment(footer) {
        const start = [
            { name: 'Wildcat Hollow', code: '1' },
            { name: 'Blue Sulphur Rd', code: '2' },
            { name: 'Camp Arrowhead', code: '3' },
            { name: 'Howells Mill', code: '4' },
            { name: 'Canaan Lands', code: '5' }
        ];

        const end = [
            { name: 'Wildcat Hollow', code: '1' },
            { name: 'Blue Sulphur Rd', code: '2' },
            { name: 'Camp Arrowhead', code: '3' },
            { name: 'Howells Mill', code: '4' },
            { name: 'Canaan Lands', code: '5' }
        ];

        return (
            <React.Fragment>
                <Dialog header="Edit Start and End Points" visible={this.state.visible} style={{ width: '50vw' }} footer={footer} onHide={this.onHide} >

                    <div className="exp-dd-cont">
                        <Dropdown className="exp-dd" value={this.state.start} options={start} onChange={this.onStartChange} style={{ width: '200px' }} placeholder="Select a Start Point" optionLabel="name" />
                        <Dropdown className="exp-dd" value={this.state.end} options={end} onChange={this.onEndChange} style={{ width: '200px' }} placeholder="Select an End Point" optionLabel="name" />
                    </div>
                </Dialog>


            </React.Fragment>
        )
    }

    render() {
        const footer = (
            <div>
                <Button type = "submit" label="Submit" className="p-button-success" icon="pi pi-check"
                    onClick={() => {

                        this.onHide()
                        this.state.target === "complete-route" ? this.completeRoute() : this.handleSubmit()
                    }}
                />
            </div>
        )



        /*
                   Using the route parameter, find the route that the
                   user clicked on by looking at the `this.props.routes`
                   collection that was passed down from ApplicationViews
               */
        const route = this.props.routes.find(a => a.id === parseInt(this.props.match.params.routeId)) || {}
        const routeDate = <Moment format="MM/DD/YY">{route.dateCompleted}</Moment>

        return (<React.Fragment>
            <div className="route-card-header">
                {(route.direction === true ?
                    <img src={window.location.origin + "/images/west_east.jpg"} height="80px" className="route-marker" /> :
                    <img src={window.location.origin + "/images/east_west.jpg"} height="80px" className="route-marker" />
                )}
                <span className="route-name-details-header">{route.name}</span>
            </div>
            <div className="details-body-container">
                <div className="route-details-img-cont">
                    <img src={window.location.origin + "/images/section_map.jpg"} height="400px" className="exp-map" />
                </div>

                <div className="route-text-detail-cont">
                    {(route.isComplete === true ?
                        <React.Fragment>
                            <p className="route-detail-text">Date Completed: {routeDate}</p>
                            <p className="route-detail-text">Time to Complete: {route.timeToComplete}</p>
                        </React.Fragment> : "")}
                    <p className="route-detail-text">Elevation Gain: </p>
                    <p className="route-detail-text">Mileage: </p>
                    <p className="route-detail-text">Hazards: </p>
                    <p className="route-detail-text">Features: </p>
                </div>


            </div>


            <div className="route-details-btn-cont">

                <Button label={route.isComplete === false ? "Complete" : "Edit"}
                    icon={(route.isComplete === false ? "pi pi-check" : "pi pi-pencil")}
                    id="complete-route"
                    iconPos="right"
                    className={(route.isComplete === false ? "p-button-raised p-button-rounded p-button-success" :
                        "p-button-raised p-button-rounded p-button-primary")}
                    onClick={(e) => this.setState({
                        visible: true,
                        target: e.currentTarget.id,
                    })} />


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




            {(this.state.target === "complete-route" ?
                CompleteRouteFragment(footer, this.state, this.onChange, this.onHide ) : "")}

            {(this.state.target === "edit-route-detail" ?
                this.editRouteFragment(footer) : "")}

            {(this.state.target === "delete-route" ?
                deleteConfirm("routes", this.state.id, this.state.userId, this.state.visible, this.onHide, this.props.deleteRoute, this.props.history) : "")}




        </React.Fragment>)





    }
}


