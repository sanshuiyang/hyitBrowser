import React from "react";
import Button from "../components/button";
import "./item.css";

const MsgLstItem = (props) => {
    const { infoType, content, btn1, btn2, time } = props;

    const Icon = (infoType) => {
        switch (infoType) {
            case "info":
                return <i className="fa fa-info-circle" aria-hidden="true"></i>
            case "notice":
                return <i className="fa fa-bell-o" aria-hidden="true"></i>
            case "envelope":
                return <i className="fa fa-envelope-o" aria-hidden="true"></i>
        }
    }

    return (
        <div className="item-contanier">
            {Icon(infoType)}
            <span className="content">{content}</span>
            <span>
                {
                    infoType == "envelope" && btn1 ? <Button bsStyle="primary">{btn1}</Button> : null
                }
            </span>
            <span>
                {
                    infoType == "envelope" && btn2 ? <Button bsStyle="primary">{btn2}</Button> : null
                }
            </span>
            <span className="time">{time}</span>
        </div>
    )
}

export default MsgLstItem;