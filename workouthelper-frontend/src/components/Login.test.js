import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from '../store'
import {
  fireEvent, render, waitFor,
} from '@testing-library/react'
import deleteService from '../services/deleteService'
import Login from './Login'
import Register from './Register'

describe('Frontend login form test', () => {
  it('Login page shows correct message with valid form submission', async () => {
    const registerComponent = render(
      <Provider store={store}>
        <Router>
          <Register />
        </Router>
      </Provider>
    )

    const inputUsername = registerComponent.container.querySelector('#usernameFieldRegister')
    const inputPassword = registerComponent.container.querySelector('#passwordFieldRegister')
    const inputConfirmation = registerComponent.container.querySelector('#confirmationFieldRegister')
    const checkboxTerms = registerComponent.container.querySelector('#termsCheckboxRegister')
    const form = registerComponent.container.querySelector('form')

    fireEvent.change(inputUsername, {
      target: { value: process.env.USER_NAME }
    })
    fireEvent.change(inputPassword, {
      target: { value: process.env.PASS_WORD }
    })
    fireEvent.change(inputConfirmation, {
      target: { value: process.env.PASS_WORD }
    })
    fireEvent.click(checkboxTerms)
    fireEvent.submit(form)

    await waitFor(() => {
      expect(registerComponent.container).toHaveTextContent(
        'Registering was successful for username:'
      )
      expect(registerComponent.container).toHaveTextContent(
        process.env.USER_NAME
      )
      expect(registerComponent.container).toHaveTextContent(
        'You are being redirected to the Login page ...'
      )
    })

    setTimeout(() => {
    }, 7000)

    const loginComponent = render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    )

    const loginUsername = loginComponent.container.querySelector('#usernameFieldLogin')
    const loginPassword = loginComponent.container.querySelector('#passwordFieldLogin')
    const loginForm = loginComponent.container.querySelector('form')

    fireEvent.change(loginUsername, {
      target: { value: process.env.USER_NAME }
    })
    fireEvent.change(loginPassword, {
      target: { value: process.env.PASS_WORD }
    })
    fireEvent.submit(loginForm)

    await waitFor(() => {
      expect(loginComponent.container).toHaveTextContent(
        'You are being redirected to the Dashboard ...'
      )
    })

    // after test, delete created test user from the database
    await deleteService.deleteUser(process.env.USER_NAME)
  })
})