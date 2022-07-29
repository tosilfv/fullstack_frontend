import React, {
  useEffect, useState,
} from 'react'
import {
  useDispatch, useSelector
} from 'react-redux'
import {
  Formik, Form as FormikForm,
} from 'formik'
import * as yup from 'yup'
import { getTooltips } from '../reducers/profileReducer'
import { logout } from '../reducers/userReducer'
import {
  createWorkout, deleteWorkout, getWorkouts,
} from '../reducers/workoutReducer'
import deleteService from '../services/deleteService'
import workoutService from '../services/workoutService'
import storage from '../utils/storage'

import {
  Button, Container, FloatingLabel, Form, Nav, Navbar, NavDropdown, OverlayTrigger,
  Spinner, Tab, Tabs,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSave, faTrashAlt,
} from '@fortawesome/free-regular-svg-icons'

import {
  TextArea, TextInput,
} from './FormField'

import {
  selectedWorkoutPreviousTargetTooltip, selectedWorkoutCategoryTitleTooltip,
  selectedWorkoutPreviousResultTooltip, selectedWorkoutPreviousNotesTooltip,
  selectedWorkoutTargetTooltip, selectedWorkoutResultTooltip,
  selectedWorkoutNotesTooltip, newWorkoutCategoryTitleTooltip,
  newWorkoutTargetTooltip,
} from './Tooltips'

import theme from '../theme'
import Dashboard from './Dashboard'
import Footer from './Footer'
import Notification from './Notification'

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

const initialWorkoutValues = {
  categoryTitle: '',
  target: '',
  result: '',
  notes: '',
}

const validationWorkoutSchema = yup.object().shape({
  categoryTitle: yup
    .string()
    .max(55, 'Category and title must be at most 55 characters long'),
  target: yup
    .string()
    .min(1, 'Target must be at least 1 character long')
    .max(40, 'Target must be at most 40 characters long'),
  result: yup
    .string()
    .min(1, 'Result must be at least 1 character long')
    .max(40, 'Result must be at most 40 characters long'),
  notes: yup
    .string()
    .max(5000, 'Notes must be at most 5000 characters long'),
})

export const UpdateWorkoutContainer = ({ onSubmit, loading, tooltips, workout }) => {
  return (
    <Formik
      initialValues={initialWorkoutValues}
      validationSchema={validationWorkoutSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, isValid, dirty }) =>
        <UpdateWorkoutForm onSubmit={handleSubmit} isValid={isValid} dirty={dirty}
          loading={loading} tooltips={tooltips} workout={workout} />
      }
    </Formik>
  )
}

