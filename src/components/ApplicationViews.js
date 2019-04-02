
import { Route, Redirect } from "react-router-dom";
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
                maintenance_requests: [],
                routes: [],
                waypoints: [],
                admins: []


        }
        componentDidMount() {
                const newState = {}
                newState.activeUser = parseInt(sessionStorage.getItem("credentials"))
                ResourceAPIManager.getAdmins()
                        .then(admins => newState.admins = admins)
                        .then(() => ResourceAPIManager.getAllItems("hazards"))
                        .then(hazards => newState.hazards = hazards)
                        .then(() => ResourceAPIManager.getAllItems("features"))
                        .then(features => newState.features = features)
                        .then(() => ResourceAPIManager.getAllItems("maintenance_requests"))
                        .then(maintenance => newState.maintenance_requests = maintenance)
                        .then(() => ResourceAPIManager.getAllItems("routes", newState.activeUser))
                        .then(routes => newState.routes = routes)
                        .then(() => ResourceAPIManager.getSingleItem("users", newState.activeUser))
                        .then(user => {

                                newState.user = user
                                this.setState(newState)

                        })

        }

updateResource = (resources, userId) => {
        const newState = {}
        newState.activeUser = userId
        ResourceAPIManager.getAllItems(resources, userId)
                .then(sss => {
                        newState[resources] = sss
                        this.setState(newState)

                })
}
setUser = (users, userId) => {
        const newState = {}
        ResourceAPIManager.getSingleItem(users, userId)
                .then(user => {
                        newState.user = user
                        this.setState(newState)
                })
}

addResource = (resources, resourceObject, userId) => {
        const newState = {}
        ResourceAPIManager.addNewItem(resources, resourceObject)
                .then(() => ResourceAPIManager.getAllItems(resources, userId))
                .then(sss => {
                        newState[resources] = sss
                        this.setState(newState)
                }
                )
}

addResource2 = (resources, resourceObject) => {
        const newState = {}
        ResourceAPIManager.addNewItem(resources, resourceObject)
                .then(() => ResourceAPIManager.getAllItems(resources))
                .then(sss => {
                        console.log("sss", sss)
                        newState[resources] = sss
                        this.setState(newState)
                }
                )
}




deleteResource = (resources, resourceId, userId) => {
        const newState = {}
        ResourceAPIManager.deleteItem(resources, resourceId)
                .then(() => ResourceAPIManager.getAllItems(resources, userId))
                .then(sss => {
                        newState[resources] = sss
                        this.setState(newState)
                }
                )
}


patchResource = (resources, resourceId, patchObject, userId) => {
        const newState = {}
        ResourceAPIManager.patchItem(resources, resourceId, patchObject)
                .then(() => ResourceAPIManager.getAllItems(resources, userId))
                .then(sss => {
                        newState[resources] = sss
                        this.setState(newState)
                }
                )
}
editResource = (resources, editedObject, userId) => {
        const newState = {}
        ResourceAPIManager.editItem(resources, editedObject)
                .then(() => ResourceAPIManager.getAllItems(resources, userId))
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
                                                addRoute={this.addResource} />
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
                                        editRoute={this.editResource}
                                        patchRoute={this.patchResource}
                                        deleteRoute={this.deleteResource} />

                        }} />


                        <Route exact path="/maintenance" render={props => {

                                return <Maintenance {...props}
                                        user={this.state.user}
                                        hazards={this.state.hazards}
                                        maintenance_requests={this.state.maintenance_requests}
                                        addMaint={this.addResource}
                                        activeUser={this.state.activeUser}
                                        patchMaint={this.patchResource}
                                        admins={this.state.admins}

                                />
                        }} />

                        <Route exact path="/maintenance/:maintenanceId(\d+)" render={props => {

                                return <MaintenanceDetails {...props}
                                        maintenance_requests={this.state.maintenance_requests}
                                        admins={this.state.admins}
                                        patchMaint={this.patchResource}/>

                        }} />


                </React.Fragment>
        )
}

}

