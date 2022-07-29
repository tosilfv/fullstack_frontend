import React, {
  useEffect, useState,
} from 'react'
import { useSelector } from 'react-redux'

import {
  Button, Container, Form, Tab, Tabs,
} from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

import Buttons from './Settings/Buttons'
import Color from './Settings/Color'

import theme from '../../theme'

import beatAudio from '../../sounds/beat.mp3'

const styles = {
  advance: {
    display: theme.displays.flex,
    justifyContent: theme.justifications.center,
  },
  bpm: {
    color: theme.colors.darkPink,
    display: theme.displays.flex,
    fontFamily: theme.fontFamilies.quantico,
    fontSize: theme.fontSizes.subtitle,
    justifyContent: theme.justifications.center,
  },
  timerDigit: {
    display: theme.displays.flex,
    fontFamily: theme.fontFamilies.langar,
    fontSize: theme.fontSizes.title,
    justifyContent: theme.justifications.center,
  },
}

const Metronome = ({ tooltips }) => {
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [showBpm, setShowBpm] = useState(60)
  const [bpm, setBpm] = useState(60)
  const [color, setColor] = useState(null)
  const [light, setLight] = useState(false)

  const beat = new Audio(beatAudio)

  useEffect(() => {
    let countBeat = null
    const millisecondsToNextBeat = Math.floor((60 / bpm) * 1000)

    if (isActive === true && isPaused === false) {
      countBeat = setInterval(() => {
        beat.play()
        setLight(true)
      }, millisecondsToNextBeat)
    } else {
      clearInterval(countBeat)
    }

    return () => {
      clearInterval(countBeat)
    }

  }, [isActive, isPaused])

  const newColor = useSelector(state => state.timers.metronomeColor)

  useEffect(() => {
    handleReset()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLight(false)
    }, 40)
  }, [light])

  useEffect(() => {
    if (newColor !== undefined) {
      setColor(newColor)
    }
  }, [newColor])

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
    setBpm(60)
    setShowBpm(60)
  }

  const handleShowBpm = (event) => {
    const newBpm = (event.target.value)
    setShowBpm(newBpm)
  }

  const handleBpm = (event) => {
    event.preventDefault()
    setIsActive(false)
    setIsPaused(true)
    setBpm(showBpm)
  }

  return (
    <>
      <Form.Group controlId="formTimersMetronome">
        <Tabs defaultActiveKey="metronome" className="mb-3">
          <Tab eventKey="metronome" title="Metronome" disabled>
            <Container>
              <br /><br />
              <Container style={styles.timerDigit}>
                {light ? (
                  <FontAwesomeIcon style={{ color: color }} icon={faCircle} />
                ) : (
                  <FontAwesomeIcon style={{ color: 'white' }} icon={faCircle} />
                )}
              </Container>
              <br /><br />
              <Form onSubmit={handleBpm}>
                <Form.Range
                  onChange={handleShowBpm}
                  value={showBpm}
                  type="range"
                  min="10"
                  max="300"
                />
                <div style={styles.bpm}>
                  {showBpm}
                </div>
                <div style={styles.advance}>
                  <Button size="lg" variant="outline-success" type="submit" className="mb-3">
                    Set BPM
                  </Button>
                </div>
              </Form>
              <Buttons
                isPaused={isPaused}
                handleStart={handleStart}
                handlePause={handlePause}
                handleReset={handleReset}
                tooltips={tooltips}
              />
              <Color tooltips={tooltips} />
            </Container>
          </Tab>
        </Tabs>
      </Form.Group>
    </>
  )
}

export default Metronome