import React, { Component } from "react";
import Modal from "../components/modal";
import { Button } from "react-bootstrap"

class Index extends Component {
    constructor(props) {
        super(props);
    }

    handleSure() {
        console.log("在这里处理提交等事件");
    }

    render() {
        const { onSure } = this.props;
        return (
            <>
                <Modal {...this.props}>
                    <Button onClick={()=>{onSure(this.handleSure)}}>1234</Button>
                </Modal>
            </>
        )

    }
}

export default Index;