import React from "react";
import ProgressBarComponent from "react-bootstrap/lib/ProgressBar";
import AlertComponent from "react-bootstrap/lib/Alert";

const Progress = ({ show, now }) => (
    <AlertComponent
        className={"alert animated " + (show ? "fadeInDown" : "fadeOutUp")}
        bsStyle="success"
    >
        <ProgressBarComponent now={now} label={`${now}%`} active={true} />{`${now}%`}
    </AlertComponent>
)

export default Progress