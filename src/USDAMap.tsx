import { MapContainer, TileLayer, GeoJSON, LayersControl, LayerGroup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import ussecStates2024 from "./assets/2024StateUsSecLayer.json";
import prestates2024 from "./assets/2024StateUsSecLayer.json";
import ussecCounties2024 from "./assets/2024CountyUsSecLayer.json"
import presCounties2024 from "./assets/2024CountyPresLayer.json"
import './App.css'



const onEachFeature = (feature, layer) => {
    if (feature.properties) {
        var popupContent = `<div>
        <strong>${feature.properties.name}</strong><div/>
        <div><b>Total Emergency Declarations: </b>${feature.properties.TotalPresDecs}</div>
      `;
        if (feature.properties.DecsWithCrops) {
            popupContent = `<div>
        <strong>${feature.properties.name}</strong><div/>
        <div><b>Total Emergency Declarations: </b>${feature.properties.TotalPresDecs}</div>
        <div><b>Crop Details: </b><small>${feature.properties.CropDetailList}</small></div>
        `;
        }
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
    weight: .6,
    opacity: .5,
    color: "black",
    fillOpacity: 0.7,
});

const getCountyColor = (value, crops) => {
    if (value > 0 && crops > 0) return "red";
    if (value > 0) return "orange";
    return "#FFFFFF00";
};

const getColor = (value) => {
    if (value > 0 && value < 10) return "#b2ed9a";
    if (value > 10 && value < 20) return "#88d669";
    if (value > 20 && value < 30) return "#3d9137";
    if (value > 30) return "#011a08";
    return "#FFFFFF00";
};

const positionClass = 'leaflet-bottom leaflet-left';

const MinimapControl = () => {

    return (
        <div className={positionClass}>
            <div className="leaflet-control leaflet-title">
                <b>State Declarations</b>
            </div>
            <div className="leaflet-control leaflet-bar">
                <div className="bg-green-1 w-[80px] h-[80px]">1 - 9</div>
            </div>
            <div className="leaflet-control leaflet-bar">
                <div className="bg-green-2 w-[80px] h-[80px]">9 - 19</div>
            </div>
            <div className="leaflet-control leaflet-bar">
                <div className="bg-green-3 w-[80px] h-[80px]">20 - 29</div>
            </div>
            <div className="leaflet-control leaflet-bar">
                <div className="bg-green-4 w-[80px] h-[80px]">30+</div>
            </div>
            <div className="leaflet-control leaflet-title">
                <b>County Declarations</b>
            </div>
            <div className="leaflet-control leaflet-bar">
                <div className="bg-red w-[80px] h-[80px]">Crop Data</div>
            </div>
            <div className="leaflet-control leaflet-bar">
                <div className="bg-orange w-[80px] h-[80px]">No Crop Data</div>
            </div>
        </div>

    )
}

const USDAMap = () => {
    const center = [37.8, -96]

    const queryParams = new URLSearchParams(window.location.search);
    var type = queryParams.get("type");
    var year = queryParams.get("year");
    var stateLayer = ussecStates2024;
    var countyLayer = ussecCounties2024;

    if (type == null) {
        type = "ussec";
    }
    if (year == null) {
        year = "2024"
    }

    if (type == "ussec") {

    }
    if (type == "pres") {
        stateLayer = prestates2024;
        countyLayer = presCounties2024;
    }

    return (
        // Make sure you set the height and width of the map container otherwise the map won't show
        <div style={{ width: "100%", height: "600px" }}>
            <div className="map-heading">
                <p>Value of Year: {year}</p>
            </div>
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
                            <GeoJSON data={stateLayer} style={style} onEachFeature={onEachFeature} />
                        </LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="County Level Declarations">
                        <LayerGroup>
                            <GeoJSON data={countyLayer} style={styleCounty} onEachFeature={onEachFeature} />
                        </LayerGroup>
                    </LayersControl.Overlay>

                </LayersControl>
                <MinimapControl />
                {/* Additional map layers or components can be added here */

                }
            </MapContainer>
        </div>
    );
};

export default USDAMap;