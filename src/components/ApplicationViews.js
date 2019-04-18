
import { Route } from "react-router-dom";
import React, { Component } from "react";
import Explore from "./explore/Explore"
import HomePage from "./HomePage"
import Routes from "./routes/Routes"
import RouteDetails from "./routes/RouteDetails"
import Maintenance from "./maintenance/Maintenance"
import MaintenanceDetails from "./maintenance/MaintenanceDetails"
import auth0Client from "./authentication/Auth";
import Callback from "./authentication/Callback"
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import ResourceAPIManager from "../modules/ResourceAPIManager"

export default class ApplicationViews extends Component {

        state = {
                activeUser: parseInt(sessionStorage.getItem("credentials")),
                user: {},
                maintenance: [],
                routes: [],
                waypoints: [],
                admins: [],
        }

        componentDidMount() {
                const newState = {}
                // Get all resources and set them to state
                newState.activeUser = parseInt(sessionStorage.getItem("credentials"))
                ResourceAPIManager.getAdmins()
                        .then(admins => newState.admins = admins)
                        .then(() => ResourceAPIManager.getAllItems("hazards"))
                        .then(hazards => newState.hazards = hazards)
                        .then(() => ResourceAPIManager.getAllItems("features"))
                        .then(features => newState.features = features)
                        .then(() => ResourceAPIManager.getAllItems("maintenance"))
                        .then(maintenance => newState.maintenance = maintenance)
                        .then(() => ResourceAPIManager.getAllItems("waypoints"))
                        .then(waypoints => {
                                // check to see if the active user has already been set.
                                // If it has, get the user items and set to state.
                                newState.waypoints = waypoints
                                if (newState.activeUser) {

                                        ResourceAPIManager.getAllItems("routes", newState.activeUser)
                                                .then(routes => newState.routes = routes)
                                                .then(() => ResourceAPIManager.getSingleItem("users", newState.activeUser))
                                                .then(user => {

                                                        newState.user = user
                                                        this.setState(newState)
                                                })
                                }
                                // If not, just set state with non-user-specific items
                                else {
                                        this.setState(newState)
                                }
                        })
        }

        // used by the callback module to get the current users routes and set to state
        updateResource = (resources, userId) => {
                const newState = {}
                newState.activeUser = userId
                ResourceAPIManager.getAllItems(resources, userId)
                        .then(sss => {
                                newState[resources] = sss
                                this.setState(newState)

                        })
        }

        // used by the callback module to set the current user to state
        setUser = (users, userId) => {
                const newState = {}
                newState.activeUser = userId
                ResourceAPIManager.getSingleItem(users, userId)
                        .then(user => {
                                newState.user = user
                                this.setState(newState)
                        })
        }

        // Used to add any resource to the database and update state
        addResource = (resources, resourceObject, userId) => {
                const newState = {}
                ResourceAPIManager.addNewItem(resources, resourceObject)
                        .then(() => ResourceAPIManager.getAllItems(resources, userId))
                        .then(sss => {
                                newState[resources] = sss
                                this.setState(newState)
                        })
        }


        // Used to delete any resource from the database and update state
        deleteResource = (resources, resourceId, userId) => {
                const newState = {}
                ResourceAPIManager.deleteItem(resources, resourceId)
                        .then(() => ResourceAPIManager.getAllItems(resources, userId))
                        .then(sss => {
                                newState[resources] = sss
                                this.setState(newState)
                        })
        }

        // used to make a patch request to the database and update state
        patchResource = (resources, resourceId, patchObject, userId) => {
                const newState = {}
                ResourceAPIManager.patchItem(resources, resourceId, patchObject)
                        .then(() => ResourceAPIManager.getAllItems(resources, userId))
                        .then(sss => {
                                newState[resources] = sss
                                this.setState(newState)
                        })
        }

        // used to edit any resource and update state
        editResource = (resources, editedObject, userId) => {
                const newState = {}
                ResourceAPIManager.editItem(resources, editedObject)
                        .then(() => ResourceAPIManager.getAllItems(resources, userId))
                        .then(sss => {
                                newState[resources] = sss
                                this.setState(newState)
                        })
        }


        render() {
                return (
                        <React.Fragment>
                                <Route exact path="/callback" render={props => {
                                        return <Callback {...props}
                                                updateResource={this.updateResource}
                                                setUser={this.setUser} />
                                }} />

                                <Route exact path="/" render={props => {
                                        return <HomePage {...props} />;
                                }} />
                                <Route exact path="/explore" render={props => {
                                        if (auth0Client.isAuthenticated()) {
                                                return <Explore {...props}
                                                        activeUser={this.state.activeUser}
                                                        updateRoutes={this.updateResource}
                                                        waypoints={this.state.waypoints} />
                                        }
                                        else {
                                                auth0Client.signIn();
                                                return null;
                                        }

                                }} />

                                <Route exact path="/routes" render={props => {
                                        if (auth0Client.isAuthenticated()) {
                                                return <Routes {...props}
                                                        routes={this.state.routes}
                                                        deleteRoute={this.deleteResource}
                                                        patchRoute={this.patchResource}
                                                />
                                        }
                                        else {
                                                auth0Client.signIn();
                                                return null;
                                        }

                                }} />

                                <Route exact path="/routes/:routeId(\d+)" render={props => {

                                        return <RouteDetails {...props}
                                                routes={this.state.routes}
                                                waypoints={this.state.waypoints}
                                                editRoute={this.editResource}
                                                patchRoute={this.patchResource}
                                                deleteRoute={this.deleteResource} />


                                }} />


                                <Route exact path="/maintenance" render={props => {
                                        if (auth0Client.isAuthenticated()) {
                                                return <Maintenance {...props}
                                                        user={this.state.user}
                                                        hazards={this.state.hazards}
                                                        maintenance={this.state.maintenance}
                                                        addMaint={this.addResource}
                                                        activeUser={this.state.activeUser}
                                                        patchMaint={this.patchResource}
                                                        admins={this.state.admins}
                                                />
                                        }
                                        else {
                                                auth0Client.signIn();
                                                return null;
                                        }


                                }} />

                                <Route exact path="/maintenance/:maintenanceId(\d+)" render={props => {
                                        if (auth0Client.isAuthenticated()) {
                                                return <MaintenanceDetails {...props}
                                                        maintenance={this.state.maintenance}
                                                        admins={this.state.admins}
                                                        patchMaint={this.patchResource}
                                                        hazards={this.state.hazards}
                                                        deleteMaint={this.deleteResource} />
                                        }
                                        else {
                                                auth0Client.signIn();
                                                return null;
                                        }

                                }} />


                        </React.Fragment>
                )
        }

}

