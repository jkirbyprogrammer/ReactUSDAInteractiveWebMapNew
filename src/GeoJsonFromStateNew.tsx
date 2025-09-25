import React, { useState, useEffect } from 'react';
import { GeoJSON } from 'react-leaflet'


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

const GeoJsonStateLayer: React.FC<GeoJsonLayerProps> = ({ filePath }) => {
   // Use the custom hook to fetch data from a local JSON file (e.g., in public folder)
  const { data, loading, error } = useFetchJson(filePath); 

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

  
  if (loading) return <p>Loading data state data...</p>;
  if (error) return <p>Error loading state data: {error}</p>;
  if (!data) return <p>No state data found.</p>;

  return (
    <GeoJSON data={data as any} style={style} onEachFeature={onEachFeature} />
  );
};

export default GeoJsonStateLayer;