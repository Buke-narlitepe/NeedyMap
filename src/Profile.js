import React from "react";

import ProfilePic from "./ProfilePic.js";

export default class Profile extends React.Component {
    constructor() {
        super();

        this.state = {};
    }

    render() {
        return (
            <div className="profile">
                <div className="profilepic">
                    <ProfilePic
                        profilePic={this.props.profilePic}
                        toggleUploader={this.props.toggleUploader}
                    />
                </div>
                <div className="biopart">
                    <p className="name">
                        {this.props.firstname} {this.props.lastname}
                    </p>
                    <p className="name">{this.props.bio}</p>
                </div>
            </div>
        );
    }
}
