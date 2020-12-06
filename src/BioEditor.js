import React from "react";
import axios from "./axios.js";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: this.props.bio,
            editing: false,
        };
        this.editingChange = this.editingChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        console.log("biochange", e.target);
        this.setState({
            bio: e.target.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            editing: !this.state.editing,
        });
        axios
            .post("/api/bio", this.state)
            .then((res) => {
                console.log(res.data, "post-bio");
                console.log(this.props);
                this.props.setBio(res.data);
            })
            .catch((err) => {
                console.log("error on uploading bio", err);
            });
    }

    editingChange() {
        this.setState({
            editing: !this.state.editing,
        });
    }

    render() {
        console.log(this.props);
        return (
            <React.Fragment>
                {this.props.bio && !this.state.editing && (
                    <div className="biop">
                        <p className="biotext">{this.props.bio}</p>
                        <button className="edit" onClick={this.editingChange}>
                            Edit your bio
                        </button>
                    </div>
                )}

                {this.state.editing && (
                    <div className="text-area">
                        <textarea
                            value={this.state.bio}
                            name="bio"
                            onChange={this.handleChange}
                        />

                        <button className="save" onClick={this.handleSubmit}>
                            Save
                        </button>
                    </div>
                )}
                {!this.props.bio && !this.state.editing && (
                    <button className="add" onClick={this.editingChange}>
                        Add your bio
                    </button>
                )}
            </React.Fragment>
        );
    }
}
