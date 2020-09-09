import React from "react";
import "./item.css";

const MsgLstItem = (props) => {
    return (
        <div style={{ width: "30%", margin: "0 auto" }}>
            <div style={{ border: "1px solid black" }}>
                <span style={{ float: "left" }}>
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    <i class="fa fa-bell-o" aria-hidden="true"></i>
                    <i class="fa fa-envelope-o" aria-hidden="true"></i>
                </span>
                <span>内容</span>
                <span style={{ float: "right" }}>时间</span>
                <span style={{ float: "right" }}>操作按钮2</span>
                <span style={{ float: "right" }}>操作按钮1</span>
            </div>
        </div>
    )
}

export default MsgLstItem;