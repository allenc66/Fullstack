const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SHOW':
            return action.data

        case 'HIDE':
            return null

        default:
          return state
      }
}


export const showNotification = (notificationText, time) => {
    window.clearTimeout(window.timeout)

    return async (dispatch) => {
        dispatch({
            type: 'SHOW',
            data: notificationText
        })

        window.timeout = setTimeout(
            () => dispatch(hidenotification()),
            time * 1000
        )
    }
}

const hidenotification = () => ({
    type: 'HIDE'
})

export default notificationReducer
