import React, { useState, useEffect } from 'react';
import { GeoJSON } from 'react-leaflet'
import L from 'leaflet';


//hook for json fetch
const useFetchJson = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]); 

  return { data, loading, error };
};

interface GeoJsonLayerProps {
    filePath: string;
}

const GeoJsonLayerFire: React.FC<GeoJsonLayerProps> = ({ filePath }) => {
   // Use the custom hook to fetch data from a local JSON file (e.g., in public folder)
  const { data, loading, error } = useFetchJson(filePath); 

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

  
  if (loading) return <p>Loading data fire point data..</p>;
  if (error) return <p>Error loading fire points: {error}</p>;
  if (!data) return <p>No fire point data found.</p>;

  return (
    <GeoJSON data={data as any} pointToLayer={pointToCircleMarker} onEachFeature={onEachPoint} />
  );
};

export default GeoJsonLayerFire;