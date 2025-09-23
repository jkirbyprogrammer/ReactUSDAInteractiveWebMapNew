import { MapContainer, TileLayer } from 'react-leaflet'
//import GeoJsonLayersAPICall from "./GeoJsonLayersAPICall" //if you want use API calls to pull GeoJson use this example.
//import GeoJsonLayers from './GeoJsonLayers'; //If you want to pull directly json files use this example. If the size of geojson is larger, it is best to pull from geojson directly from file location. 
import GeoJsonLayerFiles from "./GeoJsonLayersFiles"
import React from 'react';
import "leaflet/dist/leaflet.css";
import './App.css'
import 'leaflet.heat';
import 'leaflet/dist/leaflet.css'; // Don't forget the CSS



interface GeoJsonLayerProps {
    year: string;
    type: string;
}

const USDAMap: React.FC<GeoJsonLayerProps> = ({ year, type }) => {

    const center = [37.8, -96]
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
                    <div className="bg-blue w-[80px] h-[80px]">No Crop Data</div>
                </div>
                <div className="leaflet-title leaflet-control mb-3">
                    <div className="row mb-2">
                        <div className="col-2">
                            <div className="circle"></div>
                        </div>
                        <div className="col-10">
                            <b>{year == "2025" ? "2024 USFS Fire Origins" : year + " USFS Fire Origins"}</b>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    return (
        // Make sure you set the height and width of the map container otherwise the map won't show
        <div style={{ width: "100%", height: "600px" }}>
            <MapContainer center={center as any} zoom={4} style={{ width: "100%", height: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    minZoom={0}
                    maxZoom={20}
                />                
                <GeoJsonLayerFiles type={type} year={year} />
                <MinimapControl />
            </MapContainer>
        </div>
         
    );
};

export default USDAMap;