import React, { Component } from "react";
import Modal from "../components/modal";
import Button from "../components/button";
import Space from "../components/space";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux"

class Index extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { disabled, workInfo, } = this.props;
        
        const { workName, workIntroduce, workSpecial } = workInfo;

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
                                disabled={disabled}
                                className="wi-input-content"
                            >
                                {workName}
                            </input>
                        </div>
                        <div className="wi-item">
                            <span>作业介绍:</span>
                            <Space width={10} />
                            <textarea
                                value={workIntroduce}
                                onChange={() => { }}
                                rows="8"
                                className="wi-input-content disable-resize"
                            ></textarea>
                        </div>
                        <div className="wi-item">
                            <span>作业特色:</span>
                            <Space width={10} />
                            <textarea
                                value={workSpecial}
                                onChange={() => { }}
                                rows="8"
                                className="wi-input-content disable-resize"
                            ></textarea>
                        </div>
                    </Col>
                    <Col xs={6} md={2} className="show-grid">
                        {
                            true ?
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
                        <img className="wi-img" src="" />
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