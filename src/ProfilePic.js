import React from "react";

export default function ProfilePic(props) {
    console.log(props);

    return (
        <div onClick={props.toggleUploader} className="profile-pic">
            <p className="prof-welcome">Welcome</p>
            <p>{props.firstname}</p>
        </div>
        // <img
        //     className="avatar"
        //     src={props.profilePic || "/avatar.png"}
        //     onClick={props.toggleUploader}
        // />
    );
}
