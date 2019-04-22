export const CLEAR = 'progress/CLEAR';
export const SHOWPROGRESS = 'progress/SHOWPROGRESS';

export const showProgress = progress => {
    return (dispatch) => {
        if (progress.now < 0) {
            dispatch({
                type: CLEAR,
                progress: {
                    now:-1,
                }
            })
        }

        dispatch({
            type: SHOWPROGRESS,
            progress: {
                ...progress,
            }
        })
    }
}

export const clear = () => {
    return {
        type: CLEAR,
    }
}