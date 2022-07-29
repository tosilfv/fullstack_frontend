import React from 'react'

import Advance from './Advance'
import Bop from './Bop'

const Settings = ({ tooltips, timer }) => {
  return (
    <>
      <Advance tooltips={tooltips} timer={timer} />
      <Bop tooltips={tooltips} timer={timer} />
    </>
  )
}

export default Settings