const UpdateWorkoutForm = ({ onSubmit, isValid, dirty, loading, workout, tooltips }) => {
  return (
    <FormikForm>
      <div className="form-group mb-3">
        {tooltips ? (
          <OverlayTrigger
            placement="top"
            delay={{ show: 1000, hide: 0 }}
            overlay={selectedWorkoutCategoryTitleTooltip}
          >
            <FloatingLabel label="Selected Workout Category - Title">
              <Form.Control type="text" placeholder="Category - Title" id="selectedWorkoutCategoryTitle"
                value={workout.categoryTitle} disabled />
            </FloatingLabel>
          </OverlayTrigger>
        ) : (
          <FloatingLabel label="Selected Workout Category - Title">
            <Form.Control type="text" placeholder="Category - Title" id="selectedWorkoutCategoryTitle"
              value={workout.categoryTitle} disabled />
          </FloatingLabel>
        )}
      </div>

      <div className="form-group mb-3">
        {tooltips ? (
          <OverlayTrigger
            placement="top"
            delay={{ show: 1000, hide: 0 }}
            overlay={selectedWorkoutPreviousTargetTooltip}
          >
            <FloatingLabel label="Previous Target Result">
              <Form.Control type="text" placeholder="Previous Target Result"
                id="selectedWorkoutPreviousTarget" value={workout.target} disabled />
            </FloatingLabel>
          </OverlayTrigger>
        ) : (
          <FloatingLabel label="Previous Target Result">
            <Form.Control type="text" placeholder="Previous Target Result"
              id="selectedWorkoutPreviousTarget" value={workout.target} disabled />
          </FloatingLabel>
        )}
      </div>

      <div className="form-group mb-3">
        {tooltips ? (
          <OverlayTrigger
            placement="top"
            delay={{ show: 1000, hide: 0 }}
            overlay={selectedWorkoutPreviousResultTooltip}
          >
            <FloatingLabel label="Previous Result">
              <Form.Control type="text" placeholder="Previous Result" id="selectedWorkoutPreviousResult"
                value={workout.result[workout.result.length - 1].result} disabled />
            </FloatingLabel>
          </OverlayTrigger>
        ) : (
          <FloatingLabel label="Previous Result">
            <Form.Control type="text" placeholder="Previous Result" id="selectedWorkoutPreviousResult"
              value={workout.result[workout.result.length - 1].result} disabled />
          </FloatingLabel>
        )}
      </div>

      <div className="form-group mb-3">
        {tooltips ? (
          <OverlayTrigger
            placement="top"
            delay={{ show: 1000, hide: 0 }}
            overlay={selectedWorkoutPreviousNotesTooltip}
          >
            <FloatingLabel label="Previous Notes">
              <Form.Control as="textarea" placeholder="Previous Notes"
                rows="10" id="selectedWorkoutPreviousNotes"
                value={workout.notes} style={styles.textarea} disabled />
            </FloatingLabel>
          </OverlayTrigger>
        ) : (
          <FloatingLabel label="Previous Notes">
            <Form.Control as="textarea" placeholder="Previous Notes"
              rows="10" id="selectedWorkoutPreviousNotes"
              value={workout.notes} style={styles.textarea} disabled />
          </FloatingLabel>
        )}
      </div>

      <div className="form-group mb-3">
        {tooltips ? (
          <OverlayTrigger
            placement="top"
            delay={{ show: 1000, hide: 0 }}
            overlay={selectedWorkoutTargetTooltip}
          >
            <FloatingLabel label="New Target Result">
              {loading ? (
                <TextInput name="target" className="form-control" type="text"
                  placeholder="Target Result" id="selectedWorkoutTarget" disabled />
              ) : (
                <TextInput name="target" className="form-control" type="text"
                  placeholder="Target Result" id="selectedWorkoutTarget" />
              )}
            </FloatingLabel>
          </OverlayTrigger>
        ) : (
          <FloatingLabel label="New Target Result">
            {loading ? (
              <TextInput name="target" className="form-control" type="text"
                placeholder="Target Result" id="selectedWorkoutTarget" disabled />
            ) : (
              <TextInput name="target" className="form-control" type="text"
                placeholder="Target Result" id="selectedWorkoutTarget" />
            )}
          </FloatingLabel>
        )}
      </div>

      <div className="form-group mb-3">
        {tooltips ? (
          <OverlayTrigger
            placement="top"
            delay={{ show: 1000, hide: 0 }}
            overlay={selectedWorkoutResultTooltip}
          >
            <FloatingLabel label="New Result">
              {loading ? (
                <TextInput name="result" className="form-control" type="text"
                  placeholder="Result" id="selectedWorkoutResult" disabled />
              ) : (
                <TextInput name="result" className="form-control" type="text"
                  placeholder="Result" id="selectedWorkoutResult" />
              )}
            </FloatingLabel>
          </OverlayTrigger>
        ) : (
          <FloatingLabel label="New Result">
            {loading ? (
              <TextInput name="result" className="form-control" type="text"
                placeholder="Result" id="selectedWorkoutResult" disabled />
            ) : (
              <TextInput name="result" className="form-control" type="text"
                placeholder="Result" id="selectedWorkoutResult" />
            )}
          </FloatingLabel>
        )}
      </div>

      <div className="form-group mb-3">
        {tooltips ? (
          <OverlayTrigger
            placement="top"
            delay={{ show: 1000, hide: 0 }}
            overlay={selectedWorkoutNotesTooltip}
          >
            <FloatingLabel label=". .../">
              {loading ? (
                <TextArea name="notes" className="form-control" as="textarea"
                  placeholder="" id="selectedWorkoutNotes" disabled />
              ) : (
                <TextArea name="notes" className="form-control" as="textarea"
                  placeholder="" id="selectedWorkoutNotes" />
              )}
            </FloatingLabel>
          </OverlayTrigger>
        ) : (
          <FloatingLabel label=". .../">
            {loading ? (
              <TextArea name="notes" className="form-control" as="textarea"
                placeholder="" id="selectedWorkoutNotes" disabled />
            ) : (
              <TextArea name="notes" className="form-control" as="textarea"
                placeholder="" id="selectedWorkoutNotes" />
            )}
          </FloatingLabel>
        )}
      </div>

      <Container style={styles.button}>
        <Button
          onClick={onSubmit}
          disabled={!dirty || !isValid}
          type="submit"
          size="lg"
          variant="outline-primary"
          id="selectedWorkoutSaveButton">
          {loading ? (
            <>
              Save&nbsp;&nbsp;<Spinner animation="border" size="sm"
                id="selectedWorkoutSaveButtonSpinner" />
            </>
          ) : (
            <>
              Save&nbsp;&nbsp;<FontAwesomeIcon icon={faSave} size="sm"
                id="selectedWorkoutSaveButtonSaveIcon" />
            </>
          )}
        </Button>
      </Container>
    </FormikForm>
  )
}

