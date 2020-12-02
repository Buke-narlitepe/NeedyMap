import React from "react";

import axios from "./axios.js";
import FriendButton from "./FriendButton.js";

export default class OtherProfile extends React.Component {
    constructor() {
        super();

        this.state = {
            firstname: "",
            lastname: "",
            bio: "",
            error: false,
        };
    }

    async componentDidMount() {
        console.log(this.props); // all kind of props injected by react-router-dom

        try {
            const { data } = await axios.get(
                `/api/user/${this.props.match.params.id}`
            );

            this.setState({
                firstname: data.firstname,
                lastname: data.lastname,
                bio: data.bio,
                profilePic: data.image,
            });
        } catch (e) {
            // tried to access own profile
            if (e.response.status === 418) {
                this.props.history.push("/");
            } else {
                // TODO: show error message to user
                this.setState({
                    error: true,
                });
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.state.error && <p>Ooopss! Something wrong!</p>}
                <div className="profile">
                    <div className="otherprofile-pic">
                        <img src={this.state.profilePic} />
                    </div>
                    <div className="otherprofile-info">
                        <h2 className="otherprofile">
                            {this.state.firstname} {this.state.lastname}
                        </h2>
                        <p className="bio-text">{this.state.bio}</p>
                    </div>
                </div>
                <FriendButton id={this.props.match.params.id} />
            </React.Fragment>
        );
    }
}
