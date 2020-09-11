import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";
import Button from "../components/button";
import Space from "../components/space";

class Index extends Component {
    constructor(props) {
        super(props);

        this.workInfo = this.workInfo.bind(this);
        this.onlineShow = this.onlineShow.bind(this);
    }

    workInfo = (nameAndWorkName) => {
        console.log(nameAndWorkName);
    }

    onlineShow = (nameAndWorkName) => {
        console.log(nameAndWorkName);
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
                                    <Button onClick={() => this.workInfo({ name: value.name, workName: value.workName })}>作业介绍</Button>
                                    <Space width={5} />
                                    <Button onClick={() => this.onlineShow({ name: value.name, workName: value.workName })}>在线观看</Button>
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
    }
}

export default connect(mapStateToProps, null)(Index);
