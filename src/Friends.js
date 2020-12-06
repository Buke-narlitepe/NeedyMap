import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recieveFriendsWannabes, acceptFriend, unfriend } from "./actions";
import { Link } from "react-router-dom";

export default function Friends() {
    const dispatch = useDispatch();
    const wannabes = useSelector(
        (state) =>
            state.friends &&
            state.friends.filter((friend) => friend.accepted == false)
    );
    const friends = useSelector(
        (state) =>
            state.friends &&
            state.friends.filter((friend) => friend.accepted == true)
    );

    useEffect(() => {
        console.log("lola");
        dispatch(recieveFriendsWannabes());
    }, []);

    if (!wannabes && !friends) {
        return null;
    }
    return (
        <React.Fragment>
            <div className="friends">
                <div className="wannabeslist">
                    <p className="list-text">Friend Requests</p>
                    {wannabes &&
                        wannabes.map((friend) => (
                            <div className="wannabe-part" key={friend.id}>
                                <Link to={`/user/${friend.id}`}>
                                    <img className="pic" src={friend.image} />
                                </Link>
                                <div className="namepart">
                                    <h2 className="friends-name">
                                        {friend.firstname} {friend.lastname}
                                    </h2>
                                    <button
                                        className="accept-btn"
                                        onClick={() =>
                                            dispatch(acceptFriend(friend.id))
                                        }
                                    >
                                        Accept friend request
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
                <div className="friendslist">
                    <p className="list-text">Your Friends</p>
                    {friends &&
                        friends.map((friend) => (
                            <div className="friend-part" key={friend.id}>
                                <Link to={`/user/${friend.id}`}>
                                    <img className="pic" src={friend.image} />
                                </Link>
                                <div className="namepart">
                                    <h2 className="friends-name">
                                        {friend.firstname} {friend.lastname}
                                    </h2>
                                    <button
                                        className="accept-btn"
                                        onClick={() =>
                                            dispatch(unfriend(friend.id))
                                        }
                                    >
                                        Unfriend
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </React.Fragment>
    );
}
