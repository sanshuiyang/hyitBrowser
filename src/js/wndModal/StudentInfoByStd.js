import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";
import Button from "../components/button";
import Space from "../components/space";
import * as alertActions from "../alert/actions"

class Index extends Component {
    constructor(props) {
        super(props);

        this.workInfo = this.workInfo.bind(this);
        this.onlineShow = this.onlineShow.bind(this);
    }

    workInfo = (nameAndWorkName) => {
        if (this.checkLegality(nameAndWorkName)) {

        }
    }

    onlineShow = (nameAndWorkName) => {
        console.log(nameAndWorkName);
        if (this.checkLegality(nameAndWorkName)) {

        }else{
            console.log("看别人的介绍")
        }
    }

    //检查是否只操作自己
    checkLegality = (nameAndWorkName) => {
        const { userInfo, showAlert } = this.props;
        if (userInfo.userName == nameAndWorkName.name) {
            console.log(userInfo.userName == nameAndWorkName.name)
            return true;
        }
        showAlert("info", "无法操作。");
        return false;
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
                                    <Button onClick={() => this.workInfo({ name: value.name, workName: value.workName })}>提交作业</Button>
                                    <Space width={5} />
                                    <Button onClick={() => this.onlineShow({ name: value.name, workName: value.workName })}>作业介绍</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        )

        return (
            <div style={{ height: "650px", overflow: "auto" }}>
                <TableDate />
            </div>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
