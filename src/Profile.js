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
                        firstname={this.props.firstname}
                        toggleUploader={this.props.toggleUploader}
                    />
                </div>
                <div className="biopart">
                    <p className="name">Firstname: {this.props.firstname}</p>
                    <p className="name">Lastname: {this.props.lastname}</p>
                    <p className="name">Email: {this.props.email}</p>
                </div>
            </div>
        );
    }
}
