import * as progressActions from "./actions";

const initalState = {
    show: false,
    now: -1,
}

export default (state = initalState, action) => {
    switch (action.type) {
        case progressActions.SHOWPROGRESS:
            return {
                show: true,
                now: action.progress.now,
            }
        case progressActions.CLEAR:
            return initalState
        default:
            return state
    }
}
