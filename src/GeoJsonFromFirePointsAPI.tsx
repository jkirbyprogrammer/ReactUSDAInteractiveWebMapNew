import { useState, useEffect } from 'react';
import {  LayersControl, GeoJSON, LayerGroup} from 'react-leaflet'
import L from 'leaflet';

interface GeoJsonLayerProps {
    year: string;
}

    const GeoJsonFireFromAPI: React.FC<GeoJsonLayerProps> = ({ year }) => {
      const [geoFirejsonData, setGeojsonDataCounty] = useState(null);
      const geoStatejsonUrl = "Add API URL here.."; // Replace with your actual URL
      const urlStateWithParams = geoStatejsonUrl + "&year=" + year;

      useEffect(() => {
        const fetchGeoJSON = async () => {
          try {
            const response = await fetch(urlStateWithParams);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setGeojsonDataCounty(data);
          } catch (error) {
            console.error("Error fetching GeoJSON:", error);
          }
        };

        fetchGeoJSON();
      }, [geoFirejsonData]); 

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

            <LayersControl.Overlay checked name="USFS Fire Origin Points">
                <LayerGroup>
                    <GeoJSON data={geoFirejsonData as any} pointToLayer={pointToCircleMarker} onEachFeature={onEachPoint} />
                </LayerGroup>
            </LayersControl.Overlay>                                                            
          ) : (
            <p>Loading GeoJSON data...</p>
          )}
        </div>
      );
    }

    export default GeoJsonFireFromAPI;