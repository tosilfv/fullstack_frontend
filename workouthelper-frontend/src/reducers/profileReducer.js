import profileService from '../services/profileService'

const profileReducer = (state = [], action) => {
  switch (action.type) {
  case 'CHANGED_PASSWORD':
    return 'Your password has been changed.'
  case 'GET_TOOLTIPS':
    return action.data
  default:
    return state
  }
}

export const changedPassword = () => {
  return async dispatch => {
    dispatch({
      type: 'CHANGED_PASSWORD',
    })
  }
}

export const getTooltips = () => {
  return async dispatch => {
    const data = await profileService.getTooltips()
    dispatch({
      type: 'GET_TOOLTIPS',
      data: {
        tooltips: data,
      }
    })
  }
}

export default profileReducer