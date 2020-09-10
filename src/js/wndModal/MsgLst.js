import React, { Component } from "react";
import Modal from "../components/modal";
import { Button } from "react-bootstrap"
import { connect } from "react-redux"
import Btns from "../components/buttons";
import MsgLstItem from "./MsgLstItem";

class Index extends Component {
    constructor(props) {
        super(props);

        this.switchPlane = this.switchPlane.bind(this);

        this.state = {
            l_key: "notice",
            r_key: "msg",
            currentPlane: "notice",
        }
    }

    handleSure() {
        console.log("在这里处理提交等事件");
    }

    switchPlane(type) {
        console.log("切换面板：" + type);
        this.setState({
            currentPlane: type
        })
    }

    render() {
        const { onSure, msgList } = this.props;
        const { l_key, r_key, currentPlane } = this.state;
        return (
            <>
                <Modal {...this.props}>
                    <Btns
                        l_title="通知"
                        r_title="消息"
                        l_key={l_key}
                        r_key={r_key}
                        onDoSth={this.switchPlane}
                        style={{ marginLeft: "35%" }}
                        showFooter={true}
                        successTxt="提交按钮"
                        onSure={() => { onSure(this.handleSure) }}
                    />
                    {
                        currentPlane == l_key ?
                            msgList.filter(item => item.infoType == "envelope")
                                .map((value, index) => (
                                    <MsgLstItem
                                        key={index}
                                        infoType={value.infoType}
                                        content={value.content}
                                        btn1={value.btn1}
                                        btn2={value.btn2}
                                        time={value.time}
                                    />
                                )) :
                            msgList.filter(item => item.infoType !== "envelope")
                                .map((value, index) => (
                                    <MsgLstItem
                                        key={index}
                                        infoType={value.infoType}
                                        content={value.content}
                                        btn1={value.btn1}
                                        btn2={value.btn2}
                                        time={value.time}
                                    />
                                ))
                    }
                </Modal>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        msgList: state.message.msgList
    }
}

export default connect(mapStateToProps, null)(Index);