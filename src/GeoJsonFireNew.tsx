import React, { useState, useEffect } from 'react';
import { GeoJSON } from 'react-leaflet'
import L from 'leaflet';


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
                console.log('Error occurred: Fire points request aborted');
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

const GeoJsonLayerFire: React.FC<GeoJsonLayerProps> = ({ filePath }) => {
    // Use the custom hook to fetch data from a local JSON file (e.g., in public folder)
    const { data } = useFetchJson(filePath);

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


    if (!data) return <p>Loading fire point layer...</p>;

    return (
        <GeoJSON data={data as any} pointToLayer={pointToCircleMarker} onEachFeature={onEachPoint} />
    );
};

export default GeoJsonLayerFire;