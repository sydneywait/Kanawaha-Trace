import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css'


const addMapMarker=(classname, gpsObj, map)=>{
    // create an HTML element for each feature
    var el = document.createElement('div');
    el.className = classname;

    // make a marker for each access point and add to the map
    new mapboxgl.Marker(el)
        .setLngLat([gpsObj.gps_lng, gpsObj.gps_lat])
        .setPopup(new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h3>${(gpsObj.type?gpsObj.type:gpsObj.name)}</h3><p>mile ${gpsObj.mile}<p>`))
        .addTo(map);
}

export default addMapMarker



