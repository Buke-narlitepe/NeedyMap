import React from "react";

// class component
export default class Counter extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 0,
        };
        this.incrementCount = this.incrementCount.bind(this);
    }

    incrementCount() {
        //whenever you want to change sth in the state,
        //you have to work with the setState function.
        this.setState({
            count: this.state.count + 1,
        });
    }

    render() {
        return (
            <div>
                <h1>
                    I am {this.props.name}, counting clicks: {this.state.count}
                </h1>
                <button onClick={this.incrementCount}>INCREMENT BUTTON</button>
            </div>
        );
    }
}
