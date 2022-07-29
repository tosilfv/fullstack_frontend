import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  toggleCountdownBop, toggleStopwatchBop,
} from '../../../reducers/timersReducer'

import {
  Form, OverlayTrigger,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot } from '@fortawesome/free-solid-svg-icons'

import { bopTooltip } from '../../Tooltips'

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
  },
}

const Bop = ({ tooltips, timer }) => {
  const [isBop, setIsBop] = useState(false)
  const [bopLabel, setBopLabel] = useState('OFF')

  const dispatch = useDispatch()

  const handleClick = () => {
    if (!isBop === true) {
      setBopLabel('ON')
    } else {
      setBopLabel('OFF')
    }
    setIsBop(!isBop)
    timer === 'countdown' && dispatch(toggleCountdownBop(!isBop))
    timer === 'stopwatch' && dispatch(toggleStopwatchBop(!isBop))
  }

  return (
    <div style={styles.timerInput} className="mb-4">
      {tooltips ? (
        <OverlayTrigger
          placement="top"
          delay={{ show: 1000, hide: 0 }}
          overlay={bopTooltip}
        >
          <Form>
            <FontAwesomeIcon icon={faRobot} /> {'< B-O-P ! >'}
            <Form.Check
              onClick={handleClick}
              type="switch"
              label={bopLabel}
            />
          </Form>
        </OverlayTrigger>
      ) : (
        <Form>
          <FontAwesomeIcon icon={faRobot} /> {'< B-O-P ! >'}
          <Form.Check
            onClick={handleClick}
            type="switch"
            label={bopLabel}
          />
        </Form>
      )}
    </div>
  )
}

export default Bop