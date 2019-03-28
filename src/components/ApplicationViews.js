
import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Explore from "./explore/Explore"
import NewRoute from "./explore/NewRoute"
import HomePage from "./HomePage"
import Routes from "./routes/Routes"
import RouteDetails from "./routes/RouteDetails"
import RouteEdit from "./routes/RouteEdit"
import Maintenance from "./maintenance/Maintenance"
import MaintenanceRequest from "./maintenance/MaintenanceRequest"
import MaintenanceDetails from "./maintenance/MaintenanceDetails"
import MaintenanceEdit from "./maintenance/MaintenanceEdit"
import auth0Client from "./authentication/Auth";
import Callback from "./authentication/Callback"
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import ResourceAPIManager from "../modules/ResourceAPIManager"

export default class ApplicationViews extends Component {

        state = {
                activeUser: parseInt(sessionStorage.getItem("credentials")),
                users: [],
                maintenance: [],
                routes: [],
                waypoints: [],


        }
        componentDidMount() {
                const newState = {}

                ResourceAPIManager.getAllItems("routes")
                        .then(routes => newState.routes = routes)
                        .then(() => this.setState(newState))

        }

        addResource = (resources, resourceObject) => {
                const newState = {}

                ResourceAPIManager.addNewItem(resources, resourceObject)
                        .then(() => ResourceAPIManager.getAllItems(resources))
                        .then(sss => {
                                newState[resources] = sss
                                this.setState(newState)
                        }
                        )


        }



        render() {
                return (
                        <React.Fragment>
                                <Route exact path="/callback" component={Callback} />
                                <Route exact path="/" render={props => {
                                        return <HomePage {...props} />;
                                }} />
                                <Route exact path="/explore" render={props => {
                                        if (auth0Client.isAuthenticated()) {
                                                return <Explore {...props}
                                                        activeUser={this.state.activeUser}
                                                        addRoute={this.addResource} />
                                        }
                                        else {
                                                auth0Client.signIn();
                                                return null;
                                        }

                                }} />
                                <Route exact path="/explore/new" render={props => {
                                        if (auth0Client.isAuthenticated()) {
                                                return <NewRoute {...props} />
                                        }
                                        else {
                                                auth0Client.signIn();
                                                return null;
                                        }

                                }} />
                                <Route exact path="/routes" render={props => {

                                        return <Routes {...props}
                                        />

                                }} />

                                <Route exact path="/routes/:routeId(\d+)" render={props => {

                                        return <RouteDetails {...props} />

                                }} />
                                <Route path="/routes/:routeId(\d+)/edit" render={props => {

                                        return <RouteEdit {...props} />

                                }} />

                                <Route exact path="/maintenance" render={props => {

                                        return <Maintenance {...props} />

                                }} />
                                <Route exact path="/maintenance/request" render={props => {

                                        return <MaintenanceRequest {...props} />

                                }} />
                                <Route exact path="/maintenance/:maintenanceId(\d+)" render={props => {

                                        return <MaintenanceDetails {...props} />

                                }} />
                                <Route exact path="/maintenance/:maintenanceId(\d+)/edit" render={props => {

                                        return <MaintenanceEdit {...props} />

                                }} />

                        </React.Fragment>
                )
        }

}

