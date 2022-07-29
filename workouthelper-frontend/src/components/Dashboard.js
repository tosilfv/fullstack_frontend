import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import storage from '../utils/storage'

import {
  Nav, Navbar, OverlayTrigger,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faQuestionCircle, faUser,
} from '@fortawesome/free-regular-svg-icons'
import {
  faBrain, faChartLine, faClock as solidClock, faDumbbell,
} from '@fortawesome/free-solid-svg-icons'

import {
  workoutTooltip, timersTooltip, statisticsTooltip, plannerTooltip,
  profileTooltip, helpTooltip,
} from './Tooltips'

import theme from '../theme'

const styles = {
  tab: {
    color: theme.colors.darkBlue,
    fontSize: theme.fontSizes.heading,
    padding: theme.paddings.medium,
  },
}

const Dashboard = () => {
  const [key, setKey] = useState(storage.loadTab())

  const tooltips = useSelector(state => state.profile.tooltips)

  return (
    <Navbar sticky="top" collapseOnSelect expand="lg" bg="light">
      <Navbar.Toggle />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="m-auto" variant="tabs" activeKey={key}
          onSelect={(k) => setKey(k)}>
          <Nav.Link eventKey="workout" href="#" as="span">
            {tooltips ? (
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 1000, hide: 0 }}
                overlay={workoutTooltip}
              >
                <Link style={styles.tab} to="/dashboard/workout">
                  <FontAwesomeIcon icon={faDumbbell} />
                </Link>
              </OverlayTrigger>
            ) : (
              <Link style={styles.tab} to="/dashboard/workout">
                <FontAwesomeIcon icon={faDumbbell} />
              </Link>
            )}
          </Nav.Link>
          <Nav.Link eventKey="timers" href="#" as="span">
            {tooltips ? (
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 1000, hide: 0 }}
                overlay={timersTooltip}
              >
                <Link style={styles.tab} to="/dashboard/timers">
                  <FontAwesomeIcon icon={solidClock} />
                </Link>
              </OverlayTrigger>
            ) : (
              <Link style={styles.tab} to="/dashboard/timers">
                <FontAwesomeIcon icon={solidClock} />
              </Link>
            )}
          </Nav.Link>
          <Nav.Link eventKey="statistics" href="#" as="span">
            {tooltips ? (
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 1000, hide: 0 }}
                overlay={statisticsTooltip}
              >
                <Link style={styles.tab} to="/dashboard/statistics">
                  <FontAwesomeIcon icon={faChartLine} />
                </Link>
              </OverlayTrigger>
            ) : (
              <Link style={styles.tab} to="/dashboard/statistics">
                <FontAwesomeIcon icon={faChartLine} />
              </Link>
            )}
          </Nav.Link>
          <Nav.Link eventKey="planner" href="#" as="span">
            {tooltips ? (
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 1000, hide: 0 }}
                overlay={plannerTooltip}
              >
                <Link style={styles.tab} to="/dashboard/planner">
                  <FontAwesomeIcon icon={faBrain} />
                </Link>
              </OverlayTrigger>
            ) : (
              <Link style={styles.tab} to="/dashboard/planner">
                <FontAwesomeIcon icon={faBrain} />
              </Link>
            )}
          </Nav.Link>
          <Nav.Link eventKey="profile" href="#" as="span">
            {tooltips ? (
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 1000, hide: 0 }}
                overlay={profileTooltip}
              >
                <Link style={styles.tab} to="/dashboard/profile">
                  <FontAwesomeIcon icon={faUser} />
                </Link>
              </OverlayTrigger>
            ) : (
              <Link style={styles.tab} to="/dashboard/profile">
                <FontAwesomeIcon icon={faUser} />
              </Link>
            )}
          </Nav.Link>
          <Nav.Link eventKey="help" href="#" as="span">
            {tooltips ? (
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 1000, hide: 0 }}
                overlay={helpTooltip}
              >
                <Link style={styles.tab} to="/dashboard/help">
                  <FontAwesomeIcon icon={faQuestionCircle} />
                </Link>
              </OverlayTrigger>
            ) : (
              <Link style={styles.tab} to="/dashboard/help">
                <FontAwesomeIcon icon={faQuestionCircle} />
              </Link>
            )}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Dashboard