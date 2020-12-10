import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
const Marker = ({ title }) => (
    <div>
        <img width={30} height={30} src="yyyyy" /> <h3>{title}</h3>
    </div>
);

const config = {
    center: {
        lat: 59.95,
        lng: 30.33,
    },
    zoom: 11,
};

export default function SimpleMap() {
    const [markers, setMarkers] = useState([]);

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: "100vh", width: "100%" }}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: "AIzaSyAJzF3Im06VQbktvf0WwRwrf9B7-jMK5Xw",
                }}
                defaultCenter={config.center}
                defaultZoom={config.zoom}
                onClick={({ lat, lng }) => {
                    setMarkers([...markers, { lat, lng }]);
                }}
            >
                {markers.map((marker) => (
                    <Marker lat={marker.lat} lng={marker.lng} />
                ))}
            </GoogleMapReact>
        </div>
    );
}
