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
        if (e.keyCode === 13 && e.target.value !== "") {
            e.preventDefault();
            socket.emit("privateMessage", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <div className="private-part">
            <div className="private-box" ref={privateContainer}>
                {privateMessages &&
                    privateMessages.map((message) => (
                        <div className="private-messages" key={message.id}>
                            <h2 className="private-name">
                                {message.firstname} {message.lastname} {""}
                                {moment(message.created_at)
                                    .startOf("minute")
                                    .fromNow()}
                            </h2>
                            <p>{message.message}</p>
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
