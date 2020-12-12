// all of your action creator functions will live here
// import axios from "./axios.js";
export async function setChatMessages(chatMessages) {
    return {
        type: "CHAT_MESSAGES",
        chatMessages,
    };
}

export async function setChatMessage(msg) {
    return {
        type: "CHAT_MESSAGE",
        msg,
    };
}

export async function setPrivateMessages(privateMessages) {
    return {
        type: "PRIVATE_MESSAGES",
        privateMessages,
    };
}

export async function setPrivateMessage(privatemsg) {
    return {
        type: "PRIVATE_MESSAGE",
        privatemsg,
    };
}
