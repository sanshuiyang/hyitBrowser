import React from "react";
import TestCom from "./components/buttons";

const Index = () => {
    const GetSth = sth => {
        console.log("get sth +" + sth);
    }
    return <div>
        <TestCom
            l_title="消息"
            r_title="通知"
            l_key="notice"
            r_key="msg"
            onDoSth={GetSth}
        />
    </div>
}

export default Index;