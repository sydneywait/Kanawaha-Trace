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

    static getDerivedStateFromProps(props, state) {
        // const route = props.waypoints.find(r => r.id === parseInt(props.routeId)) || {}
        // const start = props.waypoints.find(s => s.id === parseInt(route.startId))
        // const end = props.waypoints.find(d => d.id === parseInt(route.endId))

        // if (start !== state.start || end !== state.end) {

        //     return {

        //         route: route,
        //         start: start,
        //         end: end
        //     }
        // }



        // this.props.waypoints.filter(h => h.mile > newState.start.mile && h.mile < newState.end.mile).map((h) => {



    }

    componentDidMount(props) {
        let newState = {}
        let map = ""
        let LngLatBounds = []
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

                const start = waypoints.find(waypoint => waypoint.id === newState.startId)
                const end = waypoints.find(waypoint => waypoint.id === newState.endId)
                newState.start = start
                newState.end = end

                LngLatBounds = [[start.gps_lng, start.gps_lat], [end.gps_lng, end.gps_lat]]
                newState.LngLatBounds = LngLatBounds
                console.log(LngLatBounds)

                map = new mapboxgl.Map({
                    container: this.mapContainer,
                    style: 'mapbox://styles/sydneyroo/cju32seef0x4e1gmbx78sdk4e',
                    center: [lng, lat],
                    zoom
                });
                newState.map=map
                // set the bounds for the current view to only show the selected trail
                // This will be set with the start and end points
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
                waypoints.filter(w => w.mile > (start.mile<end.mile?start.mile:end.mile) && w.mile < (start.mile<end.mile?end.mile:start.mile)).map((w) => {
                    addMapMarker("marker-feature", w, map)
                    console.log("inside filter")
                });


                // add markers to map to show start and end points
                addMapMarker("marker-ends", start, map)
                addMapMarker("marker-ends", end, map)

                this.setState(newState)

            })


        const { lng, lat, zoom } = this.state;


   }

   testFunction(){
       console.log("you did it!!")
   }

    componentDidUpdate() {
        // const gpsObj={
        //         gps_lat:-82.1032,
        //         gps_lng:38.50565,
        //         name: "test",
        //         mile: 10

        //     }
        //     addMapMarker("marker-hazard", gpsObj, this.state.map)
    }


    render() {

        const { lng, lat, zoom } = this.state;




        return (
            <React.Fragment>



                <div className="map">
                    <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
                        <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
                    </div>
                    <div className='map-overlay' id='legend'></div>

                    <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
                </div>
            </React.Fragment>
        )
    }
}


