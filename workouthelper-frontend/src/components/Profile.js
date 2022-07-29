import React, {
  useEffect, useState,
} from 'react'
import {
  useDispatch, useSelector,
} from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  Formik, Form as FormikForm,
} from 'formik'
import * as yup from 'yup'
import {
  changedPassword, getTooltips,
} from '../reducers/profileReducer'
import {
  deleteUser, logout
} from '../reducers/userReducer'
import deleteService from '../services/deleteService'
import profileService from '../services/profileService'
import storage from '../utils/storage'

import {
  Button, Container, Form, Spinner, Tab, Tabs,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSave, faShareSquare,
} from '@fortawesome/free-regular-svg-icons'
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons'

import {
  SelectValue, TextInput,
} from './FormField'

import theme from '../theme'
import Dashboard from './Dashboard'
import Notification from './Notification'
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
  password: {
    marginTop: theme.margins.tiny,
  },
  subtitle: {
    color: theme.colors.darkPink,
    fontFamily: theme.fontFamilies.quantico,
    fontSize: theme.fontSizes.subtitle,
  },
}

// Formik needs initialValues, even if they are not used
const initialValues = {
  '':'',
}

const initialTooltipsValue = {
  tooltips: true,
}

const initialPasswordValues = {
  oldPassword: '',
  newPassword: '',
  passwordConfirmation: '',
}

const validationSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .required('Old password is required'),
  newPassword: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(50, 'Password must be at most 50 characters long')
    .required('New password is required')
    .matches(
      /^(?=.*\d)(?=.*[\W_]+)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?!.*[åäöœæøÅÄÖŒÆØ]).{8,50}$/,
      `Password must have at least one lowercase letter, one uppercase letter,
      one number, one special character, no white spaces and no scands`
    ),
  passwordConfirmation: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('newPassword'), null],
      'Password confirmation must match the new password',
    ),
})

const LoggedInUser = ({ user }) => {
  return (
    <div className="form-group mb-4">
      <Form.Group controlId="formProfileLoggedin">
        <Tabs defaultActiveKey="loggedin" className="mb-4">
          <Tab eventKey="loggedin" title="Logged in User" disabled>
            <Form.Control type="text" placeholder={user.username} disabled />
          </Tab>
        </Tabs>
      </Form.Group>
    </div>
  )
}

export const ToggleTooltipsContainer = ({ onSubmit, loading, tooltips }) => {
  return (
    <Formik
      initialValues={initialTooltipsValue}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, dirty  }) =>
        <ToggleTooltipsForm onSubmit={handleSubmit} dirty={dirty}
          loading={loading} tooltips={tooltips} />
      }
    </Formik>
  )
}

const ToggleTooltipsForm = ({ onSubmit, dirty, loading, tooltips }) => {
  const options = [
    { value: 'true', label: 'On' },
    { value: 'false', label: 'Off' },
  ]

  return (
    <FormikForm>
      <div className="form-group mb-3">
        <Tabs defaultActiveKey="tooltips" className="mb-4">
          <Tab eventKey="tooltips" title="Tooltips" disabled>
            <Form.Control type="text"
              placeholder={tooltips.tooltips === true ? 'On' : 'Off'} disabled />
            <SelectValue name="tooltips" className="form-control" as="select"
              id="formProfileTooltips">
              {options.map(o => (
                <option key={o.value} value={o.value} >
                  {o.label}
                </option>
              ))}
            </SelectValue>

            <Container style={styles.button}>
              <Button
                onClick={onSubmit}
                disabled={!dirty || loading}
                type="submit"
                size="lg"
                variant="outline-primary"
                id="profileTooltipsSaveButton">
                {loading ? (
                  <>
                    Save&nbsp;&nbsp;<Spinner animation="border" size="sm"
                      id="profileTooltipsSaveButtonSpinner" />
                  </>
                ) : (
                  <>
                    Save&nbsp;&nbsp;<FontAwesomeIcon icon={faSave} size="sm"
                      id="profileTooltipsSaveButtonSaveIcon" />
                  </>
                )}
              </Button>
            </Container>
          </Tab>
        </Tabs>
      </div>
    </FormikForm>
  )
}

