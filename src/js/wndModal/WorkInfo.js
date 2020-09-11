import React, { Component } from "react";
import Modal from "../components/modal";
import Button from "../components/button";
import Space from "../components/space";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux"

class Index extends Component {
    render() {
        const { workInfo, } = this.props;

        const { title, introduce, special, imgs, disabled } = workInfo;

        const disabledStr = disabled ? "disabled" : null;

        return (
            <Modal
                bodyStyle={{ padding: "0", width: "90%" }}
            >
                <Row>
                    <Col xs={12} md={10} className="show-grid">
                        <div className="wi-item">
                            <span>作业名称:</span>
                            <Space width={10} />
                            <input
                                disabled={disabledStr}
                                className="wi-input-content"
                                value={title}
                                onChange={() => { }}
                            />
                        </div>
                        <div className="wi-item">
                            <span>作业介绍:</span>
                            <Space width={10} />
                            <textarea
                                value={introduce}
                                onChange={() => { }}
                                rows="8"
                                disabled={disabledStr}
                                className="wi-input-content disable-resize"
                            ></textarea>
                        </div>
                        <div className="wi-item">
                            <span>作业特色:</span>
                            <Space width={10} />
                            <textarea
                                value={special}
                                onChange={() => { }}
                                rows="8"
                                disabled={disabledStr}
                                className="wi-input-content disable-resize"
                            ></textarea>
                        </div>
                    </Col>
                    <Col xs={6} md={2} className="show-grid">
                        {
                            disabled ?
                                <div style={{ paddingLeft: "25%" }}>
                                    <Button bsStyle="primary">提交</Button>
                                    <br /><br />
                                    <Button bsStyle="primary">取消</Button>
                                </div>
                                : null
                        }
                    </Col>
                </Row>

                <Row >
                    <Col xs={12} className="show-grid">
                        <span>作业截图:</span>
                        <Space width={10} />
                        {
                            imgs.map((value, index) => (
                                <img key={index} className="wi-img" src={value} />
                            ))
                        }
                    </Col>
                </Row>
            </Modal>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

const mapStateToProps = state => {
    return {
        workInfo: state.message.workInfo,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);