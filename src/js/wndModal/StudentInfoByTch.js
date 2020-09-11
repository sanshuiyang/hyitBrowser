import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";
import Button from "../components/button";
import Space from "../components/space";

class Index extends Component {
    constructor(props) {
        super(props);

        this.jobInfo = this.jobInfo.bind(this);
        this.onlineShow = this.onlineShow.bind(this);
    }

    jobInfo = (nameAndJobName) => {
        console.log(nameAndJobName);
    }

    onlineShow = (nameAndJobName) => {
        console.log(nameAndJobName);
    }

    render() {
        const { jobList } = this.props;
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
                        jobList.map((value, index) => (
                            <tr key={index}>
                                <td>{value.name}</td>
                                <td>{value.jobName}</td>
                                <td>{value.score}</td>
                                <td>
                                    <Button onClick={() => this.jobInfo({ name: value.name, jobName: value.jobName })}>作业介绍</Button>
                                    <Space width={5} />
                                    <Button onClick={() => this.onlineShow({ name: value.name, jobName: value.jobName })}>在线观看</Button>
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
        jobList: state.message.jobList,
    }
}

export default connect(mapStateToProps, null)(Index);
