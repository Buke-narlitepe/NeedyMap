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
        googleMapsApiKey: "AIzaSyCctLDWpNtuKU8O-9POBCAVUXgzowa_ZZY",
        libraries,
    });

    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    useEffect(() => {
        const promise1 = axios.get("/api/needsform");
        const promise2 = axios.get("/api/donationform");
        Promise.all([promise1, promise2]).then((data) => {
            const mergedArr = [...data[0].data, ...data[1].data];
            setMarkers(
                mergedArr.map((element) => ({
                    id: element.id,
                    needer_id: element.needer_id,
                    donator_id: element.donator_id,
                    lat: element.latitude,
                    lng: element.longitude,
                    category: element.category,
                    description: element.description,
                }))
            );
            console.log(mergedArr);
        });
    }, []);

    const deleteMarker = () => {
        if (selected.needer_id) {
            axios.post("/api/delete-need", selected).then(() => {
                location.replace("/");
            });
        } else if (selected.donator_id) {
            axios.post("/api/delete-donation", selected).then(() => {
                location.replace("/");
            });
        }
    };

    // const onMapClick = useCallback((e) => {
    //     setMarkers((current) => [
    //         ...current,
    //         {
    //             lat: e.latLng.lat(),
    //             lng: e.latLng.lng(),
    //         },
    //     ]);
    //     if (props.handleClick) {
    //         props.handleClick(e.latLng.lat(), e.latLng.lng());
    //     }
    // }, []);

    const panTo = useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);

    if (loadError) return "Error";
    if (!isLoaded) return <img src="loading.gif" />;

    return (
        <div className="map">
            <div className="welcoming">
                &quot; Happiness is contagious, and we can touch other people’s
                lives by our small acts of kindness. &quot;{" "}
            </div>
            <div className="form-buttons">
                <Link to="/needs">
                    {" "}
                    <div className="needy">
                        <img src="/needy.png" className="needy" />
                        Enter Needs
                    </div>
                </Link>
                <Link to="/donation">
                    {" "}
                    <div className="donation">
                        <img src="/donation.png" className="donation" />
                        Enter Donation
                    </div>
                </Link>
            </div>
            <Locate panTo={panTo} />
            <Search panTo={panTo} />
            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={center}
                options={options}
                onLoad={onMapLoad}
            >
                {markers.map((marker) => (
                    <Marker
                        key={`${marker.lat}-${marker.lng}`}
                        position={{
                            lat: marker.lat,
                            lng: marker.lng,
                        }}
                        onClick={() => {
                            setSelected(marker);
                        }}
                        icon={{
                            url: marker.needer_id
                                ? `/needy-pin.png`
                                : `/donator-pin.png`,
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(15, 15),
                            scaledSize: new window.google.maps.Size(30, 30),
                        }}
                    />
                ))}

                {selected ? (
                    <InfoWindow
                        position={{ lat: selected.lat, lng: selected.lng }}
                        onCloseClick={() => {
                            setSelected(null);
                        }}
                    >
                        <div>
                            <img
                                src="/delete-bin.png"
                                className="bin"
                                onClick={deleteMarker}
                            />
                            <h2>
                                {selected.needer_id
                                    ? "Needs Details"
                                    : "Donation Details"}
                            </h2>
                            <p>{selected.category}</p>
                            <p>{selected.description}</p>
                            <p>
                                <Link
                                    to={
                                        selected.needer_id
                                            ? `/chat/${selected.needer_id}`
                                            : `/chat/${selected.needer_id}`
                                    }
                                >
                                    <img src="/chat.png" className="chat"></img>
                                </Link>
                            </p>
                        </div>
                    </InfoWindow>
                ) : null}
            </GoogleMap>
            <div className="downlink">
                <Link to="/contact"> Contact Us</Link>
            </div>
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
                    className="search"
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder="Search your location"
                />
                <ComboboxPopover>
                    <ComboboxList className="list">
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
