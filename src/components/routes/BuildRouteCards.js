import React from "react";
import Moment from 'react-moment';
import "./Routes.css"
import { Button } from 'primereact/button';


// Function used to build the route cards for each view (completed/not completed)
const buildRouteCards = (status, props, filteredRoutes, reverseRoute, onClick) => {
    return (
        <React.Fragment>
            {
                // conditionally create the route cards based on status (isComplete = true or false)
                // find cards that match the current status
                filteredRoutes.filter((route) => route.isComplete === status)
                // Sort by date--most recent to oldest
                .sort((a, b)=> {
                    a = new Date(a.dateCompleted);
                    b = new Date(b.dateCompleted);
                    return a>b ? -1 : a<b ? 1 : 0
                })
               .map((route) =>
                    <div className="route-card-cont" key={route.id}>
                        <div className="route-card-header">
                            <h4 className="route-name-header">{route.name}</h4>
                        </div>
                        <div className="route-img-cont">
                            {/* Insert the trail marker based on the trail direction */}
                            {(route.direction === true ?
                                <img src={window.location.origin + "/images/west_east.jpg"} height="100px" className="exp-map" /> :
                                <img src={window.location.origin + "/images/east_west.jpg"} height="100px" className="exp-map" />
                            )}
                            {/* Insert a placeholder map that shows a section of trail */}
                            <img src={window.location.origin + "/images/section_map.jpg"} height="100px" className="exp-map" />
                        </div>
                        {/* Conditionally render date and time if route is complete */}
                        {(route.isComplete === true ?
                            <div className="route-card-text-cont">
                                <div className="date-time">Date Completed: {<Moment format="MM/DD/YY">
                                    {route.dateCompleted}</Moment>}</div>
                                <div className="date-time">Time to Complete: {route.timeToComplete}</div></div>
                            :
                            <div className="route-card-text-cont">
                            </div>)}

                        {/* Conditionally render reverse button if route is not complete */}
                        {(route.isComplete === false ?
                            <div className="route-btn-cont">
                                <Button label="Reverse"
                                    icon="pi pi-refresh" iconPos="right"
                                    className="p-button-raised p-button-rounded p-button-warning"
                                    onClick={() => {
                                        reverseRoute(route)
                                    }} />

                                {/* Conditionally render complete button if route is not complete */}
                                <Button label="Complete" icon="pi pi-check"
                                    id="complete-route"
                                    iconPos="right"
                                    className="p-button-raised p-button-rounded p-button-success"
                                    onClick={(e) => onClick(e,route)} />
                            </div> : "")}

                        <div className="route-btn-cont">
                            {/* Render details button and delete button regardless of complete or not complete */}
                            <Button label="Details" icon="pi pi-pencil"
                                iconPos="right"
                                className="p-button-raised p-button-rounded p-button-primary"
                                onClick={() => { props.history.push(`/routes/${route.id}`) }} />
                            <Button label="Delete"
                                id="delete-route"
                                icon="pi pi-trash" iconPos="right"
                                className="p-button-raised p-button-rounded p-button-danger"
                                onClick={(e) => onClick(e,route)} />
                        </div>
                    </div>
                )}

        </React.Fragment>
    )
}

export default buildRouteCards