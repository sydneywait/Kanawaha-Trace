import React, { Component } from "react";
import Moment from 'react-moment';
import "./Routes.css"
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';

export default class RouteDetails extends Component {


    render() {
        /*
                   Using the route parameter, find the route that the
                   user clicked on by looking at the `this.props.routes`
                   collection that was passed down from ApplicationViews
               */
        const route = this.props.routes.find(a => a.id === parseInt(this.props.match.params.routeId)) || {}


        return (<React.Fragment>
            <div className="route-card-header">
                {(route.direction === true ?
                    <img src={window.location.origin + "/images/west_east.jpg"} height="80px" className="exp-map" /> :
                    <img src={window.location.origin + "/images/east_west.jpg"} height="80px" className="exp-map" />
                )}
                <span className="route-name-details-header">{route.name}</span>
            </div>
            <div className="route-img-cont">
                <img src={window.location.origin + "/images/section_map.jpg"} height="400px" className="exp-map" />
            </div>
            {(route.isComplete === true ?
                <div className="route-text-detail-cont">
                    <p className="route-detail-text">Date Completed: {<Moment format="MM/DD/YY">
                        {route.dateCompleted}</Moment>}</p>
                    <p className="route-detail-text">Time to Complete: {route.timeToComplete}</p>
                    <p className="route-detail-text">Elevation Gain: </p>
                    <p className="route-detail-text">Mileage: </p>
                    <p className="route-detail-text">Hazards: </p>
                    <p className="route-detail-text">Features: </p>
                </div>
                :
                <div className="route-text-detail-cont">
                    Some sample text</div>)}


            <div className="route-btn-cont">
                {(route.isComplete === false ? <Button label="Complete" icon="pi pi-check"
                    iconPos="right"
                    className="p-button-raised p-button-rounded p-button-success"
                    onClick={(e) => this.setState({
                        visible: true,
                        currentRoute: route
                    })} /> : "")}
                <Button label="Edit" icon="pi pi-pencil"
                    iconPos="right"
                    className="p-button-raised p-button-rounded p-button-primary"
                    onClick={(e) => this.setState({
                        visible: true,
                        currentRoute: route
                    })} />
                <Button label="Delete"
                    icon="pi pi-trash" iconPos="right"
                    className="p-button-raised p-button-rounded p-button-danger"
                    onClick={() => {
                        this.props.deleteRoute("routes", route.id, this.state.activeUser)
                    }} />
            </div>



        </React.Fragment>)





    }
}


