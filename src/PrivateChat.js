import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "./socket";
import moment from "moment";
import axios from "./axios.js";
import { Link } from "react-router-dom";

export default function Chat(props) {
    const privateMessages = useSelector((store) => store.privateMessages);
    const [image, setImage] = useState(null);
    const [imageurl, setUrl] = useState(null);

    const privateContainer = useRef();

    useEffect(() => {
        privateContainer.current.scrollTop =
            privateContainer.current.scrollHeight;
    }, [privateMessages]);

    useEffect(() => {
        console.log(props);
        socket.emit("privateMessages", props.match.params.id);
    }, []);

    const onEnterPress = (e) => {
        if (e.keyCode === 13 && e.target.value !== "") {
            e.preventDefault();
            // setTyping(false);

            socket.emit(
                "privateMessage",
                e.target.value,
                imageurl,
                props.match.params.id
            );
            e.target.value = "";
            setImage(null);
            setUrl(null);
        } else if (
            e.keyCode === 13 &&
            e.target.value === "" &&
            imageurl !== null
        ) {
            socket.emit(
                "privateMessage",
                e.target.value,
                imageurl,
                props.match.params.id
            );
            e.target.value = "";
            setImage(null);
            setUrl(null);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        setImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", image);
        axios
            .post("/api/upload-image", formData)
            .then((res) => {
                console.log(res);
                setUrl(res.data);
            })
            .catch((err) => {
                console.log("error on uploading image to chat", err);
            });
    };

    return (
        <div className="private-part">
            <div className="private-box" ref={privateContainer}>
                {privateMessages &&
                    privateMessages.map((message) => (
                        <div className="chat-messages" key={message.id}>
                            <div className="name-time">
                                <img
                                    className="small"
                                    src={message.image}
                                ></img>
                                {message.own ? (
                                    <h2 className="chat-name">You</h2>
                                ) : (
                                    <h2 className="chat-name">
                                        {message.firstname} {message.lastname}
                                    </h2>
                                )}
                                <p className="time">
                                    {moment(message.created_at)
                                        .startOf("minute")
                                        .fromNow()}
                                </p>
                            </div>
                            {!message.message && message.photo ? (
                                <img src={message.photo} />
                            ) : (
                                <p className="message">{message.message}</p>
                            )}
                            {}
                        </div>
                    ))}
            </div>
            <textarea
                className="messagearea"
                placeholder="Typing..."
                onKeyDown={onEnterPress}
            />
            <form onSubmit={handleSubmit}>
                <label className="choose" htmlFor="upload">
                    Choose Image
                </label>
                <input
                    type="file"
                    name="file"
                    id="upload"
                    accept="image/*"
                    onChange={handleChange}
                />
                <button className="upload-image" type="submit">
                    Upload
                </button>
            </form>
            <div className="copyright-icons-chat">
                <div className="copyright">
                    Copyright 2020 <span className="app">NeedyMap</span>.
                    <span className="space">|</span>Terms &amp; Conditions
                    <span className="space">|</span> Privacy
                    <span className="space">|</span>
                    <Link to="/contact"> Contact Us</Link>
                </div>
                <div className="icons">
                    <img src="/facebook.png"></img>
                    <img src="/instagram.png"></img>
                    <img src="/twitter.png"></img>
                </div>
            </div>
        </div>
    );
}
