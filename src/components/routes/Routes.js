import React, { Component } from "react";
import Moment from 'react-moment';
import "./Routes.css"
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';



export default class Routes extends Component {

    // construct the initial conditions of the state
    constructor() {
        super();
        this.state = {
            visible: false,
            activeUser: parseInt(sessionStorage.getItem("credentials")),
            date: "",
            time: "",
            currentRoute: {}
        };
        this.onClick = this.onClick.bind(this);
        this.onHide = this.onHide.bind(this);
    }
    onClick(event) {
        this.setState({ visible: true });
    }

    onHide(event) {
        this.setState({ visible: false });
    }

    completeRoute() {
        const routeId = this.state.currentRoute.id
        const patchObject = {
            isComplete: true,
            timeToComplete: this.state.time,
            dateCompleted: this.state.date
        }

        this.props.patchRoute("routes", routeId, patchObject, this.state.activeUser)
    }

    reverseRoute(route) {
        const routeId = route.id
        const name = route.name
        // split the name to reverse which trailhead name comes first
        const splitName = name.split(" to ")
        const newName = `${splitName[1]} to ${splitName[0]}`

        // build the patch object with reversed start and end points and reversed name
        const patchObject = {
            name: newName,
            direction: (route.direction === true ? route.direction = false : route.direction = true),
            startId: route.endId,
            endId: route.startId
        }
        this.props.patchRoute("routes", routeId, patchObject, this.state.activeUser)
    }

    buildRouteCards(status) {
        return (
            <React.Fragment>

                {
                    this.props.routes.filter((route) => route.isComplete === status).map((route) =>

                        <div className="route-card-cont">
                            <div className="route-card-header">
                                <h4 className="route-name-header">{route.name}</h4>
                            </div>
                            <div className="route-img-cont">

                                {(route.direction === true ?
                                    <img src={window.location.origin + "/images/west_east.jpg"} height="100px" className="exp-map" /> :
                                    <img src={window.location.origin + "/images/east_west.jpg"} height="100px" className="exp-map" />
                                )}

                                <img src={window.location.origin + "/images/section_map.jpg"} height="100px" className="exp-map" />
                            </div>
                            {(route.isComplete === true ?
                                <div className="route-text-cont">
                                    <div className="date-time">Date Completed: {<Moment format="MM/DD/YY">
                                    {route.dateCompleted}</Moment>}</div>
                                    <div className="date-time">Time to Complete: {route.timeToComplete}</div></div>
                                :
                                <div className="route-text-cont">
                                    Some sample text</div>)}

                            {(route.isComplete === false ? <div className="route-btn-cont">
                                <Button label="Reverse"
                                    icon="pi pi-refresh" iconPos="right"
                                    className="p-button-raised p-button-rounded p-button-warning"
                                    onClick={() => {
                                        this.reverseRoute(route)
                                    }} />

                                <Button label="Complete" icon="pi pi-check"
                                    iconPos="right"
                                    className="p-button-raised p-button-rounded p-button-success"
                                    onClick={(e) => this.setState({
                                        visible: true,
                                        currentRoute: route
                                    })} />
                            </div> : "")}
                            <div className="route-btn-cont">

                                <Button label="Details" icon="pi pi-pencil"
                                    iconPos="right"
                                    className="p-button-raised p-button-rounded p-button-primary"
                                    onClick={() => { }} />
                                <Button label="Delete"
                                    icon="pi pi-trash" iconPos="right"
                                    className="p-button-raised p-button-rounded p-button-danger"
                                    onClick={() => {
                                        this.props.deleteRoute("routes", route.id, this.state.activeUser)
                                    }} />
                            </div>
                        </div>
                    )}

            </React.Fragment>
        )
    }

    render() {
        const footer = (
            <div>
                <Button label="Record" className="p-button-success" icon="pi pi-check"
                    onClick={() => {
                        this.onHide()
                        this.completeRoute()
                    }}
                />
            </div>
        )

        return (
            <React.Fragment>

                <div className="route-cont">
                    <div className="plan-route-cont"><h2 className="route-cont-header">Planned Routes</h2>
                        {this.buildRouteCards(false)}
                    </div>
                    <div className="comp-route-cont"><h2 className="route-cont-header">Completed Routes</h2>
                        {this.buildRouteCards(true)}
                    </div>

                </div>
                <Dialog header="Route Completed" visible={this.state.visible} style={{ width: '50vw' }} footer={footer} onHide={this.onHide} >
                    <div>Date Completed:
                    <Calendar value={this.state.date} onChange={(e) => this.setState({ date: e.value })} placeholder="MM/DD/YY"></Calendar>                    </div>
                    <div>
                        Time to Complete:
                <InputText value={this.state.time} onChange={(e) => this.setState({ time: e.target.value })} placeholder="HH:MM:SS" />
                    </div>
                </Dialog>
            </React.Fragment>

        )
    }
}