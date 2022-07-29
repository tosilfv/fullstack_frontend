import workoutService from '../services/workoutService'

const workoutReducer = (state = [], action) => {
  switch (action.type) {
  case 'CREATE_WORKOUT':
    return action.data
  case 'DELETE_WORKOUT':
    return 'Your workout has been removed.'
  case 'GET_WORKOUTS':
    return action.data
  default:
    return state
  }
}

export const createWorkout = (newWorkout) => {
  return async dispatch => {
    dispatch({
      type: 'CREATE_WORKOUT',
      data: {
        workout: newWorkout,
      }
    })
  }
}

export const deleteWorkout = () => {
  return async dispatch => {
    dispatch({
      type: 'DELETE_WORKOUT',
    })
  }
}

export const getWorkouts = () => {
  return async dispatch => {
    const data = await workoutService.getAll()
    dispatch({
      type: 'GET_WORKOUTS',
      data: {
        workouts: data,
      }
    })
  }
}

export default workoutReducer