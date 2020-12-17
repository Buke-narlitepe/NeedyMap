import { connect } from "socket.io-client";
import {
    setChatMessages,
    setChatMessage,
    setPrivateMessage,
    setPrivateMessages,
} from "./actions";
import { toast } from "react-toastify";
export let socket;
import React from "react";
import { Link } from "react-router-dom";

const Msg = ({ toastProps, privatemsg }) => (
    <div className="toast">
        You have a new message!
        <Link to={`/chat/${privatemsg.sender_id}`}>
            <img
                src="/chat.png"
                className="chat"
                alt="Contact"
                title="Contact"
            ></img>
        </Link>
    </div>
);
// dependenxy injection ( IoC - Inversion of Control )
export function init(store) {
    socket = connect();
    socket.on("chatMessages", (msgs) => {
        console.log("chatMessages", msgs);
        store.dispatch(setChatMessages(msgs));
    });
    socket.on("chatMessage", (msg) => {
        console.log("chatMessage", msg);
        store.dispatch(setChatMessage(msg));
    });
    socket.on("privateMessages", (privatemsgs) => {
        store.dispatch(setPrivateMessages(privatemsgs));
    });
    socket.on("privateMessage", (privatemsg) => {
        console.log(privatemsg);
        store.dispatch(setPrivateMessage(privatemsg));
        if (privatemsg.notification) {
            toast(<Msg privatemsg={privatemsg} />);
        }
    });
}
