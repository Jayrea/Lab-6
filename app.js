// set map view to calgary
var map = L.map("mapid").setView([51.05, -114.06], 11);

// map
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var drawnItems = new L.FeatureGroup().addTo(map);
var simplifiedLayer = new L.FeatureGroup().addTo(map);

//controls drawing of the line
var drawControl = new L.Control.Draw({
  position: "topleft",
  edit: { featureGroup: drawnItems },
  draw: {
    polyline: {
      shapeOptions: {
        color: "#133102",
        weight: 5,
      },
    },
    circle: false,
    rectangle: false,
    marker: false,
  },
}).addTo(map);

map.on("draw:created", function (e) {
  var layer = e.layer;
  drawnItems.addLayer(layer);
});


// simplify the line
document
  .getElementById("simplifyButton")
  .addEventListener("click", function () {
    drawnItems.eachLayer(function (layer) {
      var simplified = turf.simplify(layer.toGeoJSON(), {
        tolerance: 0.04,
        highQuality: false,
      });
      var simplifiedLine = L.geoJSON(simplified, {
        style: { color: "red" },
      });
      simplifiedLayer.addLayer(simplifiedLine);
    });
  });


// remove function
document.getElementById("removeButton").addEventListener("click", function () {
  drawnItems.clearLayers();
  simplifiedLayer.clearLayers();
  map.setView([51.05, -114.06], 11);
});
