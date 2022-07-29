import {
  applyMiddleware, combineReducers, createStore
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import plannerReducer from './reducers/plannerReducer'
import profileReducer from './reducers/profileReducer'
import timersReducer from './reducers/timersReducer'
import userReducer from './reducers/userReducer'
import workoutReducer from './reducers/workoutReducer'

const reducer = combineReducers({
  planner: plannerReducer,
  profile: profileReducer,
  timers: timersReducer,
  user: userReducer,
  workout: workoutReducer,
})

export default createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
))