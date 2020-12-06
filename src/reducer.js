export default function (state = {}, action) {
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
    }
    return state;
}
