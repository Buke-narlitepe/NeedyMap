import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./Welcome.js";

let component = null;
if (location.pathname === "/welcome") {
    component = <Welcome />;
} else {
    component = <img src="logo.png" />;
}

ReactDOM.render(component, document.querySelector("main"));
