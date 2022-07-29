import React from 'react'

import theme from '../../../theme'

const styles = {
  timerDigit: {
    fontFamily: theme.fontFamilies.langar,
    fontSize: theme.fontSizes.digits,
  },
}

const Digits = ({ time }) => {
  return (
    <div style={styles.timerDigit}>
      {
        ('0' + Math.floor((time / 3600000) % 60)).slice(-2)
      }:
      {
        ('0' + Math.floor((time / 60000) % 60)).slice(-2)
      }&rsquo;
      {
        ('0' + Math.floor((time / 1000) % 60)).slice(-2)
      }&rsquo;&rsquo;
      {
        ('0' + ((time / 10) % 100)).slice(-2)
      }
    </div>
  )
}

export default Digits