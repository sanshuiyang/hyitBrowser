import * as actionsMsg from "./actions";

const removeMsg = (list, msgToRemove, lookup) => {
    const idx = list.findIndex(msg => lookup(msg) === msgToRemove);

    if (idx == -1) {
        return list;
    }

    return [...list.slice(0, idx), ...list.slice(idx + 1)];
}

export default (
    state = {
        msgList: [],
    },
    action
) => {
    switch (action.type) {
        case actionsMsg.REMOVE:
            return Object.assign({}, state, {
                list: removeMsg(list, action.msg, msg => msg.name)
            })
        case actionsMsg.SET_MSG_LIST:
            return Object.assign({}, state, {
                list: action.msgList
            })
    }
}