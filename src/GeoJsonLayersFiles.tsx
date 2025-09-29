import { LayersControl, LayerGroup } from 'react-leaflet'
import React, { useState, useEffect } from 'react';
import { GeoJSON } from 'react-leaflet'
import L from 'leaflet';


//hook for json fetch
const useFetchJson = (urlCounty: string, urlState: string, urlFire: string) => {
    const [countyData, setCountyData] = useState(null);
    const [stateData, setStateData] = useState(null);
    const [fireData, setFireData] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        const fetchData = async () => {
            try {
                const [responseCounty, responseState, responseFire] = await Promise.all([
                    fetch(urlCounty, { signal }),
                    fetch(urlState, { signal }),
                    fetch(urlFire, { signal })
                ],);

                const jsonCounty = await responseCounty.json();
                const jsonState = await responseState.json();
                const jsonFire = await responseFire.json();

                setStateData(jsonState);
                setCountyData(jsonCounty);
                setFireData(jsonFire);

            } catch (error) {
                console.log('Error occurred: Geojson layers request aborted');
            }
        };

        fetchData();
        return () => {
            controller.abort(); // Abort the request when the component unmounts
        };
    }, []);

    return { countyData, stateData, fireData };
};

interface GeoJsonLayerProps {
    year: string;
    type: string;
}

const GeoJsonLayers: React.FC<GeoJsonLayerProps> = ({ year, type }) => {

    const stateUrl = '/assets/' + year + (type == "ussec" ? "StateUsSecLayer.json" : "StatePresLayer.json");
    const countyUrl = '/assets/' + year + (type == "ussec" ? "CountyUsSecLayer.json" : "CountyPresLayer.json");
    const fireUrl = '/assets/' + (year == "2025" ? "2024NationalUSFSFireOccurrencePoint.json"
        : year + "NationalUSFSFireOccurrencePoint.json");

    const { countyData, stateData, fireData } = useFetchJson(countyUrl, stateUrl, fireUrl);

    const styleCounty = (feature: any) => ({
        fillColor: getCountyColor(feature.properties.TotalPresDecs, feature.properties.DecsWithCrops),
        weight: .6,
        opacity: .5,
        color: "black",
        fillOpacity: 0.7,
    });

    const getCountyColor = (value: any, crops: any) => {
        if (value > 0 && crops > 0) return "red";
        if (value > 0) return "#5E87E8";
        return "#FFFFFF00";
    };

    const styleState = (feature: any) => ({
        fillColor: getStateColor(feature.properties.TotalPresDecs),
        weight: 1.5,
        opacity: 1,
        color: "black",
        fillOpacity: 0.7,
    });

    const getStateColor = (value: any) => {
        if (value > 0 && value < 10) return "#b2ed9a";
        if (value > 10 && value < 20) return "#88d669";
        if (value > 20 && value < 30) return "#3d9137";
        if (value > 30) return "#011a08";
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
    }

    const onEachPoint = (feature: any, layer: any) => {
        if (feature.properties) {
            var popupContent = `
            <div>
                <b>Fire Name:</b>${feature.properties.FIRENAME}
            <div/>
            <div>
                <b>Fire Year: </b>${feature.properties.FIREYEAR}
           </div>
            <div>
                <b>Fire Discovery Date/Time: </b>${feature.properties.DISCOVERYDATETIME}
           </div>
            <div>
                <b>Date Fire Was Out: </b>${feature.properties.FIREOUTDATETIME}
           </div>
            <div>
                <b>Total Fire Acres: </b>${feature.properties.TOTALACRES}
           </div>
            <div>
                <b>Fire Cause: </b>${feature.properties.STATCAUSE}
           </div>
      `;
            layer.bindPopup(popupContent);
        }
    };

    function pointToCircleMarker(feature: any, latlng: any) {
        const geojsonMarkerOptions = {
            radius: 7,
            fillColor: feature.properties ? "#FDA50F" : "red",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        };
        return L.circleMarker(latlng, geojsonMarkerOptions);
    }

    if (!countyData) return <p>Loading County layer...</p>;

    return (
        <LayersControl position="topright">
            <LayersControl.Overlay checked name="State Level Declarations">
                <LayerGroup>
                    <GeoJSON data={stateData as any} style={styleState} onEachFeature={onEachFeature} />
                </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="County Level Declarations">
                <LayerGroup>
                    <GeoJSON data={countyData as any} style={styleCounty} onEachFeature={onEachFeature} />
                </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="USFS Fire Origin Points">
                <LayerGroup>
                    <GeoJSON data={fireData as any} pointToLayer={pointToCircleMarker} onEachFeature={onEachPoint} />
                </LayerGroup>
            </LayersControl.Overlay>
        </LayersControl>
    );
}

export default GeoJsonLayers;