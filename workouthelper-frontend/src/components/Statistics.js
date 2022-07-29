import React, {
  useEffect, useState,
} from 'react'
import {
  useDispatch, useSelector
} from 'react-redux'
import { getTooltips } from '../reducers/profileReducer'
import { logout } from '../reducers/userReducer'
import { getWorkouts } from '../reducers/workoutReducer'
import storage from '../utils/storage'

import {
  Container, Form, Nav, Navbar, NavDropdown, OverlayTrigger,
  Tab, Tabs,
} from 'react-bootstrap'
import {
  CartesianGrid, Line, LineChart, ResponsiveContainer,
  Tooltip as StatisticsTooltip, XAxis, YAxis,
} from 'recharts'

import { statisticsNotesTooltip } from './Tooltips'

import theme from '../theme'
import Dashboard from './Dashboard'
import Footer from './Footer'

const styles = {
  button: {
    display: theme.displays.flex,
    justifyContent: theme.justifications.spaceBetween,
    paddingTop: theme.paddings.small,
    paddingRight: theme.paddings.zero,
    paddingBottom: theme.paddings.small,
    paddingLeft: theme.paddings.zero,
  },
  subtitle: {
    color: theme.colors.darkPink,
    fontFamily: theme.fontFamilies.quantico,
    fontSize: theme.fontSizes.subtitle,
  },
  textarea: {
    height: theme.heights.medium,
  },
}

const StatisticsFields = ({ tooltips, statistics }) => {
  return (
    <div className="form-group mb-4">
      <ResponsiveContainer width="100%" aspect={2}>
        <LineChart data={statistics.chart}>
          <CartesianGrid />
          <XAxis label="date" tick={false} dataKey="date"
            interval={'preserveStartEnd'} />
          <Line dataKey="result" stroke="blue" activeDot={{ r: 8 }} />
          <YAxis />
          <StatisticsTooltip />
        </LineChart>
      </ResponsiveContainer>
      <Form.Group className="mb-3" controlId="formStatisticsTarget">
        <Tabs defaultActiveKey="categoryTitle" className="mb-3">
          <Tab eventKey="categoryTitle" title="Category - Title" disabled>
            <Form.Control type="text" placeholder="" value={statistics.categoryTitle} disabled />
          </Tab>
        </Tabs>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formStatisticsTarget">
        <Tabs defaultActiveKey="target" className="mb-3">
          <Tab eventKey="target" title="Target" disabled>
            <Form.Control type="text" placeholder="" value={statistics.target} disabled />
          </Tab>
        </Tabs>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formStatisticsMin">
        <Tabs defaultActiveKey="min" className="mb-3">
          <Tab eventKey="min" title="Min" disabled>
            <Form.Control type="text" placeholder="" value={statistics.min} disabled />
          </Tab>
        </Tabs>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formStatisticsMax">
        <Tabs defaultActiveKey="max" className="mb-3">
          <Tab eventKey="max" title="Max" disabled>
            <Form.Control type="text" placeholder="" value={statistics.max} disabled />
          </Tab>
        </Tabs>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formStatisticsAvg">
        <Tabs defaultActiveKey="avg" className="mb-3">
          <Tab eventKey="avg" title="Avg" disabled>
            <Form.Control type="text" placeholder="" value={statistics.avg} disabled />
          </Tab>
        </Tabs>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formStatisticsLast">
        <Tabs defaultActiveKey="last" className="mb-3">
          <Tab eventKey="last" title="Last" disabled>
            <Form.Control type="text" placeholder=""
              value={statistics.result[statistics.result.length - 1].result} disabled />
          </Tab>
        </Tabs>
      </Form.Group>
      <Form.Group controlId="formStatistics">
        <Tabs defaultActiveKey="notes" className="mb-3">
          <Tab eventKey="notes" title="Notes" disabled>
            {tooltips ? (
              <OverlayTrigger
                placement="top"
                delay={{ show: 1000, hide: 0 }}
                overlay={statisticsNotesTooltip}
              >
                <Form.Control as="textarea" placeholder="" value={statistics.notes}
                  style={styles.textarea} disabled />
              </OverlayTrigger>
            ) : (
              <Form.Control as="textarea" placeholder="" value={statistics.notes}
                style={styles.textarea} disabled />
            )}
          </Tab>
        </Tabs>
      </Form.Group>
    </div>
  )
}

