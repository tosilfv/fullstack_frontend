import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { newCountdown } from '../../../reducers/timersReducer'

import {
  Button, Form, OverlayTrigger,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'

import { countdowntimerTimeTooltip } from '../../Tooltips'

import theme from '../../../theme'

const styles = {
  advance: {
    display: theme.displays.flex,
    justifyContent: theme.justifications.center,
  },
  timerInput: {
    display: theme.displays.flex,
    fontFamily: theme.fontFamilies.quantico,
    fontSize: theme.fontSizes.subheading,
    paddingBottom: theme.paddings.small,
  },
}

const Countdown = ({ tooltips }) => {
  const [addOneHundreth, setAddOneHundreth] = useState(false)

  const dispatch = useDispatch()

  const handleCountdown = (event) => {
    event.preventDefault()
    const advance = (event.target.hours.value * 3600000)
        + (event.target.minutes.value * 60000)
        + (event.target.seconds.value * 1000)
    if (advance > 0 && !addOneHundreth === true) {
      dispatch(newCountdown(parseInt(advance + 10)))
      setAddOneHundreth(!addOneHundreth)
    }
    if (advance > 0 && !addOneHundreth === false) {
      dispatch(newCountdown(parseInt(advance - 10)))
      setAddOneHundreth(!addOneHundreth)
    }
    event.target.reset()
  }

  return (
    <div className="mb-3">
      {tooltips ? (
        <OverlayTrigger
          placement="top"
          delay={{ show: 1000, hide: 0 }}
          overlay={countdowntimerTimeTooltip}
        >
          <Form onSubmit={handleCountdown}>
            <div style={styles.timerInput}>
              <div>
                <FontAwesomeIcon icon={faClock} />
              </div>
              <div>
                &nbsp;Time
              </div>
            </div>
            <div style={styles.timerInput}>
              <div style={styles.advance} className="mb-3">
                <Form.Control
                  name="hours"
                  type="number"
                  placeholder="00:"
                  min="0"
                  max="23"
                />
                <Form.Control
                  name="minutes"
                  type="number"
                  placeholder="00&rsquo;"
                  min="0"
                  max="59"
                />
                <Form.Control
                  name="seconds"
                  type="number"
                  placeholder="00&rsquo;&rsquo;"
                  min="0"
                  max="59"
                />
              </div>
            </div>
            <Button size="lg" variant="outline-success" type="submit">
                Set&nbsp;&nbsp;:&nbsp;&rsquo;&nbsp;&rsquo;&rsquo;
            </Button>
          </Form>
        </OverlayTrigger>
      ) : (
        <Form onSubmit={handleCountdown}>
          <div style={styles.timerInput}>
            <div>
              <FontAwesomeIcon icon={faClock} />
            </div>
            <div>
              &nbsp;Time
            </div>
          </div>
          <div style={styles.timerInput}>
            <div style={styles.advance} className="mb-3">
              <Form.Control
                name="hours"
                type="number"
                placeholder="00:"
                min="0"
                max="23"
              />
              <Form.Control
                name="minutes"
                type="number"
                placeholder="00&rsquo;"
                min="0"
                max="59"
              />
              <Form.Control
                name="seconds"
                type="number"
                placeholder="00&rsquo;&rsquo;"
                min="0"
                max="59"
              />
            </div>
          </div>
          <Button size="lg" variant="outline-success" type="submit">
              Set&nbsp;&nbsp;:&nbsp;&rsquo;&nbsp;&rsquo;&rsquo;
          </Button>
        </Form>
      )}
    </div>
  )
}

export default Countdown