import { GeoJSON, LayersControl, LayerGroup } from 'react-leaflet'
import React from 'react';
import ussecCounties2020 from "./assets/2020CountyUsSecLayer.json"
import presCounties2020 from "./assets/2020CountyPresLayer.json"
import ussecStates2020 from "./assets/2020StateUsSecLayer.json";
import prestates2020 from "./assets/2020StateUsSecLayer.json";
import ussecCounties2021 from "./assets/2021CountyUsSecLayer.json"
import presCounties2021 from "./assets/2021CountyPresLayer.json"
import ussecStates2021 from "./assets/2021StateUsSecLayer.json";
import prestates2021 from "./assets/2021StateUsSecLayer.json";
import ussecCounties2022 from "./assets/2022CountyUsSecLayer.json"
import presCounties2022 from "./assets/2022CountyPresLayer.json"
import ussecStates2022 from "./assets/2022StateUsSecLayer.json";
import prestates2022 from "./assets/2022StateUsSecLayer.json";
import ussecCounties2023 from "./assets/2023CountyUsSecLayer.json"
import presCounties2023 from "./assets/2023CountyPresLayer.json"
import ussecStates2023 from "./assets/2023StateUsSecLayer.json";
import prestates2023 from "./assets/2023StateUsSecLayer.json";
import ussecStates2024 from "./assets/2024StateUsSecLayer.json";
import prestates2024 from "./assets/2024StateUsSecLayer.json";
import ussecCounties2024 from "./assets/2024CountyUsSecLayer.json"
import presCounties2024 from "./assets/2024CountyPresLayer.json"
import ussecStates2025 from "./assets/2025StateUsSecLayer.json";
import prestates2025 from "./assets/2025StateUsSecLayer.json";
import ussecCounties2025 from "./assets/2025CountyUsSecLayer.json"
import presCounties2025 from "./assets/2025CountyPresLayer.json"

interface GeoJsonLayerProps {
    year: string;
    type: string;
}

const GeoJsonLayers: React.FC<GeoJsonLayerProps> = ({ year, type }) => {
    const styleCounty = (feature: any) => ({
        fillColor: getCountyColor(feature.properties.TotalPresDecs, feature.properties.DecsWithCrops),
        weight: .6,
        opacity: .5,
        color: "black",
        fillOpacity: 0.7,
    });

    const getCountyColor = (value: any, crops: any) => {
        if (value > 0 && crops > 0) return "red";
        if (value > 0) return "orange";
        return "#FFFFFF00";
    };

    const onEachFeature = (feature: any, layer: any) => {
        if (feature.properties) {
            var popupContent = `<div>
        <strong>${feature.properties.name}</strong><div/>
        <div><b>Total Emergency Declarations: </b>${feature.properties.TotalPresDecs}</div>
        <div><b>Declarations: </b> ${feature.properties.ListOfDisasters}</div>
      `;
            if (feature.properties.DecsWithCrops) {
                popupContent = `<div>
        <strong>${feature.properties.name}</strong><div/>
        <div><b>Total Emergency Declarations: </b>${feature.properties.TotalPresDecs}</div>
        <div><b>Declarations: </b> ${feature.properties.ListOfDisasters}</div>
        <div><b>Crop Details: </b><small>${feature.properties.CropDetailList}</small></div>
        `;
            }
            layer.bindPopup(popupContent);
        }
    };

    var stateLayer = ussecStates2025;
    var countyLayer = ussecCounties2025;

    if (year == "2025") {
        if (type == "ussec") {
            stateLayer = ussecStates2025;
            countyLayer = ussecCounties2025;
        }
        if (type == "pres") {
            stateLayer = prestates2025;
            countyLayer = presCounties2025;
        }
    }
    else if (year == "2024") {
        if (type == "ussec") {
            stateLayer = ussecStates2024;
            countyLayer = ussecCounties2024;
        }
        if (type == "pres") {
            stateLayer = prestates2024;
            countyLayer = presCounties2024;
        }
    }
    else if (year == "2023") {
        if (type == "ussec") {
            stateLayer = ussecStates2023;
            countyLayer = ussecCounties2023;
        }
        if (type == "pres") {
            stateLayer = prestates2023;
            countyLayer = presCounties2023;
        }
    }
    else if (year == "2022") {
        if (type == "ussec") {
            stateLayer = ussecStates2022;
            countyLayer = ussecCounties2022;
        }
        if (type == "pres") {
            stateLayer = prestates2022;
            countyLayer = presCounties2022;
        }
    }
    else if (year == "2021") {
        if (type == "ussec") {
            stateLayer = ussecStates2021;
            countyLayer = ussecCounties2021;
        }
        if (type == "pres") {
            stateLayer = prestates2021;
            countyLayer = presCounties2021;
        }
    }
    else if (year == "2020") {
        if (type == "ussec") {
            stateLayer = ussecStates2020;
            countyLayer = ussecCounties2020;
        }
        if (type == "pres") {
            stateLayer = prestates2020;
            countyLayer = presCounties2020;
        }
    }

    const style = (feature: any) => ({
        fillColor: getColor(feature.properties.TotalPresDecs),
        weight: 1.5,
        opacity: 1,
        color: "black",
        fillOpacity: 0.7,
    });

    const getColor = (value: any) => {
        if (value > 0 && value < 10) return "#b2ed9a";
        if (value > 10 && value < 20) return "#88d669";
        if (value > 20 && value < 30) return "#3d9137";
        if (value > 30) return "#011a08";
        return "#FFFFFF00";
    };


    return (
        <LayersControl position="topright">
            <LayersControl.Overlay checked name="State Level Declarations">
                <LayerGroup>
                    <GeoJSON data={stateLayer as any} style={style} onEachFeature={onEachFeature} />
                </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="County Level Declarations">
                <LayerGroup>
                    <GeoJSON data={ussecCounties2025 as any} style={styleCounty} onEachFeature={onEachFeature} />
                </LayerGroup>
            </LayersControl.Overlay>
        </LayersControl>
    );

}

export default GeoJsonLayers;