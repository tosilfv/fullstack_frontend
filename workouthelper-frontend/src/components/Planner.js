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
import {
  createPlan, deletePlan, getPlans,
} from '../reducers/plannerReducer'
import { getTooltips } from '../reducers/profileReducer'
import { logout } from '../reducers/userReducer'
import deleteService from '../services/deleteService'
import plannerService from '../services/plannerService'
import storage from '../utils/storage'

import {
  Button, Container, FloatingLabel, Nav, Navbar, NavDropdown, OverlayTrigger,
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
  plannerNameTooltip, plannerMemoTooltip,
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
}

const initialPlanValues = {
  planName: '',
  planMemo: '',
}

const validationPlanSchema = yup.object().shape({
  planName: yup
    .string()
    .min(1, 'Plan name must be at least 1 character long')
    .max(55, 'Plan name must be at most 55 characters long')
    .required('Plan name is required'),
  planMemo: yup
    .string()
    .min(1, 'Plan memo must be at least 1 character long')
    .max(2500, 'Plan memo must be at most 2500 characters long')
    .required('Plan memo is required'),
})

const SelectedPlanContainer = ({ plan }) => {
  return (
    <>
      <h3>{plan.planName}</h3>
      <pre>{plan.planName !== '' && plan.planMemo}</pre>
    </>
  )
}

export const DeletePlanContainer = ({ onSubmit, loading, plan }) => {
  return (
    <Formik
      initialValues={initialPlanValues}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) =>
        <DeletePlanForm onSubmit={handleSubmit} loading={loading} plan={plan} />
      }
    </Formik>
  )
}

const DeletePlanForm = ({ onSubmit, loading, plan }) => {
  return (
    <FormikForm>
      <div className="form-group mb-3">
        <Container style={styles.button}>
          <Button
            onClick={onSubmit}
            disabled={loading || !plan}
            type="submit"
            size="lg"
            variant="outline-danger"
            id="plannerPlanDeleteButton">
            {loading ? (
              <>
                Delete&nbsp;&nbsp;<Spinner animation="border" size="sm"
                  id="plannerPlanDeleteButtonSpinner" />
              </>
            ) : (
              <>
                Delete&nbsp;&nbsp;<FontAwesomeIcon icon={faTrashAlt} size="sm"
                  id="plannerPlanDeleteButtonTrashIcon" />
              </>
            )}
          </Button>
        </Container>
      </div>
    </FormikForm>
  )
}

export const PlannerContainer = ({ onSubmit, loading, tooltips }) => {
  return (
    <Formik
      initialValues={initialPlanValues}
      validationSchema={validationPlanSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, isValid, dirty }) =>
        <PlannerForm onSubmit={handleSubmit} isValid={isValid} dirty={dirty}
          loading={loading} tooltips={tooltips} />
      }
    </Formik>
  )
}

