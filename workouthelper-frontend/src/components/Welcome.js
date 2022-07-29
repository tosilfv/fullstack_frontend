import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import storage from '../utils/storage'

import {
  Nav, Navbar,
} from 'react-bootstrap'

import theme from '../theme'

const styles = {
  title: {
    color: theme.colors.darkBlue,
    fontFamily: theme.fontFamilies.quantico,
    fontSize: theme.fontSizes.title,
    margin: theme.margins.medium,
    padding: theme.paddings.large,
    textAlign: theme.alignments.center,
  },
  welcomeTab: {
    color: theme.colors.darkBlue,
    fontFamily: theme.fontFamilies.quantico,
    fontSize: theme.fontSizes.subheading,
    padding: theme.paddings.large,
    textDecoration: theme.textDecorations.none,
  },
}

const Welcome = ({ loading }) => {
  const [key, setKey] = useState(storage.loadTab())

  return (
    <div>
      <h1 style={styles.title}>Workout Helper</h1>
      {loading ? (
        null
      ) : (
        <Navbar sticky="top" collapseOnSelect expand="lg" bg="light">
          <Navbar.Toggle />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="m-auto" variant="tabs" activeKey={key} onSelect={(k) => setKey(k)}>
              <Nav.Link eventKey="login" href="#" as="span">
                <Link style={styles.welcomeTab} to="/welcome/login" id="loginHeader">
                  Login
                </Link>
              </Nav.Link>
              <Nav.Link eventKey="register" href="#" as="span">
                <Link style={styles.welcomeTab} to="/welcome/register" id="registerHeader">
                  Register
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )}
      <br />
    </div>
  )
}

export default Welcome