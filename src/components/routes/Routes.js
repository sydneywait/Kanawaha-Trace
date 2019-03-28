import React, { Component } from "react";
import "./Routes.css"
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';







export default class Routes extends Component {


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

    buildRouteCards(status) {

        // this.props.map((route)=>console.log("route", route))

        return (
            <React.Fragment>

                {

                    this.props.routes.filter((route)=>route.isComplete===status).map((route) =>

                        <div className="route-card-cont">
                            <div className="route-card-header">
                                <h3>{route.name}</h3>
                            </div>
                            <div className="route-img-cont">

                                {(route.direction === true ?
                                    <img src={window.location.origin + "/images/west_east.jpg"} height="100px" className="exp-map" /> :
                                    <img src={window.location.origin + "/images/east_west.jpg"} height="100px" className="exp-map" />
                                )}

                                <img src={window.location.origin + "/images/section_map.jpg"} height="100px" className="exp-map" />
                            </div>
                            <div className="route-text-cont"></div>
                            <div className="route-btn-cont-top">
                                <Button label="Details" icon="pi pi-pencil"
                                    iconPos="right"
                                    className="p-button-raised p-button-rounded p-button-primary"
                                    onClick={() => { }} />

                                <Button label="Complete" icon="pi pi-check"
                                    iconPos="right"
                                    className="p-button-raised p-button-rounded p-button-success"
                                    onClick={(e) => this.setState({
                                        visible: true,
                                        currentRoute: route
                                    })} />
                            </div>
                            <div className="route-btn-cont-top">
                                <Button label="Reverse"
                                    icon="pi pi-refresh" iconPos="right"
                                    className="p-button-raised p-button-rounded p-button-warning"
                                    onClick={() => { }} />

                                <Button label="Delete"
                                    icon="pi pi-trash" iconPos="right"
                                    className="p-button-raised p-button-rounded p-button-danger"
                                    onClick={() => {
                                        this.props.deleteRoute("routes", route.id, this.state.activeUser)
                                        this.props.history.push("/routes")
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
                    <div className="plan-route-cont"><h2>Planned Routes</h2>
                        {this.buildRouteCards(true)}
                    </div>
                    <div className="comp-route-cont"><h2>Completed Routes</h2>
                        {this.buildRouteCards(false)}
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