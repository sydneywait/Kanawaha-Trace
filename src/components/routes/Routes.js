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
        this.onClick = this.onClick.bind(this);
        this.onHide = this.onHide.bind(this);
    }
    onClick(event) {
        this.setState({ visible: true });
    }

    onHide(event) {
        this.setState({ visible: false });
    }

    // this function is called to set the date and time completed
    onChange = (dateOrTime, e) => { this.setState({ [dateOrTime]: e.target.value }) }

    completeRoute() {
        const routeId = this.state.currentRoute.id
        const patchObject = CompleteRoutePatch(this.state)
        this.props.patchRoute("routes", routeId, patchObject, this.state.activeUser)
    }

    reverseRoute(route) {
        const routeId = route.id
        const patchObject = ReverseRoutePatch(route)
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

                            {(route.isComplete === false ?
                                <div className="route-btn-cont">
                                    <Button label="Reverse"
                                        icon="pi pi-refresh" iconPos="right"
                                        className="p-button-raised p-button-rounded p-button-warning"
                                        onClick={() => {
                                            this.reverseRoute(route)
                                        }} />

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
        const footer = (
            <div>
                <Button label="Submit" className="p-button-success" icon="pi pi-check"
                    onClick={() => {
                        if(this.state.date!==""&&/^([0-1]?\d|2[0-3]):([0-5]?\d):([0-5]?\d)$/.test(this.state.time)){
                        this.onHide()
                        this.completeRoute()
                    }
                    else{
                        console.log("try again")
                    }
                    }}
                />
            </div>
        )

        return (
            <React.Fragment>

                <div className="route-cont">
                    <div className="plan-route-cont"><h2 className="route-cont-header">Planned Routes</h2>
                        <div className="plan-card-cont">{this.buildRouteCards(false)}</div>
                    </div>

                    <div className="comp-route-cont">
                        <h2 className="route-cont-header">Completed Routes</h2>
                        <div className="comp-card-cont">{this.buildRouteCards(true)}</div>
                    </div>

                </div>
                {(this.state.target === "delete-route" ?
                    deleteConfirm("routes", this.state.currentRoute.id, this.state.currentRoute.userId, this.state.visible, this.onHide, this.props.deleteRoute, this.props.history) : "")}

                {(this.state.target === "complete-route" ?
                    CompleteRouteFragment(footer, this.state, this.onChange, this.onHide) : "")}

            </React.Fragment>

        )
    }
}