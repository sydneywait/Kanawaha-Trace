
import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Explore from "./explore/Explore"
import HomePage from "./HomePage"
import Routes from "./routes/Routes"
import Maintenance from "./maintenance/Maintenance"


export default class ApplicationViews extends Component {

    state = {}

    render() {
        return (
            <React.Fragment>

                <Route
                    exact path="/" render={props => {

                            return <HomePage {...props}/>

                    }} />
                    <Route
                    exact path="/explore" render={props => {

                            return <Explore {...props}/>

                    }} />
                     <Route
                    exact path="/routes" render={props => {

                            return <Routes {...props}/>

                    }} />
                     <Route
                    exact path="/maintenance" render={props => {

                            return <Maintenance {...props}/>

                    }} />

            </React.Fragment>
        )
    }

}

