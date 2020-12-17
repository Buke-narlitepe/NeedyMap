import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "./socket";
import moment from "moment";
import axios from "./axios.js";
import { Link } from "react-router-dom";

export default function Chat(props) {
    const privateMessages = useSelector((store) => store.privateMessages);
    const [imageurl, setUrl] = useState(null);

    const privateContainer = useRef();
    const privateText = useRef();

    useEffect(() => {
        privateContainer.current.scrollTop =
            privateContainer.current.scrollHeight;
    }, [privateMessages]);

    useEffect(() => {
        console.log(props);
        socket.emit("privateMessages", props.match.params.id);
    }, []);

    const onEnterPress = (e) => {
        if (e.keyCode === 13 ) {
            e.preventDefault();
            socket.emit(
                "privateMessage",
                e.target.value,
                imageurl,
                props.match.params.id
            );
            e.target.value = "";
            setUrl(null);
        } 
    };
    

    const handleChange = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        axios
            .post("/api/upload-image", formData)
            .then((res) => {
                console.log(res);
                setUrl(res.data);
            })
            .catch((err) => {
                console.log("error on uploading image to chat", err);
            });
            e.target.value = null;
    };

    const handleSubmit = (e) => {
         e.preventDefault();
            socket.emit(
                "privateMessage",
                privateText.current.value,
                imageurl,
                props.match.params.id
            );
            privateText.current.value = "";
            setUrl(null);
    };

    return (
        <div className="private-part">
            <div className="private-box" ref={privateContainer}>
                {privateMessages &&
                    privateMessages.map((message) => (
                        <div className="chat-messages" key={message.id}>
                            {message.own ? (
                                <div className="name-time-right">
                                    <h2 className="chat-own">You</h2>
                                    <p className="time">
                                        {moment(message.created_at)
                                            .startOf("minute")
                                            .fromNow()}
                                    </p>
                                </div>
                            ) : (
                                <div className="name-time-left">
                                    <h2 className="chat-name">
                                        {message.firstname} {message.lastname}
                                    </h2>
                                    <p className="time">
                                        {moment(message.created_at)
                                            .startOf("minute")
                                            .fromNow()}
                                    </p>
                                </div>
                            )}
                            {message.own ? (
                                <div className="right">
                                    {message.message && 
                                        (<p className="message">
                                            {message.message}
                                        </p>)}
                                    {message.photo && (<img
                                            src={message.photo}
                                            className="photo"
                                        />)}
                                </div>
                            ) : (
                                <div className="left">
                                   {message.message && 
                                        (<p className="message">
                                            {message.message}
                                        </p>)}
                                    {message.photo && (<img
                                            src={message.photo}
                                            className="photo"
                                        />)}
                                </div>
                            )}
                        </div>
                    ))}
            </div>
            <div className="send-part">
                <textarea
                    className="messagearea"
                    placeholder="Typing..."
                    onKeyDown={onEnterPress}
                    ref={privateText}
                />
                <button
                    className="chat-button"
                    onClick={handleSubmit}
                    >
                        SEND MESSAGE
                    </button>
                <form className="send-image">
                    <label className="choose" htmlFor="upload">
                        <img
                            src="/choose.png"
                            className="choose"
                            alt="Choose a file"
                            title="Choose a file"
                        ></img>
                    </label>
                    <input
                        type="file"
                        name="file"
                        id="upload"
                        accept="image/*"
                        onChange={handleChange}
                    />
                </form>
            </div>
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
