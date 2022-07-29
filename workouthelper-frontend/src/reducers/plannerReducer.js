import plannerService from '../services/plannerService'

const plannerReducer = (state = [], action) => {
  switch (action.type) {
  case 'CREATE_PLAN':
    return action.data
  case 'DELETE_PLAN':
    return 'Your plan has been removed.'
  case 'GET_PLANS':
    return action.data
  default:
    return state
  }
}

export const createPlan = (newPlan) => {
  return async dispatch => {
    dispatch({
      type: 'CREATE_PLAN',
      data: {
        plan: newPlan,
      }
    })
  }
}

export const deletePlan = () => {
  return async dispatch => {
    dispatch({
      type: 'DELETE_PLAN',
    })
  }
}

export const getPlans = () => {
  return async dispatch => {
    const data = await plannerService.getAll()
    dispatch({
      type: 'GET_PLANS',
      data: {
        plans: data,
      }
    })
  }
}

export default plannerReducer