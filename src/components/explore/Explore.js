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

export default class Explore extends Component {
    constructor() {
        super();
        this.state = {
            start: null,
            end: null,
            message: "",
            userId: parseInt(sessionStorage.getItem("credentials"))

        };

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

    // this function is called when the submit button is clicked
    handleSubmit() {
        const newRoute = MakeNewRoute(this.state)
        const newState= {
            message:newRoute[0],
            start:null,
            end:null
        }

// Make sure the new route was actually created and add it to the database
        newRoute[1].name ?
        ResourceAPIManager.addNewItem("routes", newRoute[1], this.state.userId)
        .then(thing=>{
            // add the id of the new route to state so the LINK that is rendered knows where to go
            newState.newRouteId=thing.id

            // update the state in application views to ensure the user has access to all of their routes
            this.props.updateRoutes("routes", parseInt(sessionStorage.getItem("credentials")))

            // update the state in this page
            this.setState(newState)}
            )
        : this.setState(newState)



    }


    render() {
        // These are used as options in the dropdown select
        // Eventually these constants will be populated with info from the database

        const options=this.props.waypoints.filter(h => h.isAccess === true).map(h => h)

        return (

            <div className="exp-page-cont">
                <div className="exp-title">Build A Route</div>
                <div className="exp-cont content-section implementation">

                    <div className="exp-left">

                        <div className="exp-dd-cont">
                            <div><Dropdown className="exp-dd"
                                value={this.state.start}
                                options={options}
                                onChange={this.onStartChange}
                                style={{ width: '300px' }} placeholder="Select a Start Point" optionLabel="name" />
                            </div>
                            <div className="exp-dd-foot">{this.state.start ? 'Selected start: ' + this.state.start.name : 'No start point selected'}</div>
                            <div><Dropdown className="exp-dd" value={this.state.end}
                                options={options}
                                onChange={this.onEndChange}
                                style={{ width: '300px' }} placeholder="Select an End Point" optionLabel="name" /></div>
                            <div className="exp-dd-foot">{this.state.end ? 'Selected end: ' + this.state.end.name : 'No end point selected'}</div>

                        </div>



                        <div className="exp-dd-submit-btn-cont"><div className="exp-dd-submit-btn"><Button className="p-button-rounded" label="submit" icon="pi pi-check" iconPos="right" onClick={this.handleSubmit} /></div>
                        <div className="exp-msg">{this.state.message}</div></div>

                        {this.state.message==="Your route was created!"?
                        <React.Fragment><div><Link to={`/routes/${this.state.newRouteId}`}>Click to see your new Route</Link></div>
                        <div><Link to= "/routes">Click to see all Routes</Link></div>
                        </React.Fragment>:""}
                    </div>
                    <div className="exp-right">
                        <Map waypoints={this.props.waypoints}/>

                    </div>
                </div>
            </div>


        );
    }
}

