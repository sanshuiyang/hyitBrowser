import React, { Component } from "react";
import { connect } from "react-redux";
import CreateClass from "./CreateClass";
import CreatedGroup from "./CreateGroup";
import JoinGroup from "./JoinGroup";
import MsgLst from "./MsgLst";
import * as actionsCommon from "../browser/actions"


class Index extends Component {
    constructor(props) {
        super(props);
    }

    onSure = (cb) => {
        if (cb && typeof cb === "function") {
            cb();
        }
        this.onHide();
    }

    onHide = () => {
        this.props.showWndModal(null);
    }

    SwitchModal = modalType => {
        console.log(modalType);
        switch (modalType) {
            case "CreateClass":
                return <CreateClass onSure={this.onSure} onHide={this.onHide} />
            case "CreatedGroup":
                return <CreatedGroup onSure={this.onSure} onHide={this.onHide} />
            case "JoinGroup":
                return <JoinGroup onSure={this.onSure} onHide={this.onHide} />
            case "MsgLst":
                return <MsgLst onSure={this.onSure} onHide={this.onHide} />
            case "Hide":
            default:
                this.onHide();
                return null;
        }
    }

    render() {
        const { modalType } = this.props;
        console.log(modalType);
        return (
            // modalType ? this.SwitchModal(modalType) : this.SwitchModal("MsgLst")
            modalType ? this.SwitchModal(modalType) : null
        )

    }
}

const mapStateToProps = state => {
    return {
        modalType: state.browser.modalType
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showWndModal: type => dispatch(actionsCommon.showWndModal(type)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);