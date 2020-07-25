

// Adding tile layer
let streets = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
});
let satellite = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite-streets-v11",
    accessToken: API_KEY
});
var myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3,
    layers: [satellite]
});

var baseMaps = {
    "Streets": streets,
    "Satellite": satellite

};

// var overlayMaps = {
//     "Cities": cities
// };



var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
d3.json(queryUrl, function (data) {
    // Once we get a response, send the data.features object to the createFeatures function
    console.log(data.features)
    let loop = data.features
    loop.forEach(data => {
        let color = "#800026"
        if (data.properties.mag > 5) {
            color = "#800026"
        } else if (data.properties.mag > 4) {
            color = "#BD0026"
        } else if (data.properties.mag > 3) {
            color = "#E31A1C"
        } else if (data.properties.mag > 2) {
            color = "#ebc334"
        } else if (data.properties.mag > 1) {
            color = "#ebdf34"
        } else if (data.properties.mag > 0) {
            color = "#6eeb34"
        }
        // console.log([data.geometry.coordinates[0],data.geometry.coordinates[1]])
        L.circle([data.geometry.coordinates[1], data.geometry.coordinates[0]],
            {
                fillOpacity: 1,
                color: "black",
                fillColor: color,
                radius: data.properties.mag * 10000,
               
            }
        ).bindPopup(`<h1>${data.properties.place}</h1> Magnitude: ${data.properties.mag}`).addTo(myMap)
    })

});



L.control.layers(baseMaps).addTo(myMap);