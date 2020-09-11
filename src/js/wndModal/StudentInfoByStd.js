import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";
import Button from "../components/button";
import Space from "../components/space";
import * as alertActions from "../alert/actions";
import * as msgActions from "./actions";
import ConfirmBox from "../components/confirmBox";

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showConfirmBox: false
        }

        this.workInfo = this.workInfo.bind(this);
        this.submitWork = this.submitWork.bind(this);
        this.handleSure = this.handleSure.bind(this);
    }

    workInfo = (nameAndWorkName) => {
        const { showWorkInfo } = this.props;

        if (this.checkLegality(nameAndWorkName)) {
            showWorkInfo(nameAndWorkName, true);
        } else {
            console.log("看别人的介绍")
            showWorkInfo(nameAndWorkName, false);
        }
    }

    submitWork = (nameAndWorkName) => {
        console.log(nameAndWorkName);
        if (this.checkLegality(nameAndWorkName)) {
            this.setState({
                showConfirmBox: true,
            })
        }
    }

    //检查是否只操作自己
    checkLegality = (nameAndWorkName) => {
        const { userInfo, showAlert } = this.props;
        if (userInfo.userName == nameAndWorkName.name) {
            console.log(userInfo.userName == nameAndWorkName.name)
            return true;
        }
        showAlert("info", "非本人，无法操作。");
        return false;
    }

    handleSure = () => {
        this.setState({
            showConfirmBox: !this.state.showConfirmBox
        })
    }

    render() {
        const { workList } = this.props;
        const TableDate = () => (
            <Table striped bordered condensed hover >
                <thead className="thead">
                    <tr>
                        <th>姓名</th>
                        <th>作业名</th>
                        <th style={{ width: "10%" }}>分数</th>
                        <th style={{ width: "25%" }}>操作</th>
                    </tr>
                </thead>
                <tbody className="tbody">
                    {
                        workList.map((value, index) => (
                            <tr key={index}>
                                <td>{value.name}</td>
                                <td>{value.workName}</td>
                                <td>{value.score}</td>
                                <td>
                                    <Button onClick={() => this.submitWork({ name: value.name, workName: value.workName })}>提交作业</Button>
                                    <Space width={5} />
                                    <Button onClick={() => this.workInfo({ name: value.name, workName: value.workName })}>作业介绍</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        )

        return (
            <>
                <div style={{ height: "650px", overflow: "auto" }}>
                    <TableDate />
                </div>
                {
                    this.state.showConfirmBox
                        ?
                        <ConfirmBox
                            onSure={this.handleSure}
                            onBack={() => { this.setState({ showConfirmBox: !this.state.showConfirmBox }) }}
                            content="提交作业!"
                            show={this.state.showConfirmBox}
                        /> : null
                }
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        workList: state.message.workList,
        userInfo: state.browser.userInfo,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showAlert: (type, message) => dispatch(alertActions.set({ type: type, message: message })),
        showWorkInfo: (unAndTitle, disabled) => dispatch(msgActions.ShowWorkInfo(unAndTitle, disabled)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
