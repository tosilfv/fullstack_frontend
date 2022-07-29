const timersReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_COUNTDOWN':
    return action.data
  case 'NEW_COUNTDOWN_ADVANCE':
    return action.data
  case 'NEW_STOPWATCH_ADVANCE':
    return action.data
  case 'TOGGLE_COUNTDOWN_BOP':
    return action.data
  case 'TOGGLE_STOPWATCH_BOP':
    return action.data
  case 'NEW_METRONOME_COLOR':
    return action.data
  default:
    return state
  }
}

export const newCountdown = (newCountdown) => {
  return async dispatch => {
    dispatch({
      type: 'NEW_COUNTDOWN',
      data: {
        countdown: newCountdown,
      }
    })
  }
}

export const newCountdownAdvance = (newCountdownAdvance) => {
  return async dispatch => {
    dispatch({
      type: 'NEW_COUNTDOWN_ADVANCE',
      data: {
        countdownAdvance: newCountdownAdvance,
      }
    })
  }
}

export const newStopwatchAdvance = (newStopwatchAdvance) => {
  return async dispatch => {
    dispatch({
      type: 'NEW_STOPWATCH_ADVANCE',
      data: {
        stopwatchAdvance: newStopwatchAdvance,
      }
    })
  }
}

export const toggleCountdownBop = (toggleCountdownBop) => {
  return async dispatch => {
    dispatch({
      type: 'TOGGLE_COUNTDOWN_BOP',
      data: {
        countdownBop: toggleCountdownBop,
      }
    })
  }
}

export const toggleStopwatchBop = (toggleStopwatchBop) => {
  return async dispatch => {
    dispatch({
      type: 'TOGGLE_STOPWATCH_BOP',
      data: {
        stopwatchBop: toggleStopwatchBop,
      }
    })
  }
}

export const newMetronomeColor = (newMetronomeColor) => {
  return async dispatch => {
    dispatch({
      type: 'NEW_METRONOME_COLOR',
      data: {
        metronomeColor: newMetronomeColor,
      }
    })
  }
}

export default timersReducer