export const DeleteWorkoutContainer = ({ onSubmit, loading, workout }) => {
  return (
    <Formik
      initialValues={initialWorkoutValues}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) =>
        <DeleteWorkoutForm onSubmit={handleSubmit} loading={loading} workout={workout} />
      }
    </Formik>
  )
}

const DeleteWorkoutForm = ({ onSubmit, loading, workout }) => {
  return (
    <FormikForm>
      <div className="form-group mb-3">
        <Container style={styles.button}>
          <Button
            onClick={onSubmit}
            disabled={loading || !workout}
            type="submit"
            size="lg"
            variant="outline-danger"
            id="selectedWorkoutDeleteButton">
            {loading ? (
              <>
                Delete&nbsp;&nbsp;<Spinner animation="border" size="sm"
                  id="selectedWorkoutDeleteButtonSpinner" />
              </>
            ) : (
              <>
                Delete&nbsp;&nbsp;<FontAwesomeIcon icon={faTrashAlt} size="sm"
                  id="selectedWorkoutDeleteButtonTrashIcon" />
              </>
            )}
          </Button>
        </Container>
      </div>
    </FormikForm>
  )
}

export const NewWorkoutContainer = ({ onSubmit, loading, tooltips }) => {
  return (
    <Formik
      initialValues={initialWorkoutValues}
      validationSchema={validationWorkoutSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, isValid, dirty }) =>
        <NewWorkoutForm onSubmit={handleSubmit} isValid={isValid} dirty={dirty}
          loading={loading} tooltips={tooltips} />
      }
    </Formik>
  )
}

