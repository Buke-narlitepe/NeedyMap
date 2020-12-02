import React from "react";

export default function ProfilePic(props) {
    console.log(props);

    return (
        <img
            className="avatar"
            src={props.profilePic || "/avatar.png"}
            onClick={props.toggleUploader}
        />
    );
}
