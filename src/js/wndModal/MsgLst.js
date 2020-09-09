import React, { Component } from "react";
import Modal from "../components/modal";
import { Button } from "react-bootstrap"
import Btns from "../components/buttons";

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
        const { onSure } = this.props;
        const { l_key, r_key,currentPlane } = this.state;
        return (
            <>
                <Modal {...this.props}>
                    <Btns
                        l_title="通知"
                        r_title="消息"
                        l_key={l_key}
                        r_key={r_key}
                        onDoSth={this.switchPlane}
                        style={{marginLeft:"35%"}}
                    />
                {
                    currentPlane==l_key?"通知":"消息"
                }
                <Button onClick={() => { onSure(this.handleSure) }}>1234</Button>
                </Modal>
            </>
        )

    }
}

export default Index;