const NewWorkoutForm = ({ onSubmit, isValid, dirty, loading, tooltips }) => {
  return (
    <FormikForm>
      <div className="form-group mb-3">
        <Tabs defaultActiveKey="newWorkoutCategoryTitle" className="mb-3">
          <Tab eventKey="newWorkoutCategoryTitle" title="Create a New Workout Category and Title" disabled>
            {tooltips ? (
              <OverlayTrigger
                placement="top"
                delay={{ show: 1000, hide: 0 }}
                overlay={newWorkoutCategoryTitleTooltip}
              >
                <FloatingLabel label="Category - Title">
                  {loading ? (
                    <TextInput name="categoryTitle" className="form-control" type="text"
                      placeholder="Category - Title" id="newWorkoutCategoryTitle" disabled />
                  ) : (
                    <TextInput name="categoryTitle" className="form-control" type="text"
                      placeholder="Category - Title" id="newWorkoutCategoryTitle" />
                  )}
                </FloatingLabel>
              </OverlayTrigger>
            ) : (
              <FloatingLabel label="Category - Title">
                {loading ? (
                  <TextInput name="categoryTitle" className="form-control" type="text"
                    placeholder="Category - Title" id="newWorkoutCategoryTitle" disabled />
                ) : (
                  <TextInput name="categoryTitle" className="form-control" type="text"
                    placeholder="Category - Title" id="newWorkoutCategoryTitle" />
                )}
              </FloatingLabel>
            )}
          </Tab>
        </Tabs>
      </div>

      <div className="form-group mb-3">
        <Tabs defaultActiveKey="newWorkoutTarget" className="mb-3">
          <Tab eventKey="newWorkoutTarget" title="Create a New Workout Target Result" disabled>
            {tooltips ? (
              <OverlayTrigger
                placement="top"
                delay={{ show: 1000, hide: 0 }}
                overlay={newWorkoutTargetTooltip}
              >
                <FloatingLabel label="Target Result">
                  {loading ? (
                    <TextInput name="target" className="form-control" type="text"
                      placeholder="Target Result" id="newWorkoutTarget" disabled />
                  ) : (
                    <TextInput name="target" className="form-control" type="text"
                      placeholder="Target Result" id="newWorkoutTarget" />
                  )}
                </FloatingLabel>
              </OverlayTrigger>
            ) : (
              <FloatingLabel label="Target Result">
                {loading ? (
                  <TextInput name="target" className="form-control" type="text"
                    placeholder="Target Result" id="newWorkoutTarget" disabled />
                ) : (
                  <TextInput name="target" className="form-control" type="text"
                    placeholder="Target Result" id="newWorkoutTarget" />
                )}
              </FloatingLabel>
            )}
          </Tab>
        </Tabs>
      </div>

      <Container style={styles.button}>
        <Button
          onClick={onSubmit}
          disabled={!dirty || !isValid}
          type="submit"
          size="lg"
          variant="outline-primary"
          id="newWorkoutSaveButton">
          {loading ? (
            <>
              Save&nbsp;&nbsp;<Spinner animation="border" size="sm"
                id="newWorkoutSaveButtonSpinner" />
            </>
          ) : (
            <>
              Save&nbsp;&nbsp;<FontAwesomeIcon icon={faSave} size="sm"
                id="newWorkoutSaveButtonSaveIcon" />
            </>
          )}
        </Button>
      </Container>
    </FormikForm>
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

const createWorkoutFields = (categoryTitle, workouts) => {
  let workout = null

  workouts && workouts.map(w => {
    w.categoryTitle === categoryTitle ? workout = w : null
  })

  return workout
}

const Workout = () => {
  const [newCategoryTitle, setNewCategoryTitle] = useState(null)
  const [text, setText] = useState(null)
  const [isError, setIsError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedWorkout, setSelectedWorkout] = useState(storage.loadWorkout())

  const dispatch = useDispatch()

  useEffect(() => {
    if (storage.loadUser() === null) {
      dispatch(logout())
    } else {
      clearTimeout(storage.loadTimeout())
      dispatch(getTooltips())
      dispatch(getWorkouts())
    }
  }, [])

  storage.saveTab('workout')

  const workouts = useSelector(state => state.workout.workouts)
  const tooltips = useSelector(state => state.profile.tooltips)

  const workoutList = workouts
    && createWorkoutsList(
      workouts.sort((w1, w2) =>
        (w1.categoryTitle > w2.categoryTitle) - (w1.categoryTitle < w2.categoryTitle))
    )

  const handleUpdateWorkout = async (values, { setSubmitting, resetForm }) => {
    if (storage.loadUser() === null) {
      dispatch(logout())
    } else {
      const d = new Date()
      const date = d.getDate()  + '.' + (d.getMonth() + 1) + '.' + d.getFullYear()
        + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
      const categoryTitle = selectedWorkout.categoryTitle
      const target = values.target
      const result = {
        date: date,
        result: values.result
      }
      const notes = values.notes
      setLoading(true)
      setSubmitting(false)
      resetForm(initialWorkoutValues)
      try {
        const workout = await workoutService.updateWorkout({
          categoryTitle, target, result, notes
        })
        storage.saveWorkout(workout)
        setSelectedWorkout(workout)
        dispatch(getWorkouts())
        setNewCategoryTitle(categoryTitle)
        setText('The selected workout was updated')
        const timeoutWorkout = setTimeout(() => {
          setNewCategoryTitle(null)
          setText(null)
          setLoading(false)
        }, 3000)
        storage.saveTimeout(timeoutWorkout)
      } catch(error) {
        if (storage.loadUser() !== null) {
          setIsError(true)
          setText(`Error: New target result not a number or used comma [,]
           instead of point [.] | New result not a number, empty or used comma [,]
           instead of point [.] | Selected workout notes max size reached
           | User logged out`)
          const timeoutError = setTimeout(() => {
            setIsError(false)
            setText(null)
            setLoading(false)
          }, 6000)
          storage.saveTimeout(timeoutError)
        }
      }
    }
  }

  const handleDeleteWorkout = async () => {
    if (storage.loadUser() === null) {
      dispatch(logout())
    } else {
      if (confirm('Yes, I understand that his action is irreversible and I wish to delete my workout.')) {
        if (selectedWorkout.categoryTitle === '' || selectedWorkout === null) {
          setText('No workout was selected.')
          const timeout = setTimeout(() => {
            setText(null)
          }, 3000)
          storage.saveTimeout(timeout)
        } else {
          setLoading(true)
          try {
            await deleteService.deleteWorkout(selectedWorkout.categoryTitle)
            storage.saveWorkout(null)
            storage.saveStatistics(null)
            setSelectedWorkout(null)
            dispatch(deleteWorkout())
            dispatch(getWorkouts())
            setText('Workout was deleted.')
            const timeoutDelete = setTimeout(() => {
              setText(null)
              setLoading(false)
            }, 3000)
            storage.saveTimeout(timeoutDelete)
          } catch(error) {
            if (storage.loadUser() !== null) {
              setIsError(true)
              setText(error.message)
              const timeoutError = setTimeout(() => {
                setIsError(false)
                setText(null)
                setLoading(false)
              }, 6000)
              storage.saveTimeout(timeoutError)
            }
          }
        }
      } else {
        setLoading(true)
        setText('Workout delete cancelled.')
        const timeoutCancel = setTimeout(() => {
          setText(null)
          setLoading(false)
        }, 3000)
        storage.saveTimeout(timeoutCancel)
      }
    }
  }

  const handleAddWorkout = async (values, { setSubmitting, resetForm }) => {
    if (storage.loadUser() === null) {
      dispatch(logout())
    } else {
      const d = new Date()
      const date = d.getDate()  + '.' + (d.getMonth() + 1) + '.' + d.getFullYear()
        + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
      const categoryTitle = values.categoryTitle.trim()
      const target = values.target
      const result = {
        date: date,
        result: 0
      }
      const notes = ' '
      setLoading(true)
      setSubmitting(false)
      resetForm(initialWorkoutValues)
      try {
        const workout = await workoutService.createNewWorkout({
          categoryTitle, target, result, notes
        })
        dispatch(createWorkout(workout))
        dispatch(getWorkouts())
        setNewCategoryTitle(categoryTitle)
        setText('A new workout was added:')
        const timeoutWorkout = setTimeout(() => {
          setNewCategoryTitle(null)
          setText(null)
          setLoading(false)
        }, 3000)
        storage.saveTimeout(timeoutWorkout)
      } catch(error) {
        if (storage.loadUser() !== null) {
          setIsError(true)
          setText(`Error: Workout category and title is already in use or empty
           | Target not a number, empty or used comma [,] instead of point [.]
           | User logged out`)
          const timeoutError = setTimeout(() => {
            setIsError(false)
            setText(null)
            setLoading(false)
          }, 6000)
          storage.saveTimeout(timeoutError)
        }
      }
    }
  }

  return (
    <Container>
      <Dashboard />
      <Navbar variant="light" bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#">Select workout: </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav
              onSelect={(categoryTitle) => {
                if (storage.loadUser() === null) {
                  dispatch(logout())
                } else {
                  const workout = createWorkoutFields(categoryTitle, workouts)
                  storage.saveWorkout(workout)
                  setSelectedWorkout(workout)
                  dispatch(getWorkouts())
                }
              }}
            >
              <NavDropdown
                title="Workouts"
                menuVariant="light"
                id="workoutSelectWorkoutDropdown"
              >
                {workoutList}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <h2 style={styles.subtitle}>Workout</h2>
      {text !== null && <Notification text={text}
        error={isError} name={newCategoryTitle} />}
      <Tabs defaultActiveKey="selectedWorkout" className="mb-4">
        <Tab eventKey="selectedWorkout" title="Selected Workout" disabled />
      </Tabs>
      {selectedWorkout !== null ? (
        <UpdateWorkoutContainer onSubmit={handleUpdateWorkout} loading={loading}
          tooltips={tooltips} workout={selectedWorkout} />
      ) : (
        null
      )}
      <DeleteWorkoutContainer onSubmit={handleDeleteWorkout} loading={loading}
        tooltips={tooltips} workout={selectedWorkout} />
      <NewWorkoutContainer onSubmit={handleAddWorkout} loading={loading}
        tooltips={tooltips}/>
      <br /><br />
      <br /><br />
      <Footer />
    </Container>
  )
}

export default Workout