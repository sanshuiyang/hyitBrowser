import React, { Component } from "react";
import Modal from "../components/modal";
import Btns from "../components/buttons";
import Button from "../components/button";
import DropDown from "../components/dropdown";

const grade = {
    title: "年级:",
    item: [
        "2020级上学期虚拟现实", "2020级下学期虚拟现实", "2021级上学期虚拟现实",
    ]
}

const teacher = {
    title: "任课教师:",
    item: [
        "2020级上学期虚拟现实", "2020级下学期虚拟现实", "2021级上学期虚拟现实",
    ]
}

const classAndGrade = {
    title: "班级:",
    item: [
        "2020级上学期虚拟现实", "2020级下学期虚拟现实", "2021级上学期虚拟现实",
    ]
}

const groupName = {
    title: "小组:",
    item: [
        "2020级上学期虚拟现实", "2020级下学期虚拟现实", "2021级上学期虚拟现实",
    ]
}


class Index extends Component {
    constructor(props) {
        super(props);

        this.switchPlane = this.switchPlane.bind(this);

        this.state = {
            l_key: "joinGroup",
            r_key: "createGroup",
            currentPlane: "joinGroup",
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
        const { onSure, onHide } = this.props;
        const { l_key, r_key, currentPlane } = this.state;
        return (
            <>
                <Modal
                    onHide={onHide}
                >
                    <Btns
                        l_title="加入小组"
                        r_title="创建小组"
                        l_key={l_key}
                        r_key={r_key}
                        onDoSth={this.switchPlane}
                        style={{ marginLeft: "35%" }}
                    />
                    {
                        currentPlane == l_key ?
                            <>
                                <DropDown obj={grade} />
                                <DropDown obj={teacher} />
                                <DropDown obj={classAndGrade} />
                                <DropDown obj={groupName} />
                                <Button onClick={() => { onSure(this.handleSure) }}>申请加入</Button>
                            </>
                            :
                            <>
                                <DropDown obj={grade} />
                                <DropDown obj={teacher} />
                                <DropDown obj={classAndGrade} />
                                <Button onClick={() => { onSure(this.handleSure) }}>申请创建</Button>
                            </>

                    }
                </Modal>
            </>
        )

    }
}

export default Index;