export const ChangePasswordContainer = ({ onSubmit, loading }) => {
  return (
    <Formik
      initialValues={initialPasswordValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, isValid, dirty }) =>
        <ChangePasswordForm onSubmit={handleSubmit} isValid={isValid}
          dirty={dirty} loading={loading} />
      }
    </Formik>
  )
}

const ChangePasswordForm = ({ onSubmit, isValid, dirty, loading }) => {
  return (
    <FormikForm>
      <div className="form-group mb-3">
        <Tabs defaultActiveKey="password" className="mb-4">
          <Tab eventKey="password" title="Change Password" className="mb-3" disabled>
            {loading ? (
              <TextInput name="oldPassword" className="form-control" type="password"
                placeholder="Old Password" id="formProfileOldPassword" disabled />
            ) : (
              <TextInput name="oldPassword" className="form-control" type="password"
                placeholder="Old Password" id="formProfileOldPassword" />
            )}
            {loading ? (
              <TextInput style={styles.password} name="newPassword" className="form-control"
                type="password" placeholder="New Password" id="formProfileNewPassword" disabled />
            ) : (
              <TextInput style={styles.password} name="newPassword" className="form-control"
                type="password" placeholder="New Password" id="formProfileNewPassword" />
            )}
            {loading ? (
              <TextInput style={styles.password} name="passwordConfirmation" className="form-control"
                type="password" placeholder="Password Confirmation" id="formProfilePasswordConfirmation" disabled />
            ) : (
              <TextInput style={styles.password} name="passwordConfirmation" className="form-control"
                type="password" placeholder="Password Confirmation" id="formProfilePasswordConfirmation" />
            )}
          </Tab>
        </Tabs>

        <Container style={styles.button}>
          <Button
            onClick={onSubmit}
            disabled={!dirty || !isValid}
            type="submit"
            size="lg"
            variant="outline-primary"
            id="profilePasswordSaveButton">
            {loading ? (
              <>
                Save&nbsp;&nbsp;<Spinner animation="border" size="sm"
                  id="profilePasswordSaveButtonSpinner" />
              </>
            ) : (
              <>
                Save&nbsp;&nbsp;<FontAwesomeIcon icon={faSave} size="sm"
                  id="profilePasswordSaveButtonSaveIcon" />
              </>
            )}
          </Button>
        </Container>
      </div>
    </FormikForm>
  )
}

export const DeleteProfileContainer = ({ onSubmit, loading }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) =>
        <DeleteProfileForm onSubmit={handleSubmit} loading={loading} />
      }
    </Formik>
  )
}

const DeleteProfileForm = ({ onSubmit, loading }) => {
  return (
    <FormikForm>
      <div className="form-group mb-3">
        <Tabs defaultActiveKey="account" className="mb-3">
          <Tab eventKey="account" title="Delete Account" disabled>
            <Container style={styles.button}>
              <Button
                onClick={onSubmit}
                disabled={loading}
                type="submit"
                size="lg"
                variant="outline-danger"
                id="deleteProfileButton">
                Delete My Account&nbsp;&nbsp;<FontAwesomeIcon icon={faSkullCrossbones} size="sm" />
              </Button>
            </Container>
          </Tab>
        </Tabs>
      </div>
    </FormikForm>
  )
}

export const LogoutContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) =>
        <LogoutForm onSubmit={handleSubmit} />
      }
    </Formik>
  )
}

const LogoutForm = ({ onSubmit }) => {
  return (
    <FormikForm>
      <div className="form-group mb-3">
        <Tabs defaultActiveKey="logout" className="mb-3">
          <Tab eventKey="logout" title="Logout" disabled>
            <Container style={styles.button}>
              <Button
                onClick={onSubmit}
                type="submit"
                size="lg"
                variant="outline-secondary"
                id="logoutButton">
                Logout&nbsp;&nbsp;<FontAwesomeIcon icon={faShareSquare} size="sm" />
              </Button>
            </Container>
          </Tab>
        </Tabs>
      </div>
    </FormikForm>
  )
}

