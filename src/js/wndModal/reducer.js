import * as actionsMsg from "./actions";
import Moment from "moment";

const removeMsg = (list, msgToRemove, lookup) => {
    const idx = list.findIndex(msg => lookup(msg) === msgToRemove);

    if (idx == -1) {
        return list;
    }

    return [...list.slice(0, idx), ...list.slice(idx + 1)];
}

const random = () => {
    let temp = Math.floor(Math.random() * 7)
    return temp == 1 ? "info" : temp == 2 ? "notice" : "envelope";

}

const initalState = {
    msgList: [
        {
            infoType: random(),
            content: "请杨老师在大场景漫游一班选两个优秀作品进行展示。",
            btn1: "通过",
            btn2: "拒绝",
            time: Moment().format("YYYY-MM-DD"),
        },
        {
            infoType: random(),
            content: "请杨老师在大场景漫游一班选两个优秀作品进行展示。",
            btn1: "通过",
            btn2: "拒绝",
            time: Moment().format("YYYY-MM-DD"),
        },
        {
            infoType: random(),
            content: "请杨老师在大场景漫游一班选两个优秀作品进行展示。",
            btn1: "通过",
            btn2: "拒绝",
            time: Moment().format("YYYY-MM-DD"),
        },
        {
            infoType: random(),
            content: "请杨老师在大场景漫游一班选两个优秀作品进行展示。",
            btn1: "通过",
            btn2: "拒绝",
            time: Moment().format("YYYY-MM-DD"),
        },
        {
            infoType: random(),
            content: "请杨老师在大场景漫游一班选两个优秀作品进行展示。",
            btn1: "通过",
            btn2: "拒绝",
            time: Moment().format("YYYY-MM-DD"),
        },
        {
            infoType: random(),
            content: "请杨老师在大场景漫游一班选两个优秀作品进行展示。",
            btn1: "通过",
            btn2: "拒绝",
            time: Moment().format("YYYY-MM-DD"),
        },
        {
            infoType: random(),
            content: "请杨老师在大场景漫游一班选两个优秀作品进行展示。",
            btn1: "qweq",
            btn2: "asd",
            time: Moment().format("YYYY-MM-DD"),
        },
    ],
}

export default (
    state = initalState,
    action
) => {
    switch (action.type) {
        case actionsMsg.REMOVE:
            return Object.assign({}, state, {
                msgList: removeMsg(state.msgList, action.msg, msg => msg.name)
            })
        case actionsMsg.SET_MSG_LIST:
            return Object.assign({}, state, {
                msgList: action.msgList
            })
        default:
            return state
    }
}