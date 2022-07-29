import React, {
  useEffect, useState
} from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  Formik, Form as FormikForm
} from 'formik'
import * as yup from 'yup'
import { createUser } from '../reducers/userReducer'
import registerService from '../services/registerService'
import storage from '../utils/storage'

import {
  Button, Container, FloatingLabel, Spinner, Tab, Tabs,
} from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'

import {
  Checkbox, TextInput
} from './FormField'

import theme from '../theme'
import Footer from './Footer'
import Notification from './Notification'
import Welcome from './Welcome'

const styles = {
  button: {
    display: theme.displays.flex,
    justifyContent: theme.justifications.spaceBetween,
    paddingTop: theme.paddings.small,
    paddingRight: theme.paddings.zero,
    paddingBottom: theme.paddings.small,
    paddingLeft: theme.paddings.zero,
  },
  error: {
    color: theme.colors.errorRed,
  },
  notification: {
    fontSize: theme.fontSizes.subheading,
    padding: theme.paddings.large,
    textAlign: theme.alignments.center,
  },
}

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
  acceptedTerms: false,
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(30, 'Username must be at most 30 characters long')
    .required('New username is required')
    .matches(
      /^[a-zA-Z0-9_-]{3,30}$/,
      'Username must not contain white spaces or special characters other than _ or -'
    ),
  password: yup
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
    .oneOf([yup.ref('password'), null],
      'Password confirmation must match the password',
    ),
  acceptedTerms: yup.boolean()
    .required('Required')
    .oneOf([true],
      'You must agree before submitting'),
})

export const RegisterContainer = ({ onSubmit, loading }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, isValid, dirty }) =>
        <RegisterForm onSubmit={handleSubmit} isValid={isValid}
          dirty={dirty} loading={loading} />
      }
    </Formik>
  )
}

const RegisterForm = ({ onSubmit, isValid, dirty, loading }) => {
  return (
    <FormikForm>
      <div className="form-group mb-3">
        <Tabs defaultActiveKey="0" className="mb-3">
          <Tab eventKey="0" title="Register a New Username" disabled>
            <FloatingLabel label="New Username">
              {loading ? (
                <TextInput name="username" className="form-control" type="text"
                  placeholder="New Username" id="usernameFieldRegister" disabled />
              ) : (
                <TextInput name="username" className="form-control" type="text"
                  placeholder="New Username" id="usernameFieldRegister" />
              )}
            </FloatingLabel>
          </Tab>
        </Tabs>
      </div>

      <div className="form-group mb-3">
        <Tabs defaultActiveKey="0" className="mb-3">
          <Tab eventKey="0" title="Register a New Password" disabled>
            <FloatingLabel label="New Password">
              {loading ? (
                <TextInput name="password" className="form-control" type="password"
                  placeholder="New Password" id="passwordFieldRegister" disabled />
              ) : (
                <TextInput name="password" className="form-control" type="password"
                  placeholder="New Password" id="passwordFieldRegister" />
              )}
            </FloatingLabel>
          </Tab>
        </Tabs>
      </div>

      <div className="form-group mb-3">
        <FloatingLabel label="Password Confirmation">
          {loading ? (
            <TextInput name="passwordConfirmation" className="form-control" type="password"
              placeholder="Password Confirmation" id="confirmationFieldRegister" disabled />
          ) : (
            <TextInput name="passwordConfirmation" className="form-control" type="password"
              placeholder="Password Confirmation" id="confirmationFieldRegister" />
          )}
        </FloatingLabel>
      </div>

      <Checkbox name="acceptedTerms" id="termsCheckboxRegister">
        &nbsp;By clicking on Register, I confirm that I have read and I agree to the
        Terms of Service, which can be seen by clicking the Terms of Service button
        at the bottom of this page.
      </Checkbox>

      <Container style={styles.button}>
        <Button
          onClick={onSubmit}
          disabled={!dirty || !isValid}
          type="submit"
          size="lg"
          variant="outline-dark"
          id="registerButton">
          {loading ? (
            <>
              Register&nbsp;&nbsp;<Spinner animation="border" size="sm"
                id="registerButtonSpinner" />
            </>
          ) : (
            <>
              Register&nbsp;&nbsp;<FontAwesomeIcon icon={faCloudUploadAlt} size="sm"
                id="registerButtonCloudIcon" />
            </>
          )}
        </Button>
      </Container>
    </FormikForm>
  )
}

const Register = () => {
  const [newUsername, setNewUsername] = useState(null)
  const [text, setText] = useState(null)
  const [redirectMessage, setRedirectMessage] = useState(null)
  const [isError, setIsError] = useState(false)
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    clearTimeout(storage.loadTimeout())
  }, [])

  storage.saveTab('register')

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const username = values.username
    const password = values.password
    setLoading(true)
    setSubmitting(false)
    resetForm(initialValues)
    try {
      const user = await registerService.createNew({
        username, password
      })
      dispatch(createUser(user))
      setNewUsername(username)
      setText('Registering was successful for username:')
      setRedirectMessage('You are being redirected to the Login page ...')
      const timeoutRegister = setTimeout(() => {
        setNewUsername(null)
        setText(null)
        setRedirectMessage(null)
        history.push('/welcome/login')
      }, 6000)
      storage.saveTimeout(timeoutRegister)
    } catch(error) {
      setIsError(true)
      setText('Error: Username is already in use or credentials are not valid')
      const timeoutError = setTimeout(() => {
        setIsError(false)
        setText(null)
        setLoading(false)
        history.push('/')
        history.push('/welcome/register')
      }, 6000)
      storage.saveTimeout(timeoutError)
    }
  }

  return (
    <Container>
      <Welcome loading={loading} />
      {text !== null && <Notification text={text}
        error={isError} name={newUsername} />}
      {redirectMessage !== null && <Notification text={redirectMessage}
        error={isError} name={newUsername} />}
      <RegisterContainer onSubmit={onSubmit} loading={loading} />
      <br />
      <Footer />
    </Container>
  )
}

export default Register