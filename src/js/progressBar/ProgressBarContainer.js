import React from "react";
import ProgressComponent from "./ProgressBar";
import { connect } from "react-redux";

const Progress = ({ progress }) => {
    if (progress.now < 0) {
        return "";
    }

    return <ProgressComponent {...progress} />
}

const mapStateToProps = state => {
    return {
        progress: state.progress
    }
}

export default connect(mapStateToProps, null)(Progress)