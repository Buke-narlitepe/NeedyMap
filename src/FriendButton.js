import React, { useState, useEffect } from "react";

import axios from "./axios.js";

export default function FriendButton(props) {
    const [button, setButton] = useState();

    useEffect(() => {
        console.log("useEffect works");
        axios
            .get(`/api/friendshipstatus/${props.id}`)
            .then((data) => {
                console.log("data.buttonText", data);
                setButton(data.data.button);
            })
            .catch((e) => {
                console.log("error on /friendshipstatus", e);
            });
    }, [props.id]);

    const handleSubmit = () => {
        if (button == "Send Friend Request") {
            axios
                .post(`/api/send-friend-request/${props.id}`, { button })
                .then((data) => {
                    console.log("hello", data);
                    setButton(data.data.button);
                })
                .catch((e) => {
                    console.log("error on POST /send-friend-request", e);
                });
        } else if (button == "Cancel Friend Request" || button == "Unfriend") {
            axios
                .post(`/api/end-friendship/${props.id}`, { button })
                .then((data) => {
                    setButton(data.data.button);
                })
                .catch((e) => {
                    console.log("error on POST /end-friendship", e);
                });
        } else if (button == "Accept Friend Request") {
            axios
                .post(`/api/accept-friend-request/${props.id}`, { button })
                .then((data) => {
                    setButton(data.data.button);
                })
                .catch((e) => {
                    console.log("error on POST /end-friendship", e);
                });
        }
    };

    return (
        <React.Fragment>
            <button className="friend-button" onClick={handleSubmit}>
                {button}
            </button>
        </React.Fragment>
    );
}
