import React, { Component } from "react";
import "../components/KanawhaTrace.css"
import mapboxToken from "../components/authentication/APITokens"
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import "./Map.css"
import ResourceManager from "../modules/ResourceAPIManager"


mapboxgl.accessToken = mapboxToken.mapbox


export default class MapDetail extends Component {

    //     static getDerivedStateFromProps(props, state){
    // const newState ={}
    //         newState.start = props.start.map(p=>p)
    //         newState.end = props.end.map(p=>p)
    //         this.setState(newState)


    //     }

    constructor(props) {
        super(props);
        this.state = {
            lng: -82.1032,
            lat: 38.50565,
            zoom: 9.6,
            start: "",
            end: ""
        };
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
            .then(() => ResourceManager.getSingleItem("waypoints", newState.startId))
            .then((start) => {

                newState.start = start
                LngLatBounds = [[start.gps_lng, start.gps_lat]]



            })
            .then(() => ResourceManager.getSingleItem("waypoints", newState.endId))
            .then((end) => {
                newState.end = end
                LngLatBounds.push([end.gps_lng, end.gps_lat])
                console.log(LngLatBounds)
                newState.LngLatBounds = LngLatBounds
                map = new mapboxgl.Map({
                    container: this.mapContainer,
                    style: 'mapbox://styles/sydneyroo/cju1kgcmn0u041fpbg636snah'
                    // center: [lng, lat],
                    // zoom
                });
                // set the bounds for the current view to only show the selected trail
                // This will be set with the start and end points
                map.fitBounds(LngLatBounds, {
                    padding: { top: 20, bottom: 20, left: 20, right: 20 }
                });
                map.on('move', () => {
                    const { lng, lat } = map.getCenter();

                    this.setState({
                        lng: lng.toFixed(4),
                        lat: lat.toFixed(4),
                        zoom: map.getZoom().toFixed(2)
                    });
                });

                this.setState(newState)

            })




        const { lng, lat, zoom } = this.state;






        console.log(LngLatBounds)
        console.log(this.state)



        // add markers to map to show features and hazards
        // this.props.waypoints.filter(w => w.isAccess === true).map((w) => {

        //     // when querying the waypoint, match the featureId or HazardId and print to map

        //     // create an HTML element for each feature
        //     var el = document.createElement('div');
        //     el.className = 'marker';

        //     // make a marker for each access point and add to the map
        //     new mapboxgl.Marker(el)
        //         .setLngLat([w.gps_lng, w.gps_lat])
        //         .setPopup(new mapboxgl.Popup({ offset: 25 })
        //             .setHTML(`<h3>${w.name}</h3><p>Mile ${w.mile}<p>`))
        //         .addTo(map);
        // });
    }



    render() {

        const { lng, lat, zoom } = this.state;


        return (
            <React.Fragment>



                <div className="map">
                    <div className=" inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
                        <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
                    </div>
                    <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
                </div>
            </React.Fragment>
        )
    }
}

