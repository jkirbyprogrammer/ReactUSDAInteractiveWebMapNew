import { LayersControl, LayerGroup } from 'react-leaflet'
import React from 'react';
import GeoJsonFromState from "./GeoJsonFromState";
import GeoJsonFromCounty from "./GeoJsonFromCounty"
import GeoJsonFire from "./GeoJsonFire"

interface GeoJsonLayerProps {
    year: string;
    type: string;
}

const GeoJsonLayerAPICall: React.FC<GeoJsonLayerProps> = ({ year, type }) => {

    return (
        <LayersControl position="topright">   
            <LayersControl.Overlay checked name="State Level Declarations">
                <LayerGroup>
                    <GeoJsonFromState year={year} type={type} />
                </LayerGroup>
            </LayersControl.Overlay> 
            <LayersControl.Overlay checked name="County Level Declarations">
                <LayerGroup>
                    <GeoJsonFromCounty year={year} type={type} />
                </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="USFS Fire Origin Points">
                <LayerGroup>
                    <GeoJsonFire year={year} /> 
                </LayerGroup>
            </LayersControl.Overlay>                                                                                               
        </LayersControl>
    );
}

export default GeoJsonLayerAPICall;