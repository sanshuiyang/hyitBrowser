import web from "../web";

export const REFUSE = "msg/Refuse";
export const AGREE = "msg/Agree";
export const REMOVE = "msg/Remove";
export const FETCH_MSG_LIST = "msg/FetchMsgList";
export const SET_MSG_LIST = "msg/SetMsgList";
export const SHOW_WORK_INFO = "msg/ShowWorkInfo";
export const FETCH_WORK_INFO = "msg/FetchWorkInfo";
export const SET_WORK_INfO = "msg/SetWorkInfo";

export const agree = msg => {
    return function (dispatch) {
        return web.Agree().then(res => {
            console.log("同意加入");

            dispatch(removeMsg(msg))
        });
    }
}

export const refusse = msg => {
    return function (dispatch) {
        return web.Refuse().then(res => {
            console.log("拒绝提示？");

            dispatch(removeMsg(msg))
        });
    }
}

export const removeMsg = msg => {
    return ({
        type: REMOVE,
        msg
    })
}

export const fetchMsgList = () => {
    return function (dispatch) {
        return web.FetchMsgList().then(res => {
            console.log("拉取到了消息列表");

            dispatch(setMsgList(res));
        })
    }
}

export const setMsgList = (msgList) => ({
    type: SET_MSG_LIST,
    msgList,
})

export const ShowWorkInfo = (nameAndTitle, disabled) => {
    return function (dispatch) {
        return web.FetchWorkInfo().then(res => {
            console.log("拉取到该作业的提交信息");
            let workInfo = {
                disabled,
                ...res
            }
            dispatch(setWorkInfo(workInfo));
        })
    }
}

export const setWorkInfo = workInfo => (
    {
        type: SET_WORK_INfO,
        workInfo
    }
)