const createWorkoutsList = (workouts) => {
  const workoutsList = []
  workouts.map((workout, index) => {
    workoutsList.push(
      <NavDropdown.Item
        key={index}
        eventKey={workout.categoryTitle}
        id={workout.categoryTitle}
      >
        {workout.categoryTitle}
      </NavDropdown.Item>)
  })

  return workoutsList
}

const createStatisticsFields = (categoryTitle, workouts) => {
  let workout = null

  workouts && workouts.map(w => {
    w.categoryTitle === categoryTitle ? workout = w : null
  })

  // create chart
  workout.chart = []
  workout.result.map(r => {
    workout.chart.push(r)
  })

  // create an array for mininum value, maximum value and average value
  workout.resultItems = []
  workout.result.map(r => {
    workout.resultItems.push(r.result)
  })

  // don't include the first item (0) from workout.resultItems, if user has input values there
  if (workout.resultItems.length > 1) {
    workout.min = Math.min(...workout.resultItems.slice(1))
    workout.avg = workout.resultItems.reduce((r1, r2) => r1 + r2) / (workout.resultItems.length - 1)
  } else {
    workout.min = Math.min(...workout.resultItems)
    workout.avg = workout.resultItems.reduce((r1, r2) => r1 + r2) / workout.resultItems.length
  }
  workout.max = Math.max(...workout.resultItems)

  return workout
}

const Statistics = () => {
  const [selectedStatistics, setSelectedStatistics] = useState(storage.loadStatistics())

  const dispatch = useDispatch()

  useEffect(() => {
    clearTimeout(storage.loadTimeout())
    if (storage.loadUser() === null) {
      dispatch(logout())
    } else {
      dispatch(getTooltips())
      dispatch(getWorkouts())
    }
  }, [])

  storage.saveTab('statistics')

  const workouts = useSelector(state => state.workout.workouts)
  const tooltips = useSelector(state => state.profile.tooltips)

  useEffect(() => {
    if (workouts !== undefined && selectedStatistics !== null) {
      const statistics = createStatisticsFields(selectedStatistics.categoryTitle, workouts)
      storage.saveStatistics(statistics)
      setSelectedStatistics(statistics)
    }
  }, [])

  const workoutList = workouts
    && createWorkoutsList(
      workouts.sort((w1, w2) =>
        (w1.categoryTitle > w2.categoryTitle) - (w1.categoryTitle < w2.categoryTitle))
    )

  return (
    <Container>
      <Dashboard />
      <Navbar variant="light" bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#">Select workout statistics: </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav
              onSelect={(categoryTitle) => {
                if (storage.loadUser() === null) {
                  dispatch(logout())
                } else {
                  const statistics = createStatisticsFields(categoryTitle, workouts)
                  storage.saveStatistics(statistics)
                  setSelectedStatistics(statistics)
                  dispatch(getWorkouts())
                }
              }}
            >
              <NavDropdown
                title="Statistics"
                menuVariant="light"
                id="statisticsSelectStatisticsDropdown"
              >
                {workoutList}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <h2 style={styles.subtitle}>Statistics</h2>
      <Tabs defaultActiveKey="selectedStatistics" className="mb-4">
        <Tab eventKey="selectedStatistics" title="Selected Statistics" disabled />
      </Tabs>
      {selectedStatistics !== null ? (
        <StatisticsFields tooltips={tooltips} statistics={selectedStatistics} />
      ) : (
        null
      )}
      <br /><br />
      <br /><br />
      <Footer />
    </Container>
  )
}

export default Statistics