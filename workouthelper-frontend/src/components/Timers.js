import React, { useEffect } from 'react'
import {
  useDispatch, useSelector
} from 'react-redux'
import { getTooltips } from '../reducers/profileReducer'
import { logout } from '../reducers/userReducer'
import storage from '../utils/storage'

import { Container } from 'react-bootstrap'

import CountdownTimer from './Timers/CountdownTimer'
import Metronome from './Timers/Metronome'
import Stopwatch from './Timers/Stopwatch'

import theme from '../theme'
import Dashboard from './Dashboard'
import Footer from './Footer'

const styles = {
  subtitle: {
    color: theme.colors.darkPink,
    fontFamily: theme.fontFamilies.quantico,
    fontSize: theme.fontSizes.subtitle,
  },
}

const Timers = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (storage.loadUser() === null) {
      dispatch(logout())
    } else {
      clearTimeout(storage.loadTimeout())
      dispatch(getTooltips())
    }
  }, [])

  storage.saveTab('timers')

  const tooltips = useSelector(state => state.profile.tooltips)

  return (
    <Container>
      <Dashboard />
      <h2 style={styles.subtitle}>Timers</h2>
      <Stopwatch tooltips={tooltips} />
      <CountdownTimer tooltips={tooltips} />
      <Metronome tooltips={tooltips} />
      <br /><br />
      <br /><br />
      <Footer />
    </Container>
  )
}

export default Timers