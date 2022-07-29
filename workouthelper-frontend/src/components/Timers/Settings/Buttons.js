import React from 'react'

import {
  Button, OverlayTrigger,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPauseCircle, faPlayCircle, faTimesCircle,
} from '@fortawesome/free-regular-svg-icons'

import {
  startTooltip, pauseTooltip, resetTooltip,
} from '../../Tooltips'

const Buttons = ({ handleStart, handlePause, handleReset, tooltips }) => {
  return (
    <div className="mb-3">
      {tooltips ? (
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 1000, hide: 0 }}
          overlay={startTooltip}
        >
          <Button size="lg" variant="outline-success" type="submit" onClick={handleStart}>
            <FontAwesomeIcon icon={faPlayCircle} size="2x" />
          </Button>
        </OverlayTrigger>
      ) : (
        <Button size="lg" variant="outline-success" type="submit" onClick={handleStart}>
          <FontAwesomeIcon icon={faPlayCircle} size="2x" />
        </Button>
      )}
      {tooltips ? (
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 1000, hide: 0 }}
          overlay={pauseTooltip}
        >
          <Button size="lg" variant="outline-warning" type="submit" onClick={handlePause}>
            <FontAwesomeIcon icon={faPauseCircle} size="2x" />
          </Button>
        </OverlayTrigger>
      ) : (
        <Button size="lg" variant="outline-warning" type="submit" onClick={handlePause}>
          <FontAwesomeIcon icon={faPauseCircle} size="2x" />
        </Button>
      )}
      {tooltips ? (
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 1000, hide: 0 }}
          overlay={resetTooltip}
        >
          <Button size="lg" variant="outline-danger" type="submit" onClick={handleReset}>
            <FontAwesomeIcon icon={faTimesCircle} size="2x" />
          </Button>
        </OverlayTrigger>
      ) : (
        <Button size="lg" variant="outline-danger" type="submit" onClick={handleReset}>
          <FontAwesomeIcon icon={faTimesCircle} size="2x" />
        </Button>
      )}
    </div>
  )
}

export default Buttons