const PlannerForm = ({ onSubmit, isValid, dirty, loading, tooltips }) => {
  return (
    <FormikForm>
      <div className="form-group mb-3">
        <Tabs defaultActiveKey="newPlanName" className="mb-3">
          <Tab eventKey="newPlanName" title="Create a New Plan Name" disabled>
            {tooltips ? (
              <OverlayTrigger
                placement="top"
                delay={{ show: 1000, hide: 0 }}
                overlay={plannerNameTooltip}
              >
                <FloatingLabel label="Name">
                  {loading ? (
                    <TextInput name="planName" className="form-control" type="text"
                      placeholder="Name" id="planNamePlanner" disabled />
                  ) : (
                    <TextInput name="planName" className="form-control" type="text"
                      placeholder="Name" id="planNamePlanner" />
                  )}
                </FloatingLabel>
              </OverlayTrigger>
            ) : (
              <FloatingLabel label="Name">
                {loading ? (
                  <TextInput name="planName" className="form-control" type="text"
                    placeholder="Name" id="planNamePlanner" disabled />
                ) : (
                  <TextInput name="planName" className="form-control" type="text"
                    placeholder="Name" id="planNamePlanner" />
                )}
              </FloatingLabel>
            )}
          </Tab>
        </Tabs>
      </div>

      <div className="form-group mb-3">
        <Tabs defaultActiveKey="newPlanMemo" className="mb-3">
          <Tab eventKey="newPlanMemo" title="Create a New Plan Memo" disabled>
            {tooltips ? (
              <OverlayTrigger
                placement="top"
                delay={{ show: 1000, hide: 0 }}
                overlay={plannerMemoTooltip}
              >
                <FloatingLabel label=". .../">
                  {loading ? (
                    <TextArea name="planMemo" className="form-control" as="textarea"
                      placeholder="" id="planMemoPlanner" disabled />
                  ) : (
                    <TextArea name="planMemo" className="form-control" as="textarea"
                      placeholder="" id="planMemoPlanner" />
                  )}
                </FloatingLabel>
              </OverlayTrigger>
            ) : (
              <FloatingLabel label=". .../">
                {loading ? (
                  <TextArea name="planMemo" className="form-control" as="textarea"
                    placeholder="" id="planMemoPlanner" disabled />
                ) : (
                  <TextArea name="planMemo" className="form-control" as="textarea"
                    placeholder="" id="planMemoPlanner" />
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
          id="plannerPlanSaveButton">
          {loading ? (
            <>
              Save&nbsp;&nbsp;<Spinner animation="border" size="sm"
                id="plannerPlanSaveButtonSpinner" />
            </>
          ) : (
            <>
              Save&nbsp;&nbsp;<FontAwesomeIcon icon={faSave} size="sm"
                id="plannerPlanSaveButtonSaveIcon" />
            </>
          )}
        </Button>
      </Container>
    </FormikForm>
  )
}

const createPlansList = (plans) => {
  const plansList = []
  plans.map((plan, index) => {
    plansList.push(
      <NavDropdown.Item
        key={index}
        eventKey={plan.planName}
        id={plan.planName}
      >
        {plan.planName}
      </NavDropdown.Item>)
  })

  return plansList
}

const createPlanMemo = (selectedPlan, plans) => {
  let memo = null

  plans && plans.map(p => {
    p.planName === selectedPlan ? memo = p : null
  })

  return memo.planMemo
}

const Planner = () => {
  const [newName, setNewName] = useState(null)
  const [text, setText] = useState(null)
  const [isError, setIsError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(storage.loadPlan())

  const dispatch = useDispatch()

  useEffect(() => {
    if (storage.loadUser() === null) {
      dispatch(logout())
    } else {
      clearTimeout(storage.loadTimeout())
      dispatch(getTooltips())
      dispatch(getPlans())
    }
  }, [])

  storage.saveTab('planner')

  const plans = useSelector(state => state.planner.plans)
  const tooltips = useSelector(state => state.profile.tooltips)

  const planList = plans
    && createPlansList(
      plans.sort((p1, p2) => (p1.planName > p2.planName) - (p1.planName < p2.planName))
    )

  const handleDeletePlan = async () => {
    if (storage.loadUser() === null) {
      dispatch(logout())
    } else {
      if (confirm('Yes, I understand that his action is irreversible and I wish to delete my plan.')) {
        if (selectedPlan.planName === '' || selectedPlan === null) {
          setText('No plan was selected.')
          const timeout = setTimeout(() => {
            setText(null)
          }, 3000)
          storage.saveTimeout(timeout)
        } else {
          setLoading(true)
          try {
            await deleteService.deletePlan(selectedPlan.planName)
            storage.savePlan(null)
            setSelectedPlan(null)
            dispatch(deletePlan())
            dispatch(getPlans())
            setText('Plan was deleted.')
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
        setText('Plan delete cancelled.')
        const timeoutCancel = setTimeout(() => {
          setText(null)
          setLoading(false)
        }, 3000)
        storage.saveTimeout(timeoutCancel)
      }
    }
  }

  const handleAddPlan = async (values, { setSubmitting, resetForm }) => {
    if (storage.loadUser() === null) {
      dispatch(logout())
    } else {
      const planName = values.planName.trim()
      const planMemo = values.planMemo
      setLoading(true)
      setSubmitting(false)
      resetForm(initialPlanValues)
      try {
        const newPlan = await plannerService.createNewPlan({
          planName, planMemo
        })
        dispatch(createPlan(newPlan))
        dispatch(getPlans())
        setNewName(planName)
        setText('A new plan was added:')
        const timeoutPlan = setTimeout(() => {
          setNewName(null)
          setText(null)
          setLoading(false)
        }, 3000)
        storage.saveTimeout(timeoutPlan)
      } catch(error) {
        if (storage.loadUser() !== null) {
          setIsError(true)
          setText(`Error: Plan name was empty | Plan name is already in use
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
          <Navbar.Brand href="#">Select plan: </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav
              onSelect={(p) => {
                if (storage.loadUser() === null) {
                  dispatch(logout())
                } else {
                  const plan = {
                    planName: p,
                    planMemo: createPlanMemo(p, plans)
                  }
                  storage.savePlan(plan)
                  setSelectedPlan(plan)
                  dispatch(getPlans())
                }
              }}
            >
              <NavDropdown
                title="Plans"
                menuVariant="light"
                id="plannerSelectPlanDropdown"
              >
                {planList}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <h2 style={styles.subtitle}>Planner</h2>
      {text !== null && <Notification text={text}
        error={isError} name={newName} />}
      <Tabs defaultActiveKey="selectedPlan" className="mb-4">
        <Tab eventKey="selectedPlan" title="Selected Plan" disabled />
      </Tabs>
      {selectedPlan !== null ? (
        <SelectedPlanContainer plan={selectedPlan} />
      ) : (
        null
      )}
      <DeletePlanContainer onSubmit={handleDeletePlan} loading={loading}
        plan={selectedPlan} />
      <PlannerContainer onSubmit={handleAddPlan} loading={loading}
        tooltips={tooltips} />
      <br /><br />
      <br /><br />
      <Footer />
    </Container>
  )
}

export default Planner