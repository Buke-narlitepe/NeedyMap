import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import Home from "./Home";
import ResetPassword from "./ResetPassword";
import Contact from "./Contact";
import AboutUs from "./AboutUs";

export default function Welcome() {
    return (
        <div>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Home}/>
                    <Route path="/registration" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/resetpassword" component={ResetPassword} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/about-us" component={AboutUs} />
                </div>
            </HashRouter>
        </div>
    );
}
