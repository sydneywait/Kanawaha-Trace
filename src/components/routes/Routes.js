import React, { Component } from "react";
import "./Routes.css"
import { Button } from 'primereact/button';








export default class Routes extends Component {

    buildRouteCards() {

        return (
            <React.Fragment>

                {
                    this.props.routes.map((route) =>
                        <div className="route-card-cont">
                            <div className="route-card-header">
                                <h3>{route.name}</h3>
                            </div>
                            <div className="route-img-cont">

                                {(route.direction===true?
                                <img src={window.location.origin + "/images/west_east.jpg"} height="100px" className="exp-map" />:
                                <img src={window.location.origin + "/images/east_west.jpg"} height="100px" className="exp-map" />
                                )}

                                <img src={window.location.origin + "/images/section_map.jpg"} height="100px" className="exp-map" />
                            </div>
                            <div className="route-text-cont"></div>
                            <div className="route-btn-cont-top">
                                <Button label="Edit" icon="pi pi-pencil" iconPos="right" className="p-button-raised p-button-rounded p-button-success" />
                                <Button label="Complete" icon="pi pi-check" iconPos="right" className="p-button-raised p-button-rounded p-button-success" />
                            </div>
                            <div className="route-btn-cont-top">
                                <Button label="Reverse" icon="pi pi-refresh" iconPos="right" className="p-button-raised p-button-rounded p-button-warning" />
                                <Button label="Delete" icon="pi pi-trash" iconPos="right" className="p-button-raised p-button-rounded p-button-danger" />

                            </div>


                        </div>
                    )}






            </React.Fragment>



        )

    }

    render() {
        return (
            <React.Fragment>
                <div className="route-cont">
                    <div className="plan-route-cont"><h2>Planned Routes</h2>
                        {this.buildRouteCards()}
                    </div>
                    <div className="comp-route-cont"><h2>Completed Routes</h2></div>

                </div>
            </React.Fragment>
        )
    }
}