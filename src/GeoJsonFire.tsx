import { useState, useEffect } from 'react';
import {GeoJSON} from 'react-leaflet'
import L from 'leaflet';

interface GeoJsonLayerProps {
    year: string;
}

    const GeoJsonFire: React.FC<GeoJsonLayerProps> = ({ year }) => {
    const [geoStatejsonData, setStateData] = useState(null);
    const fileName = (year == "2025" ? "2024NationalUSFSFireOccurrencePoint.json" 
        : year + "NationalUSFSFireOccurrencePoint.json");
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));    
    

    useEffect(() => {
      const performActionOnLoad = async () => {
        if(year == "2025" || year == "2024")
        {
          await sleep(20);
        }
        fetch('/assets/' + fileName)
          .then(res => res.json())
          .then(geoStatejsonData => setStateData(geoStatejsonData));
      };
      performActionOnLoad();
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
          {geoStatejsonData ? (
            <GeoJSON data={geoStatejsonData as any} pointToLayer={pointToCircleMarker} onEachFeature={onEachPoint} />                                                        
          ) : (
            <p>Loading GeoJSON data...</p>
          )}
        </div>
      );
    }

    export default GeoJsonFire;