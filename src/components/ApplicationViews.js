
import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Explore from "./explore/Explore"
import HomePage from "./HomePage"
import Routes from "./routes/Routes"
import RouteDetails from "./routes/RouteDetails"
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
                newState.activeUser = parseInt(sessionStorage.getItem("credentials"))

                ResourceAPIManager.getAllItemsbyUser("routes", newState.activeUser)
                        .then(routes => newState.routes = routes)
                        .then(() => this.setState(newState))

        }

        addResource = (resources, resourceObject, userId) => {
                const newState = {}
                ResourceAPIManager.addNewItem(resources, resourceObject)
                        .then(() => ResourceAPIManager.getAllItemsbyUser(resources, userId))
                        .then(sss => {
                                newState[resources] = sss
                                this.setState(newState)
                        }
                        )
        }

        updateResource = (resources, userId) => {
                const newState = {}
                newState.activeUser = userId
                ResourceAPIManager.getAllItemsbyUser(resources, userId)
                        .then(sss => {
                                newState[resources] = sss
                                this.setState(newState)
                        }
                        )
        }
        deleteResource = (resources, resourceId, userId) => {
                const newState = {}
                ResourceAPIManager.deleteItem(resources, resourceId)
                        .then(() => ResourceAPIManager.getAllItemsbyUser(resources, userId))
                        .then(sss => {
                                newState[resources] = sss
                                this.setState(newState)
                        }
                        )
        }


        patchResource = (resources, resourceId, patchObject, userId) => {
                const newState = {}
                ResourceAPIManager.patchItem(resources, resourceId, patchObject)
                        .then(() => ResourceAPIManager.getAllItemsbyUser(resources, userId))
                        .then(sss => {
                                newState[resources] = sss
                                this.setState(newState)
                        }
                        )
        }
        editResource = (resources, editedObject, userId) => {
                const newState = {}
                ResourceAPIManager.editItem(resources, editedObject)
                        .then(() => ResourceAPIManager.getAllItemsbyUser(resources, userId))
                        .then(sss => {
                                newState[resources] = sss
                                this.setState(newState)
                        }
                        )
        }


        render() {
                return (
                        <React.Fragment>
                                <Route exact path="/callback" render={props => {
                                        return <Callback {...props}
                                                updateResource={this.updateResource} />
                                }} />

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

                                <Route exact path="/routes" render={props => {

                                        return <Routes {...props}
                                                routes={this.state.routes}
                                                deleteRoute={this.deleteResource}
                                                patchRoute={this.patchResource}
                                        />


                                }} />

                                <Route exact path="/routes/:routeId(\d+)" render={props => {

                                        return <RouteDetails {...props}
                                                routes={this.state.routes}
                                                editRoute={this.editResource}
                                                patchRoute={this.patchResource}
                                                deleteRoute={this.deleteResource}/>

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

