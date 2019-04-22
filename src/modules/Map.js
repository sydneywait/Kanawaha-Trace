import React, { Component } from "react";
import "../components/KanawhaTrace.css"
import mapboxToken from "../components/authentication/APITokens"
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import "./Map.css"
import addMapMarker from "./AddMapMarker";
import { InputText } from 'primereact/inputtext';


mapboxgl.accessToken = mapboxToken.mapbox


export default class Map extends Component {

    constructor(props: Props) {
        super(props);
        this.state = {
            lng: -82.1032,
            lat: 38.50565,
            zoom: 9.6,
            searchTerm: "",
            markers: []
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {

        this.setState({ searchTerm: e.target.value });
    }

    componentDidMount() {

        const { lng, lat, zoom } = this.state;

        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/sydneyroo/cju32seef0x4e1gmbx78sdk4e',
            center: [lng, lat],
            zoom
        });

        this.setState({ map: map })
        map.on('move', () => {
            const { lng, lat } = map.getCenter();

            this.setState({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: map.getZoom().toFixed(2),

            });
        });

        // add markers to map
        this.props.waypoints.filter(w => w.isAccess === true).map((w) => {

            addMapMarker("marker-ends", w, map)

        });



        map.getCanvas().style.cursor = 'default'


    }



    componentDidUpdate(prevProps, prevState) {

        let markers = [];

        if (prevProps.searchTerm !== this.props.searchTerm) {

            // remove any previous feature markers
            prevState.markers.map((m) => m.remove())
            // use the search term and look through the descriptions of the waypoints to find a match
            this.props.waypoints.filter((waypoint) => {
                return waypoint.description.toLowerCase().indexOf(this.props.searchTerm.toLowerCase()) !== -1
            }).map((w) => {
                console.log(w)
                // add the marker to the map, and set the marker array to state so they can be targeted
                // and removed when a new search is performed later
                markers.push(addMapMarker("marker-star", w, this.state.map, this.props.searchTerm))

                this.setState({ markers: markers })
            })
        }

    }



    render() {

        const { lng, lat, zoom } = this.state;
        // this.searchWaypoints()


        return (
            <React.Fragment>



                <div className="map">
                    <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
                        <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
                    </div>
                    <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
                </div>
            </React.Fragment>
        )
    }
}


