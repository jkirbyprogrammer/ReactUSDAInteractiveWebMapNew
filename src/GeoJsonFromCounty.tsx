import { useState, useEffect } from 'react';
import { GeoJSON } from 'react-leaflet'

interface GeoJsonLayerProps {
    year: string;
    type: string;
}

const GeoJsonFromCounty: React.FC<GeoJsonLayerProps> = ({ year, type }) => {
    const [geoCountyjsonData, setStateData] = useState(null);
    const fileName = year + (type == "ussec" ? "CountyUsSecLayer.json" : "CountyPresLayer.json");


    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const { signal } = controller;

        const url = `/assets/${fileName}`;

        async function loadData() {
            try {
                const res = await fetch(url, { signal });
                if (!res.ok) throw new Error(`Failed to fetch ${url}`);
                const json = await res.json();
                if (isMounted) {
                    setStateData(json);
                }
            } catch (err) {
                console.error("Fetch error:", err);
            }
        }

        loadData();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [fileName]);



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
    };
    return (
        <div>
            {geoCountyjsonData ? (
                <GeoJSON data={geoCountyjsonData as any} style={styleCounty} onEachFeature={onEachFeature} />
            ) : (
                <span>Loading GeoJSON data...</span>
            )}
        </div>
    );
}

export default GeoJsonFromCounty;