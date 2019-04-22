import React, { Component } from "react";
import "../components/KanawhaTrace.css"
import mapboxToken from "../components/authentication/APITokens"
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import "./Map.css"
import addMapMarker from "./AddMapMarker";


mapboxgl.accessToken = mapboxToken.mapbox


export default class Map extends Component {

    constructor(props: Props) {
        super(props);
        this.state = {
            lng: -82.1032,
            lat: 38.50565,
            zoom: 9.6,
            searchTerm:""
        };

    this.onChange=this.onChange.bind(this);
    }

    onChange(e) {

        this.setState({ searchTerm: e.value });
    }

    componentDidMount() {

        const { lng, lat, zoom } = this.state;

        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/sydneyroo/cju32seef0x4e1gmbx78sdk4e',
            center: [lng, lat],
            zoom
        });

        map.on('move', () => {
            const { lng, lat } = map.getCenter();

            this.setState({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });

        // add markers to map
        this.props.waypoints.filter(w => w.isAccess === true).map((w) => {

            addMapMarker("marker-ends", w, map)

        });
        map.getCanvas().style.cursor = 'default'


    }



    searchWaypoints(){
        this.props.waypoints.filter(w=>)


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


