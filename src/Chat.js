import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { setChatMessages } from "./actions";
import { socket } from "./socket";
import moment from "moment";

export default function Chat() {
    const chatMessages = useSelector((store) => store.chatMessages);
    const chatContainer = useRef();

    useEffect(() => {
        console.log("oh look a new chat message, lets scroll to the bottom");
        chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
    }, [chatMessages]);

    const onEnterPress = (e) => {
        if (e.keyCode === 13 && e.target.value !== "") {
            e.preventDefault();
            socket.emit("chatMessage", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <div className="chat-part">
            <div className="chat-box" ref={chatContainer}>
                {chatMessages &&
                    chatMessages.map((message) => (
                        <div className="chat-messages" key={message.id}>
                            <div className="name-time">
                                <img
                                    className="small"
                                    src={message.image}
                                ></img>
                                <h2 className="chat-name">
                                    {message.firstname} {message.lastname} {""}
                                </h2>
                                <p className="time">
                                    {moment(message.created_at)
                                        .startOf("minute")
                                        .fromNow()}
                                </p>
                            </div>
                            <p className="message">{message.message}</p>
                        </div>
                    ))}
            </div>
            <textarea
                className="message-area"
                placeholder="Typing..."
                onKeyDown={onEnterPress}
            />
        </div>
    );
}
