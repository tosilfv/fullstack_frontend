const userReducer = (state = [], action) => {
  switch (action.type) {
  case 'CREATE_USER':
    return [...state, action.data]
  case 'DELETE_USER':
    return 'Your profile has been removed.'
  case 'LOGIN':
    return action.data.loggedIn
  case 'LOGOUT':
    return 'You logged out.'
  default:
    return state
  }
}

export const createUser = (newUser) => {
  return async dispatch => {
    dispatch({
      type: 'CREATE_USER',
      data: {
        user: newUser,
      }
    })
  }
}

export const deleteUser = () => {
  return async dispatch => {
    dispatch({
      type: 'DELETE_USER',
    })
  }
}

export const login = (user) => {
  return async dispatch => {
    dispatch({
      type: 'LOGIN',
      data: {
        loggedIn: user,
      }
    })
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch({
      type: 'LOGOUT',
    })
  }
}

export default userReducer