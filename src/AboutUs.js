import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo.js";

export default function AboutUs() {
    return (
        <div>
            <header>
                <Logo />
                <div className="uplink">
                    <Link to="/registration"> Register</Link>
                </div>
            </header>
            <div className="about-part">
                <h2>About Us</h2>
                <p>
                    It can be surprising how many things are needed, or just
                    downright practical, when you have a little one in your
                    life. It’s not easy to provide for the range of items a baby
                    needs, particularly all at once. Donate gently used baby
                    items to help support families with tight budgets, families
                    or individuals. To see the products which are needed please
                    click the pins on the map. If you want, you may send by
                    cargo the product to the required address or deliver it
                    yourself. You can also contact the needy through our
                    application.Our map works bilaterally. As a donor, you are
                    also able to pin your address on the map and upload the
                    product you will donate to the system by filling out our
                    form.
                </p>
            </div>
            <footer>
                <div className="downlink">
                    <Link to="/contact"> Contact Us</Link>
                </div>
            </footer>
        </div>
    );
}
