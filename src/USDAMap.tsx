import { MapContainer, TileLayer} from 'react-leaflet'
import GeoJsonLayers from "./GeoJsonLayers"
import "leaflet/dist/leaflet.css";
import './App.css'



const USDAMap = () => {
    const center = [37.8, -96]
    const queryParams = new URLSearchParams(window.location.search);
    var type = queryParams.get("type");
    var year = queryParams.get("year");
    if (type == null) { type = "ussec"; }
    if (year == null) { year = "2025" }


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
            <GeoJsonLayers type={type} year={year} />
            <MinimapControl />
        </MapContainer>
    </div>
);
};

export default USDAMap;