const Profile = () => {
  const [text, setText] = useState(null)
  const [isError, setIsError] = useState(false)
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (storage.loadUser() === null) {
      dispatch(logout())
    } else {
      // if user visits another tab while timeout hooks are not yet called, clear timeout before that
      clearTimeout(storage.loadTimeout())
      dispatch(getTooltips())
    }
  }, [])

  storage.saveTab('profile')

  const user = useSelector(state => state.user)
  const tooltipsStatus = useSelector(state => state.profile)

  const handleToggleTooltips = async (values, { setSubmitting }) => {
    if (storage.loadUser() === null) {
      dispatch(logout())
    } else {
      const tooltips = values.tooltips
      if (tooltips !== tooltipsStatus.tooltips.toString()) {
        setLoading(true)
        setSubmitting(false)
        try {
          await profileService.toggleTooltips({
            tooltips
          })
          dispatch(getTooltips())
          setText('Tooltips visibility was changed.')
          const timeoutTooltips = setTimeout(() => {
            setText(null)
            setLoading(false)
          }, 3000)
          storage.saveTimeout(timeoutTooltips)
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
      } else {
        setLoading(true)
        setText('Tooltips visibility is already set to selected value.')
        const timeoutTooltipsAlreadySet = setTimeout(() => {
          setText(null)
          setLoading(false)
        }, 3000)
        storage.saveTimeout(timeoutTooltipsAlreadySet)
      }
    }
  }

  const handleChangePassword = async (values, { setSubmitting, resetForm }) => {
    if (storage.loadUser() === null) {
      dispatch(logout())
    } else {
      const oldPassword = values.oldPassword
      const newPassword = values.newPassword
      setLoading(true)
      setSubmitting(false)
      resetForm(initialValues)
      try {
        await profileService.changePassword({
          oldPassword, newPassword
        })
        dispatch(changedPassword())
        setText('Password was changed.')
        const timeoutPassword = setTimeout(() => {
          setText(null)
          setLoading(false)
        }, 3000)
        storage.saveTimeout(timeoutPassword)
      } catch(error) {
        if (storage.loadUser() !== null) {
          setIsError(true)
          setText('Error: Old password is not valid')
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

  const handleDeleteProfile = async () => {
    if (storage.loadUser() === null) {
      dispatch(logout())
    } else {
      if (confirm('Yes, I understand that his action is irreversible and I wish to delete my account.')) {
        try {
          await deleteService.deleteUser(user.username)
          storage.logoutUser()
          dispatch(deleteUser())
          history.push('/')
        } catch(error) {
          if (storage.loadUser() !== null) {
            setIsError(true)
            setText(error.message)
          }
        }
      } else {
        setLoading(true)
        // if setTimeout gets called and user is already logged out, don't call hooks
        setText('Profile delete cancelled.')
        const timeout = setTimeout(() => {
          setText(null)
          setLoading(false)
        }, 3000)
        storage.saveTimeout(timeout)
      }
    }
  }

  const handleLogout = () => {
    storage.logoutUser()
    dispatch(logout())
    history.push('/')
  }

  return (
    <Container>
      <Dashboard />
      <h2 style={styles.subtitle}>Profile</h2>
      {text !== null && <Notification text={text}
        error={isError} />}
      <LoggedInUser user={user} />
      <ToggleTooltipsContainer onSubmit={handleToggleTooltips} loading={loading}
        tooltips={tooltipsStatus} />
      <ChangePasswordContainer onSubmit={handleChangePassword} loading={loading} />
      <DeleteProfileContainer onSubmit={handleDeleteProfile}  loading={loading} />
      <LogoutContainer onSubmit={handleLogout} />
      <br /><br />
      <br /><br />
      <Footer />
    </Container>
  )
}

export default Profile