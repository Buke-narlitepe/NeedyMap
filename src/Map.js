import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
const Marker = () => (
    <div style={{ height: "30px", width: "30px", background: "white" }}></div>
);
const Info = () => (
    <div style={{ height: "100px", width: "100px", background: "white" }}>
        Helloo
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
    const [infoVisible, setShown] = useState(false);

    const toggleUpload = (e) => {
        e.preventDefault();
        setShown(true);
        console.log("nfjsnjsdn");
    };

    const closeComponent = (e) => {
        e.preventDefault();
        setShown(false);
    };

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: "50vh", width: "50vw" }}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: "AIzaSyAJzF3Im06VQbktvf0WwRwrf9B7-jMK5Xw",
                }}
                defaultCenter={config.center}
                defaultZoom={config.zoom}
                onClick={({ lat, lng, title }) => {
                    setMarkers([...markers, { lat, lng, title }]);
                }}
            >
                {markers.map((marker) => (
                    <Marker
                        lat={marker.lat}
                        key={marker.id}
                        lng={marker.lng}
                        onClick={toggleUpload}
                    ></Marker>
                ))}
                <Info onClick={closeComponent}></Info>
            </GoogleMapReact>
        </div>
    );
}
