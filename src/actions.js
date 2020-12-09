// all of your action creator functions will live here
import axios from "./axios.js";
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

export async function recieveFriendsWannabes() {
    const { data } = await axios.get("/api/friends-wannabes");
    return {
        type: "RECIEVE_FRIENDS_WANNABES",
        friends: data,
    };
}

export async function acceptFriend(id) {
    const { data } = await axios.post(`/api/accept-friend-request/${id}`, {
        button: "Accept Friend Request",
    });
    return {
        type: "ACCEPT_FRIEND",
        id,
    };
}

export async function unfriend(id) {
    const { data } = await axios.post(`/api/end-friendship/${id}`, {
        button: "Unfriend",
    });
    return {
        type: "UNFRIEND",
        id,
    };
}
