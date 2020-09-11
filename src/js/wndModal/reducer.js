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

const generateWork = () => {
    let temp = [];
    for (let i = 1; i <= 35; i++) {
        temp.push({
            name: "三水" + i,
            workName: "三水的作业" + i,
            score: Math.floor(Math.random() * 50) + 50,
        })
    }
    return temp;
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
    workList: generateWork(),
    workInfo:{
        owner:"三水1",
        title:"三水的作业1",
        introduce:"介绍文本，是这里吗？",
        special:"项目有啥子特色，来唠嗑呀。",
        imgs:[
            "https://tse2-mm.cn.bing.net/th/id/OIP.5p1GY9PTMVkirIL90Mp6XgHaE7?w=295&h=195&c=7&o=5&pid=1.7",
            "https://tse2-mm.cn.bing.net/th/id/OIP.5p1GY9PTMVkirIL90Mp6XgHaE7?w=295&h=195&c=7&o=5&pid=1.7",
            "https://tse2-mm.cn.bing.net/th/id/OIP.5p1GY9PTMVkirIL90Mp6XgHaE7?w=295&h=195&c=7&o=5&pid=1.7",
        ]
    }
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
        case actionsMsg.SET_WORK_INfO:
            return Object.assign({},state,{
                workInfo:action.workInfo
            })
        default:
            return state
    }
}