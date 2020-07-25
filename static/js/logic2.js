

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
            color = "#FC4E2A"
        } else if (data.properties.mag > 1) {
            color = "#FD8D3C"
        } else if (data.properties.mag > 0) {
            color = "#FEB24C"
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
function getColor(d) {
    return d > 5 ? '#800026' :
        d > 4 ? '#BD0026' :
            d > 3 ? '#E31A1C' :
                d > 5 ? '#FC4E2A' :
                    d > 1 ? '#FD8D3C' :
                        d > 0 ? '#FEB24C' :
                                '#FFEDA0';
}
var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2, 3, 4, 5],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i><br> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);


L.control.layers(baseMaps).addTo(myMap);