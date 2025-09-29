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
                console.log('Error occurred: County polygon request aborted');
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

const GeoJsonLayerCounty: React.FC<GeoJsonLayerProps> = ({ filePath }) => {
    // Use the custom hook to fetch data from a local JSON file (e.g., in public folder)
    const { data } = useFetchJson(filePath);

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


    if (!data) return <p>Loading County layer...</p>;

    return (
        <GeoJSON data={data as any} style={styleCounty} onEachFeature={onEachFeature} />
    );
};

export default GeoJsonLayerCounty;