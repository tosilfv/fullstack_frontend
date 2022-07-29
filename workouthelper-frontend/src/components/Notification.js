import React from 'react'

import {
  Alert, Spinner,
} from 'react-bootstrap'

import theme from '../theme'

const styles = {
  bold: {
    fontWeight: theme.fontWeights.bold,
  },
  error: {
    color: theme.colors.errorRed,
    fontSize: theme.fontSizes.subheading,
    padding: theme.paddings.large,
    textAlign: theme.alignments.center,
  },
  regular: {
    fontSize: theme.fontSizes.subheading,
    padding: theme.paddings.large,
    textAlign: theme.alignments.center,
  }
}

const Notification = ({ text, error, name }) => {
  return (
    error ? (
      <Alert style={styles.error} variant='secondary'>
        <Spinner animation="grow" size="sm" variant="light" />
        &nbsp;&nbsp;{text}&nbsp;&nbsp;
        <Spinner animation="grow" size="sm" variant="light" />
      </Alert>
    ) : (
      <Alert style={styles.regular} variant='secondary'>
        {text.includes('You logged out.') || text.includes('Your profile has been removed.') ? (
          <>
            &nbsp;&nbsp;{text}&nbsp;&nbsp;
          </>
        ) : (
          <>
            <Spinner animation="grow" size="sm" variant="light"
              id="notificationGrowLeft" />
            &nbsp;&nbsp;{text}&nbsp;&nbsp;
            <Spinner animation="grow" size="sm" variant="light"
              id="notificationGrowRight" />
          </>
        )}
        {text.includes('Registering was successful for username:')
          && <div style={styles.bold}>{name}</div>}
        {text.includes('A new plan was added:')
          && <div style={styles.bold}>{name}</div>}
        {text.includes('A new workout was added:')
          && <div style={styles.bold}>{name}</div>}
      </Alert>
    )
  )
}

export default Notification