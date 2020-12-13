import React, { useState, useCallback, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";

// import "@reach/combobox/styles.css";

import mapStyles from "./mapStyles";
import axios from "./axios.js";

const libraries = ["places"];
const mapContainerStyle = {
    height: "50vh",
    width: "50vw",
};
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
};
const center = {
    lat: 48.783333,
    lng: 9.183333,
};

export default function SimpleMap(props) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyAJzF3Im06VQbktvf0WwRwrf9B7-jMK5Xw",
        libraries,
    });

    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);
    /*
    useEffect(() => {
        console.log("oh look a new chat message, lets scroll to the bottom");
        axios.get("api/needsform").then((data) => {
            console.log(data, "needsform");
            setMarkers({
                category: data.data.category,
                description: data.data.description,
                latitude: data.data.latitude,
                longitude: data.data.longitude,
            });
        });
        axios.get("api/donationform").then((data) => {
            console.log(data, "donationform");
            setMarkers([
                {
                    lat: data.data.category,
                    lng: data.data.description,
                },
            ]);
        });
    }, [markers]);
    */

    const onMapClick = useCallback((e) => {
        setMarkers((current) => [
            ...current,
            {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
            },
        ]);
        if (props.handleClick) {
            props.handleClick(e.latLng.lat(), e.latLng.lng());
        }
    }, []);

    const panTo = useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (
        <div className="map">
            <Locate panTo={panTo} />
            <Search panTo={panTo} />
            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={center}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                <Marker
                    position={{ lat: props.latitude, lng: props.longitude }}
                    onClick={() => {
                        setSelected(true);
                    }}
                    icon={{
                        url: `/logo-netflix.png`,
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                        scaledSize: new window.google.maps.Size(30, 30),
                    }}
                />

                {selected ? (
                    <InfoWindow
                        position={{ lat: selected.lat, lng: selected.lng }}
                        onCloseClick={() => {
                            setSelected(null);
                        }}
                    >
                        <div>
                            <h2>Details</h2>
                            <p>{props.category}</p>
                            <p>{props.description}</p>
                            <p>
                                Product text <Link to={`/chat`}>Contact</Link>
                            </p>
                        </div>
                    </InfoWindow>
                ) : null}
            </GoogleMap>
        </div>
    );
}

//finding your current position
function Locate({ panTo }) {
    return (
        <button
            className="locate"
            onClick={() => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        panTo({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        });
                    },
                    () => null
                );
            }}
        >
            <img
                src="/map.png"
                alt="Current Location"
                title="Current Location"
            />
        </button>
    );
}

function Search({ panTo }) {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 48.783333, lng: () => -9.183333 },
            radius: 100 * 1000,
        },
    });

    const handleInput = (e) => {
        setValue(e.target.value);
    };

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();

        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    return (
        <div className="search">
            <Combobox onSelect={handleSelect}>
                <ComboboxInput
                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder="Search your location"
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" &&
                            data.map(({ id, description }) => (
                                <ComboboxOption key={id} value={description} />
                            ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    );
}
