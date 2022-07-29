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
import { login } from '../reducers/userReducer'
import loginService from '../services/loginService'
import storage from '../utils/storage'

import {
  Button, Container, FloatingLabel, Spinner,
} from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'

import { TextInput } from './FormField'

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
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
})

export const LoginContainer = ({ onSubmit, loading }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, isValid, dirty }) =>
        <LoginForm onSubmit={handleSubmit} isValid={isValid}
          dirty={dirty} loading={loading} />
      }
    </Formik>
  )
}

const LoginForm = ({ onSubmit, isValid, dirty, loading }) => {
  return (
    <FormikForm>
      <div className="form-group mb-3">
        <FloatingLabel label="Username">
          {loading ? (
            <TextInput name="username" className="form-control" type="text"
              placeholder="Username" id="usernameFieldLogin" disabled />
          ) : (
            <TextInput name="username" className="form-control" type="text"
              placeholder="Username" id="usernameFieldLogin" />
          )}
        </FloatingLabel>
      </div>

      <div className="form-group mb-3">
        <FloatingLabel label="Password">
          {loading ? (
            <TextInput name="password" className="form-control" type="password"
              placeholder="Password" id="passwordFieldLogin" disabled />
          ) : (
            <TextInput name="password" className="form-control" type="password"
              placeholder="Password" id="passwordFieldLogin" />
          )}
        </FloatingLabel>
      </div>

      <Container style={styles.button}>
        <Button
          onClick={onSubmit}
          disabled={!dirty || !isValid}
          type="submit"
          size="lg"
          variant="outline-dark"
          id="loginButton">
          {loading ? (
            <>
              Login&nbsp;&nbsp;<Spinner animation="border" size="sm"
                id="loginButtonSpinner" />
            </>
          ) : (
            <>
              Login&nbsp;&nbsp;<FontAwesomeIcon icon={faSignInAlt} size="sm"
                id="loginButtonSignInIcon" />
            </>
          )}
        </Button>
      </Container>
    </FormikForm>
  )
}

const Login = () => {
  const [text, setText] = useState(null)
  const [redirectMessage, setRedirectMessage] = useState(null)
  const [isError, setIsError] = useState(false)
  const [loading, setLoading] = useState(false)

  const user = useSelector(state => state.user)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    clearTimeout(storage.loadTimeout())
  }, [])

  useEffect(() => {
    // If user does logout, or profile delete, then corresponding message is displayed
    if (user.length > 0 && typeof(user) === 'string') {
      setText(user)
    }
  }, [dispatch])

  storage.saveTab('login')

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const username = values.username
    const password = values.password
    setLoading(true)
    setSubmitting(false)
    resetForm(initialValues)
    try {
      const user = await loginService.login({
        username, password
      })
      storage.saveUser(user)
      setRedirectMessage('You are being redirected to the Dashboard ...')
      const timeoutLogin = setTimeout(() => {
        setRedirectMessage(null)
        dispatch(login(user))
        history.push('/dashboard/workout')
      }, 4000)
      storage.saveTimeout(timeoutLogin)
    } catch(error) {
      setIsError(true)
      setText('Error: Username or password is not valid')
      const timeoutError = setTimeout(() => {
        setIsError(false)
        setText(null)
        setLoading(false)
        history.push('/')
        history.push('/welcome/login')
      }, 3000)
      storage.saveTimeout(timeoutError)
    }
  }

  return (
    <Container>
      <Welcome loading={loading} />
      {text !== null && <Notification text={text}
        error={isError} />}
      {redirectMessage !== null && <Notification text={redirectMessage}
        error={isError} />}
      <LoginContainer onSubmit={onSubmit} loading={loading} />
      <br />
      <Footer />
    </Container>
  )
}

export default Login