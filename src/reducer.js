export default function (
    state = {
        chatMessages: [],
    },
    action
) {
    if (action.type === "CHAT_MESSAGES") {
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
