import { LayersControl, LayerGroup } from 'react-leaflet'
import React, { useState, useEffect } from 'react';
import { GeoJSON } from 'react-leaflet'
import L from 'leaflet';


// Custom hook to fetch multiple JSON files for GeoJSON layers
const useFetchJson = (urlCounty: string, urlState: string, urlFire: string) => {

    //States to hold the fetched data
    const [countyData, setCountyData] = useState(null);
    const [stateData, setStateData] = useState(null);
    const [fireData, setFireData] = useState(null);

    // Fetch data when component mounts
    useEffect(() => {
        // Create an AbortController to manage fetch cancellation
        const controller = new AbortController();
        const signal = controller.signal;

        // Async function to fetch all JSON files for GeoJSON layers
        const fetchData = async () => {
            try {
                const [responseCounty, responseState, responseFire] = await Promise.all([
                    fetch(urlCounty, { signal }),
                    fetch(urlState, { signal }),
                    fetch(urlFire, { signal })
                ],);

                // Check if all responses are OK
                if (!responseCounty.ok || !responseState.ok || !responseFire.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonCounty = await responseCounty.json();
                const jsonState = await responseState.json();
                const jsonFire = await responseFire.json();

                // Update state with fetched data
                setStateData(jsonState);
                setCountyData(jsonCounty);
                setFireData(jsonFire);

            } catch (error) {
                // Handle fetch errors or aborts
                console.log('Error occurred: Geojson layers request aborted');
            }
        };

        // Invoke the fetch function
        fetchData();

        // Cleanup function to abort fetch on component unmount
        return () => {
            controller.abort(); // Abort the request when the component unmounts
        };

    }, []);

    // Return the fetched data
    return { countyData, stateData, fireData };
};

// Props interface for the GeoJsonLayers component
interface GeoJsonLayerProps {
    year: string;
    type: string;
}

// Main component to render GeoJSON layers on the map
const GeoJsonLayers: React.FC<GeoJsonLayerProps> = ({ year, type }) => {

    // URLs for fetching GeoJSON data based on year and type
    const stateUrl = '/assets/' + year + (type == "ussec" ? "StateUsSecLayer.json" : "StatePresLayer.json");
    const countyUrl = '/assets/' + year + (type == "ussec" ? "CountyUsSecLayer.json" : "CountyPresLayer.json");
    const fireUrl = '/assets/' + (year == "2025" ? "2024NationalUSFSFireOccurrencePoint.json"
        : year + "NationalUSFSFireOccurrencePoint.json");

    // Use custom hook to fetch GeoJSON data
    const { countyData, stateData, fireData } = useFetchJson(countyUrl, stateUrl, fireUrl);

    // Styling functions counties based on properties
    const styleCounty = (feature: any) => ({
        fillColor: getCountyColor(feature.properties.TotalPresDecs, feature.properties.DecsWithCrops),
        weight: .6,
        opacity: .5,
        color: "black",
        fillOpacity: 0.7,
    });

    // Function to determine county color based on declaration and crop data
    const getCountyColor = (value: any, crops: any) => {
        if (value > 0 && crops > 0) return "red";
        if (value > 0) return "#5E87E8";
        return "#FFFFFF00";
    };

    // Styling function for states based on total declarations
    const styleState = (feature: any) => ({
        fillColor: getStateColor(feature.properties.TotalPresDecs),
        weight: 1.5,
        opacity: 1,
        color: "black",
        fillOpacity: 0.7,
    });

    // Function to determine state color based on total declarations
    const getStateColor = (value: any) => {
        if (value > 0 && value < 10) return "#b2ed9a";
        if (value > 10 && value < 20) return "#88d669";
        if (value > 20 && value < 30) return "#3d9137";
        if (value > 30) return "#011a08";
        return "#FFFFFF00";
    };

    // Function to bind popups to county and state layers with relevant information
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

    // Function to bind popups to each fire point with relevant information
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


    // Function to create circle markers for fire points with specific styling
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

    // Render loading state if data is not yet available
    if (!countyData) return <p>Loading County layer...</p>;
    if (!stateData) return <p>Loading State layer...</p>;
    if (!fireData) return <p>Loading Fire Points layer...</p>;

    // Render the LayersControl with GeoJSON layers for states, counties, and fire points
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