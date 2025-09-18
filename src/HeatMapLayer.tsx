import * as L from 'leaflet';
import 'leaflet.heat';
import 'leaflet/dist/leaflet.css'; // Don't forget the CSS

// Add this to your HTML file: <div id="map"></div>
const map = L.map('map').setView([39.95, -75.16], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Dummy data for the heatmap
const testData = [
  [39.95, -75.16, 0.2],
  [39.95, -75.17, 0.5],
  [39.96, -75.16, 0.8],
  [39.94, -75.15, 1.0]
];

// Create and add the heatmap layer to the map
L.heatLayer(testData as L.HeatLatLngTuple[], {
  radius: 25,
  blur: 15,
  max: 1.0,
}).addTo(map);