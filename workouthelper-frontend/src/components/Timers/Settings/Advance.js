import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  newCountdownAdvance, newStopwatchAdvance,
} from '../../../reducers/timersReducer'

import {
  Button, Form, OverlayTrigger,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHourglassStart } from '@fortawesome/free-solid-svg-icons'

import { advanceTooltip } from '../../Tooltips'

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

const Advance = ({ tooltips, timer }) => {
  const [addOneHundreth, setAddOneHundreth] = useState(false)

  const dispatch = useDispatch()

  // Advance needs to dispatch a different integer number each time Set ' '' is pressed
  const handleAdvance = (event) => {
    event.preventDefault()
    const advance = (event.target.minutes.value * 60000) + (event.target.seconds.value * 1000)
    if (advance > 0 && !addOneHundreth === true) {
      timer === 'countdown' && dispatch(newCountdownAdvance(parseInt(advance + 10)))
      timer === 'stopwatch' && dispatch(newStopwatchAdvance(parseInt(advance + 10)))
      setAddOneHundreth(!addOneHundreth)
    }
    if (advance > 0 && !addOneHundreth === false) {
      timer === 'countdown' && dispatch(newCountdownAdvance(parseInt(advance - 10)))
      timer === 'stopwatch' && dispatch(newStopwatchAdvance(parseInt(advance - 10)))
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
          overlay={advanceTooltip}
        >
          <Form onSubmit={handleAdvance}>
            <div style={styles.timerInput}>
              <div>
                <FontAwesomeIcon icon={faHourglassStart} />
              </div>
              <div>
                &nbsp;Advance
              </div>
            </div>
            <div style={styles.timerInput}>
              <div style={styles.advance} className="mb-3">
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
              Set&nbsp;&nbsp;&rsquo;&nbsp;&rsquo;&rsquo;
            </Button>
          </Form>
        </OverlayTrigger>
      ) : (
        <Form onSubmit={handleAdvance}>
          <div style={styles.timerInput}>
            <div>
              <FontAwesomeIcon icon={faHourglassStart} />
            </div>
            <div>
              &nbsp;Advance
            </div>
          </div>
          <div style={styles.timerInput}>
            <div style={styles.advance} className="mb-3">
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
            Set&nbsp;&nbsp;&rsquo;&nbsp;&rsquo;&rsquo;
          </Button>
        </Form>
      )}
    </div>
  )
}

export default Advance