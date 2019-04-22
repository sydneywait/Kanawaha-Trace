import React, { Component } from "react";
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import "./Explore.css"
// import { GMap } from 'primereact/gmap';
// import Snackbar from '@material-ui/core/Snackbar';
import MakeNewRoute from "../routes/MakeNewRoute"
import { Link } from "react-router-dom"
import Map from "../../modules/Map"
import ResourceAPIManager from "../../modules/ResourceAPIManager"
import { InputText } from 'primereact/inputtext';


export default class Explore extends Component {
    constructor() {
        super();
        this.state = {
            start: null,
            end: null,
            message: "",
            userId: parseInt(sessionStorage.getItem("credentials")),
            mileage: "",
            searchTerm: "",
            search: ""

        };
        // Bind functions to this component
        this.onStartChange = this.onStartChange.bind(this);
        this.onEndChange = this.onEndChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.calculateMileage = this.calculateMileage.bind(this);
        this.onChange = this.onChange.bind(this)
    }

    // This function is used to handle input to the search box
    onChange(e) {

        this.setState({ search: e.target.value });
    }
    // these functions are called as the dropdown select changes
    onStartChange(e) {

        this.setState({ start: e.value });
        this.calculateMileage(e.value, this.state.end)
    }

    onEndChange(e) {
        this.setState({ end: e.value });
        this.calculateMileage(this.state.start, e.value)
    }

    calculateMileage(start, end) {
        if (start !== null && end !== null) {

            let mileage = Math.abs(start.mile - end.mile).toFixed(2)
            this.setState({ mileage: mileage })
        }
        else {

        }


    }

    // this function is called when the submit button is clicked
    handleSubmit() {
        // calls function to make a new route object
        const newRoute = MakeNewRoute(this.state)
        const newState = {
            message: newRoute[0],
            start: null,
            end: null
        }

        // Make sure the new route was actually created and add it to the database
        newRoute[1].name ?
            ResourceAPIManager.addNewItem("routes", newRoute[1], this.state.userId)
                .then(thing => {
                    // add the id of the new route to state so the LINK that is rendered will have the correct path
                    newState.newRouteId = thing.id

                    // update the state in ApplicationViews to ensure the user has access to all of their routes
                    this.props.updateRoutes("routes", parseInt(sessionStorage.getItem("credentials")))

                    // update the state in this page
                    this.setState(newState)
                }
                )
            // If the route was not created (there is an error), set state with error message
            : this.setState(newState)



    }


    render() {

        // These options are used to populate the start and end points in the dropdown
        const options = this.props.waypoints.filter(h => h.isAccess === true).map(h => h)

        return (

            <div className="exp-page-cont">
                <div className="exp-title">Build A Route</div>
                <div className="exp-cont content-section implementation">

                    <div className="exp-left">
                    {/* render a searchbar to look for features on the map */}
                    <div className="map-search">
                            <div className="p-inputgroup">
                                <InputText id="map-search" style={{ width: "300px" }}
                                    value={this.state.search}
                                    onChange={this.onChange}
                                    placeholder="search for features on the map" />
                                <Button icon="pi pi-search" className="p-button-primary feature-search-btn"
                                    onClick={(e) => this.setState({ searchTerm: this.state.search })} />
                            </div>
                        </div>
                        <div className="exp-dd-cont">
                        Select a start and end point:
                            {/* dropdown for start points */}
                            <div><Dropdown className="exp-dd"
                                value={this.state.start}
                                options={options}
                                onChange={this.onStartChange}
                                style={{ width: '300px' }} placeholder="Select a Start Point" optionLabel="name" />
                            </div>
                            <div className="exp-dd-foot">{this.state.start ? 'Selected start: ' + this.state.start.name : 'No start point selected'}</div>

                            {/* dropdown for end points */}
                            <div><Dropdown className="exp-dd" value={this.state.end}
                                options={options}
                                onChange={this.onEndChange}
                                style={{ width: '300px' }} placeholder="Select an End Point" optionLabel="name" /></div>
                            <div className="exp-dd-foot">{this.state.end ? 'Selected end: ' + this.state.end.name : 'No end point selected'}</div>
                            <div className="exp-mileage">{(this.state.mileage ? `Selected route is ${this.state.mileage} miles` : "")}</div>
                        </div>



                        <div className="exp-dd-submit-btn-cont"><div className="exp-dd-submit-btn"><Button className="p-button-rounded" label="submit" icon="pi pi-check" iconPos="right" onClick={this.handleSubmit} /></div>
                            {/* Optional error message if route cannot be created */}
                            <div className="exp-msg">{this.state.message}</div></div>



                        {/* Renders conditionally to give user links to their new routes and all routes */}
                        {this.state.message === "Your route was created!" ?
                            <React.Fragment><div><Link to={`/routes/${this.state.newRouteId}`}>Click to see your new Route</Link></div>
                                <div><Link className="link" to="/routes">Click to see all Routes</Link></div>
                            </React.Fragment> : ""}
                    </div>
                    <div className="exp-right">
                        {/* call the map component to render the map */}
                        <Map className="map-cont" waypoints={this.props.waypoints} searchTerm={this.state.searchTerm} />

                    </div>
                </div>
            </div>


        );
    }
}

