import React, {
  useEffect, useState,
} from 'react'
import { useDispatch } from 'react-redux'
import { newMetronomeColor } from '../../../reducers/timersReducer'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Form, OverlayTrigger,
} from 'react-bootstrap'

import { faLightbulb } from '@fortawesome/free-regular-svg-icons'

import { metronomeLightTooltip } from '../../Tooltips'

import theme from '../../../theme'

const styles = {
  colorSelect: {
    display: theme.displays.flex,
    justifyContent: theme.justifications.spaceBetween,
    paddingTop: theme.paddings.small,
    paddingRight: theme.paddings.small,
    paddingBottom: theme.paddings.medium,
  },
  timerInput: {
    display: theme.displays.flex,
    fontFamily: theme.fontFamilies.quantico,
    fontSize: theme.fontSizes.subheading,
  },
}

const Color = ({ tooltips }) => {
  const [metronomeColor, setMetronomeColor] = useState('#ff0000')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(newMetronomeColor(metronomeColor))
  }, [metronomeColor])

  const handleColor = (event) => {
    event.preventDefault()
    const newColor = (event.target.value)
    setMetronomeColor(newColor)
  }

  return (
    <div style={styles.timerInput}>
      {tooltips ? (
        <OverlayTrigger
          placement="top"
          delay={{ show: 1000, hide: 0 }}
          overlay={metronomeLightTooltip}
        >
          <Form>
            <FontAwesomeIcon icon={faLightbulb} /> Color
            <div style={styles.colorSelect}>
              <Form.Control
                onChange={handleColor}
                type="color"
                defaultValue="#ff0000"
              />
            </div>
          </Form>
        </OverlayTrigger>
      ) : (
        <Form>
          <FontAwesomeIcon icon={faLightbulb} /> Color
          <div style={styles.colorSelect}>
            <Form.Control
              onChange={handleColor}
              type="color"
              defaultValue="#ff0000"
            />
          </div>
        </Form>
      )}
    </div>
  )
}

export default Color