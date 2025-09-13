import { MapContainer, TileLayer, GeoJSON, LayersControl, LayerGroup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import states from "./assets/2024StateUsSecLayer.json";
import counties from "./assets/2024CountyUsSecLayer.json"

const onEachFeature = (feature, layer) => {
    if (feature.properties) {
        const popupContent = `
        <strong>${feature.properties.name}</strong><br/>
        ${feature.properties.TotalPresDecs}
      `;
        layer.bindPopup(popupContent);
    }
};

const style = (feature) => ({
    fillColor: getColor(feature.properties.TotalPresDecs),
    weight: 1.5,
    opacity: 1,
    color: "black",
    fillOpacity: 0.7,
});

const styleCounty = (feature) => ({
    fillColor: getCountyColor(feature.properties.TotalPresDecs, feature.properties.DecsWithCrops),
    weight: 1.5,
    opacity: 1,
    color: "black",
    fillOpacity: 0.7,
});

const getCountyColor = (value, crops) => {
    if (value > 0 && crops > 0) return "red";
    if (value > 0) return "orange";
    return "#FFFFFF00";
};

const getColor = (value) => {
    if (value > 0 && value < 15) return "#b2ed9a";
    if (value > 10 && value < 20) return "#88d669";
    if (value > 20 && value < 30) return "#3d9137";
    if (value > 30) return "#011a08";
    return "#FFFFFF00";
};

const SimpleMap = () => {
    const center = [37.8, -96]

    return (
        // Make sure you set the height and width of the map container otherwise the map won't show
        <div style={{ width: "100%", height: "600px" }}>
            <MapContainer center={center} zoom={4} style={{ width: "100%", height: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    minZoom={0}
                    maxZoom={20}
                    ext="png"
                />
                <LayersControl position="topright">
                    <LayersControl.Overlay checked name="State Level Declarations">
                        <LayerGroup>
                            <GeoJSON data={states} style={style} onEachFeature={onEachFeature} />
                        </LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="County Level Declarations">
                        <LayerGroup>
                            <GeoJSON data={counties} style={styleCounty} onEachFeature={onEachFeature} />
                        </LayerGroup>
                    </LayersControl.Overlay>
                </LayersControl>

                {/* Additional map layers or components can be added here */}
            </MapContainer>
        </div>
    );
};

export default SimpleMap;