import React, { Component } from "react";
import Modal from "../components/modal";

class Index extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { onHide } = this.props;
        return (
            <>
                <Modal
                    title="2020级上学期虚拟现实大场景漫游二班学生名单"
                    onHide={onHide}
                >
                    学生信息
                </Modal>
            </>
        )

    }
}

export default Index;