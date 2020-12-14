import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { socket } from "./socket";
import moment from "moment";

export default function Chat(props) {
    const privateMessages = useSelector((store) => store.privateMessages);
    const privateContainer = useRef();
    // const [typing, setTyping] = useState(false);

    useEffect(() => {
        privateContainer.current.scrollTop =
            privateContainer.current.scrollHeight;
    }, [privateMessages]);

    useEffect(() => {
        console.log(props);
        socket.emit("privateMessages", props.match.params.id);
    }, []);

    const onEnterPress = (e) => {
        if (e.keyCode !== 13 && e.target.value !== "") {
            // socket.emit("typingstart", props.match.params.id);
        } else if (e.keyCode === 13 && e.target.value !== "") {
            e.preventDefault();
            // setTyping(false);
            socket.emit(
                "privateMessage",
                e.target.value,
                props.match.params.id
            );
            e.target.value = "";
        }
    };

    return (
        <div className="private-part">
            <div className="private-box" ref={privateContainer}>
                {privateMessages &&
                    privateMessages.map((message) => (
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
                            {/* {typing && <p>{message.firstname} is typing...</p>} */}
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
