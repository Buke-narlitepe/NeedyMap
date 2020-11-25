import React from "react";
import Greete from "./Greete.js";
import Counter from "./Counter.js";
// functional components
// dumb components
export default function HelloWorld() {
    const cohort = "SESAM";
    return (
        <div>
            <div
                style={{
                    color: "red",
                    fontFamily: "Verdana",
                    fontSize: 30,
                }}
            >
                Hello, {cohort}!
            </div>
            <div>{2 + 2}</div>
            <p className="important">HELLO AGAIN</p>
            <Greete name="Patrick"></Greete>
            <Greete name="Büke"></Greete>
            <Greete name="Andi"></Greete>
            <Greete name="Julian"></Greete>
            <Greete name="Johannes"></Greete>
            <Greete name="Feet"></Greete>
            <Counter name="The Count"></Counter>
        </div>
    );
}
