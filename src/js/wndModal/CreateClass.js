import React, { Component } from "react";
import Modal from "../components/modal";
import Button from "../components/button";
import Radio from "../components/radioBtn";
import { DropdownButton, MenuItem } from "react-bootstrap";

const modeRadioList = [
    {
        value: "single",
        name: "mode",
        content: "小组模式"
    },
    {
        value: "single",
        name: "mode",
        content: "单人模式"
    }
]

const submitWorkList = [
    {
        value: "all",
        name: "work",
        content: "小组集体提交"
    },
    {
        value: "one",
        name: "work",
        content: "学员单独提交"
    }
]

class Index extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { onHide } = this.props;
        return (
            <>
                <Modal
                    onHide={onHide}
                >
                    <div className="create-class-container">
                        <div>
                            <span className="title">年级：</span>
                            <span className="cls-content">
                                <DropdownButton
                                    bsStyle={"Default".toLowerCase()}
                                    title={"titldawdawdawdawde"}
                                    id="create-class-dropdown"
                                    className="dropdown-header"
                                >
                                    <MenuItem eventKey="1">Action</MenuItem>
                                    <MenuItem eventKey="2">Another action</MenuItem>
                                    <MenuItem eventKey="4">Separated link</MenuItem>
                                </DropdownButton>
                            </span>
                        </div>
                        <div>
                            <span className="title">班级名称：</span>
                            <span className="cls-content">
                                <input
                                    placeholder="班级名称"
                                    type="text"
                                    className="cls-input-name"
                                />
                            </span>
                        </div>
                        <div>
                            <span className="title">学习形式：</span>
                            <span className="cls-content">
                                <Radio list={modeRadioList} />
                            </span>
                        </div>
                        <div>
                            <span className="title">小组人数：</span>
                            <span className="cls-content">
                                <input className="input-num" type="numbers" /> ~ 
                                <input className="input-num" type="numbers" />
                            </span>
                        </div>
                        <div>
                            <span className="title">提交作业方式：</span>
                            <span className="cls-content">
                                <Radio list={submitWorkList} />
                            </span>
                        </div>
                        <div>
                            <span className="cls-sub">
                                <Button
                                    className="cls-sub-btn"
                                >
                                    提交操作
                                </Button>
                            </span>
                        </div>
                    </div>
                </Modal>
            </>
        )

    }
}

export default Index;