import React from "react";

export default function Greete(props) {
    console.log(props);
    return <div>Hello to {props.name}</div>;
}
