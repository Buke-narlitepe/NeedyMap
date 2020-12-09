export default function (
    state = {
        chatMessages: [],
    },
    action
) {
    if (action.type === "RECIEVE_FRIENDS_WANNABES") {
        state = {
            ...state,
            friends: action.friends,
        };
    } else if (action.type === "ACCEPT_FRIEND") {
        state = {
            ...state,
            friends: state.friends.map((friend) => {
                if (friend.id != action.id) {
                    return friend;
                }
                return {
                    ...friend,
                    accepted: true,
                };
            }),
        };
    } else if (action.type === "UNFRIEND") {
        state = {
            ...state,
            friends: state.friends.filter((friend) => {
                if (friend.id != action.id) {
                    return friend;
                }
                return false;
            }),
        };
    } else if (action.type === "CHAT_MESSAGES") {
        state = {
            ...state,
            chatMessages: action.chatMessages,
        };
    } else if (action.type === "CHAT_MESSAGE") {
        state = {
            ...state,
            chatMessages: [...state.chatMessages, action.msg],
        };
    } else if (action.type === "PRIVATE_MESSAGES") {
        state = {
            ...state,
            privateMessages: action.privateMessages,
        };
    } else if (action.type === "PRIVATE_MESSAGE") {
        state = {
            ...state,
            privateMessages: [...state.privateMessages, action.privatemsg],
        };
    }
    return state;
}
