import React, {
  useEffect, useState,
} from 'react'
import { useSelector } from 'react-redux'

import {
  Container, Form, Tab, Tabs,
} from 'react-bootstrap'

import Buttons from './Settings/Buttons'
import Countdown from './Settings/Countdown'
import Digits from './Settings/Digits'
import Settings from './Settings/Settings'

import bopAudio from '../../sounds/bop.mp3'

const CountdownTimer = ({ tooltips }) => {
  const [time, setTime] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [bopSound, setBopSound] = useState(false)
  const [isAdvance, setIsAdvance] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const bop = new Audio(bopAudio)

  useEffect(() => {
    let countOneHundreth = null

    if (isActive === true && isPaused === false) {
      countOneHundreth = setInterval(() => {
        setTime(t => eval(t - 10))
      }, 10)
    } else {
      clearInterval(countOneHundreth)
    }

    return () => {
      clearInterval(countOneHundreth)
    }

  }, [isActive, isPaused])

  const newAdvance = useSelector(state => state.timers.countdownAdvance)
  const toggleBop = useSelector(state => state.timers.countdownBop)
  const newCountdown = useSelector(state => state.timers.countdown)

  useEffect(() => {
    if (newCountdown !== undefined  && newCountdown > 0) {
      setCountdown(newCountdown)
      setIsAdvance(false)
      setIsActive(false)
      setIsPaused(true)
      if (newCountdown % 1000 === 10) {
        const count = newCountdown - 10
        setTime(count)
      }
      if (newCountdown % 1000 === 990) {
        const count = newCountdown + 10
        setTime(count)
      }
    }
  }, [newCountdown])

  useEffect(() => {
    if (newAdvance !== undefined  && newAdvance > 0) {
      setIsAdvance(true)
      setIsActive(false)
      setIsPaused(true)
      if (newAdvance % 1000 === 10) {
        const advance = newAdvance - 10
        setTime(advance)
      }
      if (newAdvance % 1000 === 990) {
        const advance = newAdvance + 10
        setTime(advance)
      }
    }
  }, [newAdvance])

  useEffect(() => {
    handleReset()
  }, [])

  useEffect(() => {
    if (isAdvance === true && time === 0) {
      bopSound && bop.play()
      setIsAdvance(false)
      if (countdown % 1000 === 10) {
        const count = countdown - 10
        setTime(count)
      }
      if (countdown % 1000 === 990) {
        const count = countdown + 10
        setTime(count)
      }
    }
  }, [time])

  useEffect(() => {
    if (time < 0) {
      bopSound && bop.play()
      handleReset()
    }
  }, [time])

  useEffect(() => {
    if (toggleBop !== undefined) {
      setBopSound(toggleBop)
    }
  }, [toggleBop])

  const handleStart = () => {
    if (time > 0) {
      setIsActive(true)
      setIsPaused(false)
    }
  }

  const handlePause = () => {
    setIsPaused(true)
  }

  const handleReset = () => {
    setIsActive(false)
    setIsPaused(true)
    setTime(0)
    setIsAdvance(false)
    setCountdown(0)
  }

  return (
    <>
      <Form.Group controlId="formTimersCountdown">
        <Tabs defaultActiveKey="countdownTimer" className="mb-3">
          <Tab eventKey="countdownTimer" title="Countdown Timer" disabled>
            <Container>
              <Digits time={time} />
              <Buttons
                isPaused={isPaused}
                handleStart={handleStart}
                handlePause={handlePause}
                handleReset={handleReset}
                tooltips={tooltips}
              />
              <Countdown tooltips={tooltips} />
              <Settings tooltips={tooltips} timer="countdown" />
            </Container>
          </Tab>
        </Tabs>
      </Form.Group>
    </>
  )
}

export default CountdownTimer