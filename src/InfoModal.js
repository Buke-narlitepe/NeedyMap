import React from "react";

export default function InfoModal(props) {
    let modal = props.upload ? "modal" : "slide";
    return (
        <div className="component">
            <div className={modal}>
                <p className="x" onClick={props.closeModal}>
                    X
                </p>
                <img src="/needy-pin.png" className="pin">
                    Needs
                </img>
                <img src="/donator-pin.png" className="pin">
                    Donations
                </img>
            </div>
        </div>
    );
}
