import React, { Component } from "react";
import "../components/KanawhaTrace.css"
import mapboxToken from "../components/authentication/APITokens"
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import "./Map.css"


mapboxgl.accessToken =  mapboxToken.mapbox


export default class Map extends Component {

    constructor(props: Props) {
        super(props);
        this.state = {
            lng: -82.1032,
            lat: 38.50565,
            zoom: 9.6
        };
    }

    componentDidMount() {

        const { lng, lat, zoom } = this.state;

        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/sydneyroo/cju1kgcmn0u041fpbg636snah',
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
        var el = document.createElement('div');
  el.className = 'marker'
// start point
        new mapboxgl.Marker(el)
        .setLngLat([-82.290, 38.417])
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    .setHTML('<h3>Beginning</h3><p>Ohio Valley Bank</br>Barboursville, WV</p>'))
        .addTo(map);

        var bl = document.createElement('div');
  bl.className = 'marker'

// end point
        new mapboxgl.Marker(bl)
        .setLngLat([-81.977, 38.559])
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    .setHTML('<h3>Terminus</h3><p>Tasty Blend</br>Frasiers Bottom, WV</p>'))
        .addTo(map);
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


