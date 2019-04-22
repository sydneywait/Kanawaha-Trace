import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css'


const addMapMarker=(classname, gpsObj, map, searchTerm)=>{
    // create an HTML element for each feature
    var el = document.createElement('div');
    el.className = classname;

    // make a marker for each access point or feature and add to the map
    var marker = new mapboxgl.Marker(el)
        .setLngLat([gpsObj.gps_lng, gpsObj.gps_lat])
        .setPopup(new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h3>${gpsObj.name}</h3><p>${(searchTerm?"Type:"+" "+searchTerm:"")}</p><p> ${(gpsObj.name.includes("Mile")?"":"Mile" + " "+ gpsObj.mile)}<p>`))
        .addTo(map);
        return marker
}

export default addMapMarker



