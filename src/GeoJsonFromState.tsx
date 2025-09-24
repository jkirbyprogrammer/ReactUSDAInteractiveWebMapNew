import { useState, useEffect } from 'react';
import { GeoJSON} from 'react-leaflet'

interface GeoJsonLayerProps {
    year: string;
    type: string;
}

    const GeoJsonFromState: React.FC<GeoJsonLayerProps> = ({ year, type }) => {
      const [geoStatejsonData, setStateData] = useState(null);
      const fileName = year + (type == "ussec" ? "StateUsSecLayer.json" : "StatePresLayer.json");
    
  useEffect(() => {
    const fetchStateData = async () => {
      try {
        window.addEventListener('load',fetchStateData);
        const response = await fetch('/assets/' + fileName);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const geoStatejsonData = await response.json();
        setStateData(geoStatejsonData);
      } catch (err) {
        window.removeEventListener('load', fetchStateData);
      }
      finally{
        window.removeEventListener('load', fetchStateData);
      } 
    };
    fetchStateData();
  }, []); 
         

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
    
      return (
        <div>
          {geoStatejsonData ? (
            <GeoJSON data={geoStatejsonData as any} style={style} onEachFeature={onEachFeature} />                                                                            
          ) : (
            <span>Loading GeoJSON data...</span>
          )}
        </div>
      );
    }

    export default GeoJsonFromState;