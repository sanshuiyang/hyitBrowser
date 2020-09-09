import web from "../web";

export const REFUSE = "msg/Refuse";
export const AGREE = "msg/Agree";
export const REMOVE = "msg/Remove";
export const FETCH_MSG_LIST = "msg/FetchMsgList";
export const SET_MSG_LIST = "msg/SetMsgList";

export const refusse = msg => {
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
        type: CLEAR,
        msg
    })
}

export const fetchMsgList = () => {
    return function (dispatch) {
        return web.FetchMsgList().then(res => {
            console.log("拉取到了消息列表");

            dispatch()
        })
    }
}

export const setMsgList = (msgList) => ({
    type: SET_MSG_LIST,
    msgList,
})