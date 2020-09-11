import React from "react";
import TestCom from "./components/confirmBox";
import Moment from "moment";

const radioList = [
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

const dropdown = {
    title: "年级",
    item: [
        "2020级上学期虚拟现实", "2020级下学期虚拟现实", "2021级上学期虚拟现实",
    ]
}

class Index extends React.Component {
    // const GetSth = sth => {
    //     console.log("get sth +" + sth);
    // }
    // return <div>
    //     <TestCom
    //         l_title="消息"
    //         r_title="通知"
    //         l_key="notice"
    //         r_key="msg"
    //         onDoSth={GetSth}
    //     />
    // </div>
    constructor(props) {
        super(props);
        this.state = {
            show: true,
        }

        this.handleSure = this.handleSure.bind(this);
    }

    handleSure = () => {
        console.log("确定");
        console.log(this.state.show);
        this.setState({
            show: !this.state.show
        })
    }

    render() {
        return <TestCom
            onSure={this.handleSure}
            onBack={() => { this.setState({ show: !this.state.show }) }}
            content="提交作业。"
            show={this.state.show}
        />
    }
}

export default Index;