import React, {
  useEffect, useState,
} from 'react'
import { useSelector } from 'react-redux'

import {
  Container, Form, Tab, Tabs,
} from 'react-bootstrap'

import Buttons from './Settings/Buttons'
import Digits from './Settings/Digits'
import Settings from './Settings/Settings'

import bopAudio from '../../sounds/bop.mp3'

const Stopwatch = ({ tooltips }) => {
  const [time, setTime] = useState(0)
  const [operator, setOperator] = useState('+')
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [bopSound, setBopSound] = useState(false)

  const bop = new Audio(bopAudio)

  useEffect(() => {
    let countOneHundreth = null

    if (isActive === true && isPaused === false) {
      countOneHundreth = setInterval(() => {
        setTime(t => eval(t + operator + 10))
      }, 10)
    } else {
      clearInterval(countOneHundreth)
    }

    return () => {
      clearInterval(countOneHundreth)
    }

  }, [operator, isActive, isPaused])

  const newAdvance = useSelector(state => state.timers.stopwatchAdvance)
  const toggleBop = useSelector(state => state.timers.stopwatchBop)

  // this is a workaround for Advance Set ' '' feature:
  // useEffect only activates if current newAdvance value is different from previous
  // one and based on the parameter parseInt(advance +- 10) set in Advance, it
  // now has to adjust the newAdvance value back to Set ' '' value for the time to set
  // to the input value
  useEffect(() => {
    if (newAdvance !== undefined  && newAdvance > 0) {
      setIsActive(false)
      setIsPaused(true)
      setOperator('-')
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
    if (time < 0) {
      bopSound && bop.play()
      setOperator('+')
    }
  }, [time])

  useEffect(() => {
    if (toggleBop !== undefined) {
      setBopSound(toggleBop)
    }
  }, [toggleBop])

  const handleStart = () => {
    setIsActive(true)
    setIsPaused(false)
  }

  const handlePause = () => {
    setIsPaused(true)
  }

  const handleReset = () => {
    setIsActive(false)
    setIsPaused(true)
    setTime(0)
    setOperator('+')
  }

  return (
    <>
      <Form.Group controlId="formTimersStopwatch">
        <Tabs defaultActiveKey="stopwatch" className="mb-3">
          <Tab eventKey="stopwatch" title="Stopwatch" disabled>
            <Container>
              <Digits time={time} />
              <Buttons
                isPaused={isPaused}
                handleStart={handleStart}
                handlePause={handlePause}
                handleReset={handleReset}
                tooltips={tooltips}
              />
              <Settings tooltips={tooltips} timer="stopwatch" />
            </Container>
          </Tab>
        </Tabs>
      </Form.Group>
    </>
  )
}

export default Stopwatch