import React, { Component } from "react";
import "../components/KanawhaTrace.css"
import mapboxToken from "../components/authentication/APITokens"
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import "./Map.css"
import ResourceManager from "../modules/ResourceAPIManager"
import addMapMarker from "./AddMapMarker"


mapboxgl.accessToken = mapboxToken.mapbox


export default class MapDetail extends Component {


    constructor(props) {
        super(props);
        // Set an initial longitude and latitude for the center of the map
        this.state = {
            lng: -82.1032,
            lat: 38.50565,
            zoom: 9.6,
            start: "",
            end: "",
            map: "",
            LngLatBounds: [[0, 0], [0, 0]],
            route: ""

        };
    }



    componentDidMount(props) {
        let newState = {}
        let map = ""
        let LngLatBounds = []
        // Get the route details for the current route
        ResourceManager.getSingleItem("routes", this.props.routeId)
            .then(route => {
                newState = {

                    startId: route.startId,
                    endId: route.endId,
                    direction: route.direction,

                }
            })

            .then(() => ResourceManager.getAllItems("waypoints"))
            .then((waypoints) => {
                // Match the start and end points to get the gps coordinates
                const start = waypoints.find(waypoint => waypoint.id === newState.startId)
                const end = waypoints.find(waypoint => waypoint.id === newState.endId)
                newState.start = start
                newState.end = end
                // Set the longitude and latitude bounds based on the start and end points
                LngLatBounds = [[start.gps_lng, start.gps_lat], [end.gps_lng, end.gps_lat]]
                newState.LngLatBounds = LngLatBounds
                // Link to the map on mapbox
                map = new mapboxgl.Map({
                    container: this.mapContainer,
                    style: `mapbox://styles/${mapboxToken.mapboxStyle}`,
                    center: [lng, lat],
                    zoom
                });
                // Set the map to state to use after component mounts?
                newState.map = map
                // set the bounds for the current view to only show the selected trail
                map.fitBounds(LngLatBounds, {
                    padding: { top: 100, bottom: 100, left: 100, right: 100 }
                });
                map.on('move', () => {
                    const { lng, lat } = map.getCenter();

                    this.setState({
                        lng: lng.toFixed(4),
                        lat: lat.toFixed(4),
                        zoom: map.getZoom().toFixed(2)
                    });
                });

                // add markers to map to milepoints with descriptions
                waypoints.filter(w => w.mile > (start.mile < end.mile ? start.mile : end.mile) && w.mile < (start.mile < end.mile ? end.mile : start.mile)).map((w) => {
                    addMapMarker("marker-feature", w, map)
                });


                // add markers to map to show start and end points
                addMapMarker("marker-ends", start, map)
                addMapMarker("marker-ends", end, map)

                this.setState(newState)
                map.getCanvas().style.cursor = 'default'


            })


        const { lng, lat, zoom } = this.state;


    }



    render() {

        const { lng, lat, zoom } = this.state;




        return (
            <React.Fragment>



                <div className="map">
                {/* Add a legend to the map that shows the coordinates and zoom level */}
                    <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
                        <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
                    </div>
                    <div className='map-overlay' id='legend'></div>
                    {/* render the map in the selected container in the DOM */}
                    <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
                </div>
            </React.Fragment>
        )
    }
}


