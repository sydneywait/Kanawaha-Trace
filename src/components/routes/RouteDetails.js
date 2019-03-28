import React, { Component } from "react";
import Moment from 'react-moment';
import "./Routes.css"
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';

export default class RouteDetails extends Component{


    render (){
 /*
            Using the route parameter, find the route that the
            user clicked on by looking at the `this.props.routes`
            collection that was passed down from ApplicationViews
        */
        const route = this.props.routes.find(a => a.id === parseInt(this.props.match.params.routeId)) || {}

        return <h1>{route.id}</h1>


    }
}