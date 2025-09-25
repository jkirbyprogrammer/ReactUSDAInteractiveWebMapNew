import { LayersControl, LayerGroup } from 'react-leaflet'
import React from 'react';
import GeoJsonStateLayer from "./GeoJsonFromStateNew";
import GeoJsonFireLayer from "./GeoJsonFireNew"
import GeoJsonLayerCounty from './GeoJsonFromCountyNew';

interface GeoJsonLayerProps {
    year: string;
    type: string;
}

const GeoJsonLayers: React.FC<GeoJsonLayerProps> = ({ year, type }) => {

const countyUrl = '/assets/' + year + (type == "ussec" ? "CountyUsSecLayer.json" : "CountyPresLayer.json");
const fireUrl = '/assets/' + (year == "2025" ? "2024NationalUSFSFireOccurrencePoint.json"
        : year + "NationalUSFSFireOccurrencePoint.json");
const stateUrl = '/assets/' + year + (type == "ussec" ? "StateUsSecLayer.json" : "StatePresLayer.json");

    return (
        <LayersControl position="topright">   
            <LayersControl.Overlay checked name="State Level Declarations">
                <LayerGroup>
                    <GeoJsonStateLayer filePath={stateUrl} />
                </LayerGroup>
            </LayersControl.Overlay> 
            <LayersControl.Overlay checked name="County Level Declarations">
                <LayerGroup>
                    <GeoJsonLayerCounty filePath={countyUrl} />
                </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="USFS Fire Origin Points">
                <LayerGroup>
                    <GeoJsonFireLayer filePath={fireUrl} /> 
                </LayerGroup>
            </LayersControl.Overlay>                                                                                               
        </LayersControl>
    );
}

export default GeoJsonLayers;