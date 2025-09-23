import { LayersControl } from 'react-leaflet'
import React from 'react';
import GeoJsonFromStateAPI from "./GeoJsonFromStateAPI";
import GeoJsonCountyFromAPI from "./GeoJsonFromCountyAPI"
import GeoJsonFireFromAPI from "./GeoJsonFromFirePointsAPI"

interface GeoJsonLayerProps {
    year: string;
    type: string;
}

const GeoJsonLayerAPICall: React.FC<GeoJsonLayerProps> = ({ year, type }) => {

    return (
        <LayersControl position="topright">                      
            <GeoJsonFromStateAPI year={year} type={type} />
            <GeoJsonCountyFromAPI year={year} type={type} />
            <GeoJsonFireFromAPI year={year} />    
        </LayersControl>
    );

}

export default GeoJsonLayerAPICall;