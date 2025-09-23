import { useState, useEffect } from 'react';
import {GeoJSON} from 'react-leaflet'
import L from 'leaflet';

interface GeoJsonLayerProps {
    year: string;
}

const GeoJsonFire: React.FC<GeoJsonLayerProps> = ({ year }) => {
  const [geoFirejsonData, setStateData] = useState(null);
  const fileName = (year == "2025" ? "2024NationalUSFSFireOccurrencePoint.json" 
    : year + "NationalUSFSFireOccurrencePoint.json");
    

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/assets/' + fileName);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const geoFirejsonData = await response.json();
        setStateData(geoFirejsonData)
      } catch (err) {
      } 
    };
    fetchData();
  }, []);     

         

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

      return (
        <div>
          {geoFirejsonData ? (
            <GeoJSON data={geoFirejsonData as any} pointToLayer={pointToCircleMarker} onEachFeature={onEachPoint} />                                                        
          ) : (
            <p>Loading GeoJSON data...</p>
          )}
        </div>
      );
    }

    export default GeoJsonFire;