import { connect } from "socket.io-client";
import {
    setChatMessages,
    setChatMessage,
    setPrivateMessage,
    setPrivateMessages,
} from "./actions";

export let socket;

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
    socket.on("privateMessages", (msgs) => {
        store.dispatch(setPrivateMessages(msgs));
    });
    socket.on("privateMessage", (msg) => {
        store.dispatch(setPrivateMessage(msg));
    });
}
