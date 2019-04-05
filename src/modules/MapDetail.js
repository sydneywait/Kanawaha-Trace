import React, { Component } from "react";
import "../components/KanawhaTrace.css"
import mapboxToken from "../components/authentication/APITokens"
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import "./Map.css"


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
            start:"",
            end:""
        };
    }

    // componentDidMount() {
componentDidMount(){




        const { lng, lat, zoom } = this.state;

        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/sydneyroo/cju1kgcmn0u041fpbg636snah',
            center: [lng, lat],
            zoom
        });
        // set the bounds for the current view to only show the selected trail
        // This will be set with the start and end points

        // this.props.waypoints.find(w=>w.id===startId).map(w)

        // const LngLatBounds=[[this.props.start.gps_lng||-82.290, this.props.start.gps_lat||38.417],[this.props.end.gps_lng||-81.977, this.props.end.gps_lat||38.559]]
        //

        // const LngLatBounds=this.props.start.gps_lng?[[this.props.start.gps_lng, this.props.start.gps_lat],[this.props.end.gps_lng, this.props.end.gps_lat]]:[[-82.290, 38.417],[-81.977, 38.559]]
        // map.fitBounds(LngLatBounds, {
        //   padding: {top: 10, bottom:25, left: 15, right: 15}
        // });
        console.log(this.props)

        map.on('move', () => {
            const { lng, lat } = map.getCenter();

            this.setState({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });

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


