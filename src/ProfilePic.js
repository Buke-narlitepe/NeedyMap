import React from "react";

export default function ProfilePic(props) {
    console.log(props);

    // TODO: use props.profilePic to render actual profile picture,
    // also you want to have a default image, if user has not set a profile pic yet.
    // return <h3 onClick={props.toggleUploader}>Hello from ProfilePic</h3>;
    return (
        <img
            className="avatar"
            src={props.profilePic || "avatar.png"}
            onClick={props.toggleUploader}
        />
    );
}
