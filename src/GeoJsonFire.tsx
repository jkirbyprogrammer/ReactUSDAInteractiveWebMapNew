import { useState, useEffect } from 'react';
import { GeoJSON } from 'react-leaflet'
import L from 'leaflet';

interface GeoJsonLayerProps {
    year: string;
}

const GeoJsonFire: React.FC<GeoJsonLayerProps> = ({ year }) => {
    const [geoFirejsonData, setStateData] = useState(null);
    const fileName = (year == "2025" ? "2024NationalUSFSFireOccurrencePoint.json"
        : year + "NationalUSFSFireOccurrencePoint.json");
    //const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    //useEffect(() => {
    //    let isMounted = true;
    //    const controller = new AbortController();
    //    const { signal } = controller;

    //    const url = `/assets/${fileName}`;

    //    async function loadData() {
    //        try {
    //            const res = await fetch(url, { signal });
    //            if (!res.ok) throw new Error(`Failed to fetch ${url}`);
    //            const json = await res.json();
    //            if (isMounted) {
    //                setStateData(json);
    //            }
    //        } catch (err) {
    //            console.error("Fetch error:", err);

    //        }
    //    }

    //    loadData();

    //    return () => {
    //        isMounted = false;
    //        controller.abort();
    //    };
    //}, [fileName]);

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

                    const handleLoad = () => {
                        console.log("Loading GeoJson, json file length:", json?.length);
                    };
                    window.addEventListener("resize", handleLoad);

                    return () => {
                        window.removeEventListener("resize", handleLoad);
                    };
                }
            } catch (err) {
                if (err) {
                    console.error("Fetch error:", err);
                }
            }
        }

        loadData();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [fileName]);

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
                <span>Loading GeoJSON data...</span>
            )}
        </div>
    );
}

export default GeoJsonFire;