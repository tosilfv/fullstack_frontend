import React, { useEffect } from 'react'
import {
  useDispatch, useSelector
} from 'react-redux'
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom'
import { login } from './reducers/userReducer'
import storage from './utils/storage'

import { Container } from 'react-bootstrap'

import Help from './components/Help'
import Login from './components/Login'
import Planner from './components/Planner'
import Profile from './components/Profile'
import Register from './components/Register'
import Statistics from './components/Statistics'
import Timers from './components/Timers'
import Workout from './components/Workout'

const App = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const user = storage.loadUser()
    if (user) {
      dispatch(login(user))
    }
  }, [dispatch])

  return (
    <Container>
      <Router>
        <Switch>
          <Route path="/dashboard/workout">
            {user === null || storage.loadUser() === null ? (
              <Redirect to="/welcome/login" />
            ) : (
              <Workout />
            )}
          </Route>
          <Route path="/dashboard/timers">
            {user === null || storage.loadUser() === null ? (
              <Redirect to="/welcome/login" />
            ) : (
              <Timers />
            )}
          </Route>
          <Route path="/dashboard/statistics">
            {user === null || storage.loadUser() === null ? (
              <Redirect to="/welcome/login" />
            ) : (
              <Statistics />
            )}
          </Route>
          <Route path="/dashboard/planner">
            {user === null || storage.loadUser() === null ? (
              <Redirect to="/welcome/login" />
            ) : (
              <Planner />
            )}
          </Route>
          <Route path="/dashboard/profile">
            {user === null || storage.loadUser() === null ? (
              <Redirect to="/welcome/login" />
            ) : (
              <Profile />
            )}
          </Route>
          <Route path="/dashboard/help">
            {user === null || storage.loadUser() === null ? (
              <Redirect to="/welcome/login" />
            ) : (
              <Help />
            )}
          </Route>
          <Route path="/welcome/login">
            {user === null || storage.loadUser() === null ? (
              <Login />
            ) : (
              <Redirect to="/dashboard/workout" />
            )}
          </Route>
          <Route path="/welcome/register">
            {user === null || storage.loadUser() === null ? (
              <Register />
            ) : (
              <Redirect to="/dashboard/workout" />
            )}
          </Route>
          <Route path="/">
            {storage.loadTab() === 'login' && <Redirect to="/welcome/login" />}
            {storage.loadTab() === 'register' && <Redirect to="/welcome/register" />}
            {storage.loadTab() === 'workout' && <Redirect to="/dashboard/workout" />}
            {storage.loadTab() === 'timers' && <Redirect to="/dashboard/timers" />}
            {storage.loadTab() === 'statistics' && <Redirect to="/dashboard/statistics" />}
            {storage.loadTab() === 'planner' && <Redirect to="/dashboard/planner" />}
            {storage.loadTab() === 'profile' && <Redirect to="/dashboard/profile" />}
            {storage.loadTab() === 'help' && <Redirect to="/dashboard/help" />}
            {storage.loadTab() === null && <Redirect to="/welcome/login" />}
          </Route>
        </Switch>
      </Router>
    </Container>
  )
}

export default App