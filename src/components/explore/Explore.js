import React, { Component } from "react";
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import "./Explore.css"
// import { GMap } from 'primereact/gmap';
// import Snackbar from '@material-ui/core/Snackbar';



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
        let startSelected = false;
        let endSelected = false;
        // First, make sure they have selected a start and end point
        this.state.start !== null ? startSelected = true : startSelected = false
        this.state.end !== null ? endSelected = true : endSelected = false
        // Next, set constants for working with the function
        if (startSelected === true && endSelected === true) {
            const startId = this.state.start.code
            const endId = this.state.end.code
            //  check to see that the start point and the end point are not the same
            if (startId !== endId) {

                // create an object to post to the database
                const newRoute = {
                    name: `${this.state.start.name} to ${this.state.end.name}`,
                    userId: this.state.userId,
                    startId: parseInt(startId),
                    endId: parseInt(endId),
                    direction: (parseInt(startId) < parseInt(endId) ? true : false),
                    isComplete: false,
                    timeToComplete: "",
                    dateCompleted: ""

                }
                // set a success message to state
                this.setState({ message: "Your route was created!" })
                // post to the database
                this.props.addRoute("routes", newRoute, this.state.userId)
            }
            // set an error message to state
            else {
                this.setState({ message: "You must choose different start and end points" })
            }
        }
        // set an error message to state
        else {
            this.setState({ message: "You must choose a start and end point" })
        }
    }


    render() {
        // These are used as options in the dropdown select
        // Eventually these constants will be populated with info from the database
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

            <div>
                <h2>Build A Route</h2>
                <div className="exp-cont content-section implementation">

                    <div className="exp-left">

                        <div className="exp-dd-cont">
                            <Dropdown className="exp-dd" value={this.state.start} options={start} onChange={this.onStartChange} style={{ width: '200px' }} placeholder="Select a Start Point" optionLabel="name" />
                            <Dropdown className="exp-dd" value={this.state.end} options={end} onChange={this.onEndChange} style={{ width: '200px' }} placeholder="Select an End Point" optionLabel="name" />
                        </div>

                        <div className="exp-dd-foot">{this.state.start ? 'Selected start: ' + this.state.start.name : 'No start point selected'}</div>
                        <div className="exp-dd-foot">{this.state.end ? 'Selected end: ' + this.state.end.name : 'No end point selected'}</div>

                        <div><Button className="explore-dd-submit-btn" label="submit" icon="pi pi-check" iconPos="right" onClick={this.handleSubmit} /></div>
                        <div className="exp-msg">{this.state.message}</div>
                    </div>
                    <div className="exp-right">
                        <img src={window.location.origin + "/images/kt_map.jpg"} className="exp-map" />

                        {/* <GMap options={options} style={{ width: '100%', minHeight: '320px' }} /> */}
                    </div>
                </div>
            </div>


        );
    }
}

