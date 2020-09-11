import React, { Component } from "react";
import Modal from "../components/modal";
import { connect } from "react-redux";
import StdInfo from "./StudentInfoByStd";
import TchInfo from "./StudentInfoByTch";

class Index extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { onHide, userInfo } = this.props;
        return (
            <>
                <Modal
                    title="2020级上学期虚拟现实大场景漫游二班学生名单"
                    onHide={onHide}
                >
                    {
                        userInfo && userInfo.role == "teacher" ?
                            <TchInfo /> : <StdInfo />
                    }
                </Modal>
            </>
        )

    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.browser.userInfo
    }
}

export default connect(mapStateToProps, null)(Index);