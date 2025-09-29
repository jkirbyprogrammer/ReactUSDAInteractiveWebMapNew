import React, { useState, useEffect } from 'react';
import { GeoJSON } from 'react-leaflet'


//hook for json fetch
const useFetchJson = (url: string) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        const fetchData = async () => {
            try {
                const response = await fetch(url, { signal });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json = await response.json();
                setData(json);
            } catch (error) {
                console.log('Error occurred: State polygon request aborted');
            }
        };
        fetchData();
        return () => {
            controller.abort(); // Abort the request when the component unmounts
        };
    }, []);

    return { data };
};

interface GeoJsonLayerProps {
    filePath: string;
}

const GeoJsonStateLayer: React.FC<GeoJsonLayerProps> = ({ filePath }) => {
    // Use the custom hook to fetch data from a local JSON file (e.g., in public folder)
    const { data } = useFetchJson(filePath);

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

    if (!data) return <p>Loading State Layer...</p>;

    return (
        <GeoJSON data={data as any} style={style} onEachFeature={onEachFeature} />
    );
};

export default GeoJsonStateLayer;