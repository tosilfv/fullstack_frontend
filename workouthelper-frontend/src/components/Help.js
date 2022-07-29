import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getTooltips } from '../reducers/profileReducer'
import { logout } from '../reducers/userReducer'
import storage from '../utils/storage'

import {
  Accordion, Card, Container,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import {
  faBrain, faChartLine, faClock as solidClock, faDumbbell,
  faInfo, faSkullCrossbones,
} from '@fortawesome/free-solid-svg-icons'

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
  helpIcon: {
    display: theme.displays.flex,
    justifyContent: theme.justifications.center,
  },
  subtitle: {
    color: theme.colors.darkPink,
    fontFamily: theme.fontFamilies.quantico,
    fontSize: theme.fontSizes.subtitle,
  },
}

const Help = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (storage.loadUser() === null) {
      dispatch(logout())
    } else {
      clearTimeout(storage.loadTimeout())
      dispatch(getTooltips())
    }
  }, [])

  storage.saveTab('help')

  return (
    <Container>
      <Dashboard />
      <h2 style={styles.subtitle}>Help</h2>
      <Accordion defaultActiveKey="0">
        <Accordion.Item>
          <Accordion.Header>Workout</Accordion.Header>
          <Accordion.Body>
            <Card border="info">
              <Card.Body>
                <Container style={styles.helpIcon}>
                  <FontAwesomeIcon icon={faDumbbell} size="3x" />
                </Container>
                <Card.Header style={{ textAlign: theme.alignments.center }}>
                  <Card.Title>Workout</Card.Title>
                </Card.Header>
                <br />
                <Card.Subtitle>Select workout: Workouts</Card.Subtitle>
                <Card.Text>
                The saved workouts will show up here in alphabetical order. By clicking a
                workout, the workout will appear under the Selected Workout tab.
                </Card.Text>
                <Card.Subtitle>Selected Workout</Card.Subtitle>
                <Card.Text>
                Here the workout that was selected from Select workout dropdown list will be
                shown.
                </Card.Text>
                <Card.Subtitle>Selected Workout Category - Title</Card.Subtitle>
                <Card.Text>
                This shows the Category - Title of the Selected Workout.
                </Card.Text>
                <Card.Subtitle>Previous Target Result</Card.Subtitle>
                <Card.Text>
                This shows the previous target of the Selected Workout.
                </Card.Text>
                <Card.Subtitle>Previous Result</Card.Subtitle>
                <Card.Text>
                This shows the previous result of the Selected Workout.
                </Card.Text>
                <Card.Subtitle>Previous Notes</Card.Subtitle>
                <Card.Text>
                This shows the previous notes of the Selected Workout.
                </Card.Text>
                <Card.Subtitle>New Target Result</Card.Subtitle>
                <Card.Text>
                Here the new target for the result of the workout will be set. This field is
                optional.
                </Card.Text>
                <Card.Subtitle>New Result</Card.Subtitle>
                <Card.Text>
                When you complete a workout, you can save one (1) parameter for each workout. E.g.
                the reps for an exercise. Also by using your imagination, you can save pretty much
                any parameter you want. If you want to keep track of let&rsquo;s say the water
                temperature of a lake, then you would save the temperature measurement as the one
                parameter of this &rsquo;workout&rsquo; if you will. Fragments can be saved as
                .5002 or 90.01 up to 38 decimal places (.00000000000000000000000000000000000000).
                Use dots [.] instead of commas [,].
                  <br />
                  <FontAwesomeIcon icon={faInfo} color="blue" /> NB You can save a number in the range
                of [-999999999999999999999999999999999999999, 9999999999999999999999999999999999999999].
                If you change the unit used in some of the results, it will mess up the statistics, so
                be careful. Best practice would be to use the same unit of measure e.g. feet throughout
                the workout history. Furthermore if you change new result number and then click the Save
                button for the Selected Workout, it will not overwrite the previous result of this
                workout.
                  <br />
                  <FontAwesomeIcon icon={faInfo} color="blue" /> NB Saved results cannot be edited, they
                can only be removed by deleting the selected workout.
                </Card.Text>
                <Card.Subtitle>. .../ (Notes)</Card.Subtitle>
                <Card.Text>
                Here the new notes for the workout will be written. This field is optional.
                Here you can again use your imagination to set up whatever kinds of notes you want
                for you workout. As an example, you could write down the date when something
                remarkable happened like &rsquo;2.2.2021 I made my personal best of 25 Bench presses,
                thanks to 5 weeks of progressive overload to the upper body.&rsquo;.
                  <br />
                  <FontAwesomeIcon icon={faInfo} color="blue" /> NB Saved notes cannot be edited, they
                can only be removed by deleting the selected workout. There is an upper limit of 5000
                characters per one workout notes.
                </Card.Text>
                <Card.Subtitle>Save</Card.Subtitle>
                <Card.Text>
                By clicking the Save button of the Selected Workout, the fields of the Selected Workout
                form with the currently input parameters and text will be saved and visible on the
                Statistics Tab Chart respectfully.
                </Card.Text>
                <Card.Subtitle>Delete</Card.Subtitle>
                <Card.Text>
                By clicking the Delete button of the Selected Workout and selecting OK from the
                dialog &rsquo;Yes, I understand that his action is irreversible and I wish to delete
                my workout.&rsquo;, the selected workout will be deleted.
                  <br />
                  <FontAwesomeIcon icon={faInfo} color="blue" /> NB This action will remove all history
                of the workout from the Statistics Tab page as well. If there wasn&rsquo;t a workout
                selected when clicking the Delete button, it will not delete anything.
                </Card.Text>
                <Card.Subtitle>Create a New Workout Category and Title</Card.Subtitle>
                <Card.Text>
                Write down the category and title of the workout. It is of course possible to write
                only the title e.g. if the title is long. Category and Title field takes up to 55
                characters and it should represent generally the type of activity or phenomenon you
                are going to measure, e.g. Exercise, Guitar, School, Temperature, Racetrack or
                Competition just to name a few. It would be beneficial to be specific about the title
                of the measured activity. To include used weights, target time frame or used physical
                measurement units in the likes of Bench press 132 lb 1 min, Chord changes A-D 2 min,
                Geometry grades Junior High A+=13...F=1, Malibu Beach water [°F], Laguna Seca hot
                lap [s], Javelin throw [&rsquo;].
                </Card.Text>
                <Card.Subtitle>Create a New Workout Target Result</Card.Subtitle>
                <Card.Text>
                Set the goal of your workout here. You can change the target number even during a
                workout.
                </Card.Text>
                <Card.Subtitle>Save</Card.Subtitle>
                <Card.Text>
                By clicking the Save button at the bottom of the Workout Tab page, the fields of
                the Workout form with the currently input parameters and text will be saved and
                visible on the Statistics Tab Chart respectfully.
                </Card.Text>
              </Card.Body>
            </Card>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion defaultActiveKey="0">
        <Accordion.Item>
          <Accordion.Header>Timers</Accordion.Header>
          <Accordion.Body>
            <Card border="info">
              <Card.Body>
                <Container style={styles.helpIcon}>
                  <FontAwesomeIcon icon={solidClock} size="3x" />
                </Container>
                <Card.Header style={{ textAlign: theme.alignments.center }}>
                  <Card.Title>Timers</Card.Title>
                </Card.Header>
                <br />
                <Card.Subtitle>Stopwatch</Card.Subtitle>
                <Card.Text>
                The Stopwatch buttons from left to right are Start, Pause and Reset. Stopwatch is
                started by clicking the Start button, paused by clicking the Pause button and reset
                by clicking the Reset button. The Stopwatch displays the elapsed time that is measured
                with 1/100 second accuracy. The Stopwatch can measure times up to {'99:59\'59\'\'99'}.
                When setting Advance by setting its time in ({'\''}) and ({'\'\''}) and clicking the
                ({'Set \' \'\''}) button, you give yourself time to grab a guitar or get to workout
                starting position before the Stopwatch is started. By clicking ({'< B-O-P ! >'}) ON,
                a sound is played when Advance has count to zero (0).
                </Card.Text>
                <Card.Subtitle>Countdown timer</Card.Subtitle>
                <Card.Text>
                The Countdown timer buttons from left to right are Start, Pause and Reset. Countdown
                timer is started by clicking the Start button, paused by clicking the Pause button and
                reset by clicking the Reset button. The Countdown timer displays the elapsed time that
                is measured with 1/100 second accuracy. The Time can be set to the nearest second and up
                to {'23:59\'59\'\'99'} by clicking the ({'Set : \' \'\''}) button. Remember to set
                Countdown timer Time before Advance, because the Countdown timer will start counting
                from whichever numbers are currently shown on the Countdown timer display.
                When setting Advance by setting its time in ({'\''}) and ({'\'\''}) and clicking the
                ({'Set \' \'\''}) button, you give yourself time to grab a guitar or get to workout
                starting position before the Countdown timer is started. By clicking ({'< B-O-P ! >'})
                ON, a sound is played when Advance has count to zero (0) and when Time has count to zero
                (0).
                </Card.Text>
                <Card.Subtitle>Metronome</Card.Subtitle>
                <Card.Text>
                The Metronome buttons from left to right are Start, Pause and Reset. Metronome is
                started by clicking the Start button, paused by clicking the Pause button and reset
                by clicking the Reset button. By adjusting the BPM slider, you can set your Metronome
                Beats per Minute. Once you have adjusted the BPM slider, click on ({'Set BPM'}) button.
                This action will set the Beats per Minute to the shown value, which can be seen above
                the ({'Set BPM'}) button. The Metronome displays light on each beat above the BPM
                slider once it is started. The color of the light can be altered from the color picker
                under the Color header.
                </Card.Text>
              </Card.Body>
            </Card>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion defaultActiveKey="0">
        <Accordion.Item>
          <Accordion.Header>Statistics</Accordion.Header>
          <Accordion.Body>
            <Card border="info">
              <Card.Body>
                <Container style={styles.helpIcon}>
                  <FontAwesomeIcon icon={faChartLine} size="3x" />
                </Container>
                <Card.Header style={{ textAlign: theme.alignments.center }}>
                  <Card.Title>Statistics</Card.Title>
                </Card.Header>
                <br />
                <Card.Subtitle>Selected Statistics</Card.Subtitle>
                <Card.Text>
                View the selected workout result parameters here arranged by the date by
                selecting the statistics from the &rsquo;Select workout statistics:&rsquo;
                dropdown list.
                  <br />
                  <FontAwesomeIcon icon={faInfo} color="blue" /> NB You cannot edit any of
                the viewable parameters in the Statistics Tab.
                  <br />
                  <FontAwesomeIcon icon={faInfo} color="blue" /> NB If you cannot see the latest
                statistics, try selecting the statistics again from the dropdown list.
                </Card.Text>
                <Card.Subtitle>Category - Title</Card.Subtitle>
                <Card.Text>
                View the selected workout category and title here.
                </Card.Text>
                <Card.Subtitle>Target</Card.Subtitle>
                <Card.Text>
                View the selected workout target parameter here.
                </Card.Text>
                <Card.Subtitle>Min</Card.Subtitle>
                <Card.Text>
                View the selected workout min parameter here.
                </Card.Text>
                <Card.Subtitle>Max</Card.Subtitle>
                <Card.Text>
                View the selected workout max parameter here.
                </Card.Text>
                <Card.Subtitle>Avg</Card.Subtitle>
                <Card.Text>
                View the selected workout average parameter here.
                  <br />
                  <FontAwesomeIcon icon={faInfo} color="blue" /> NB The first parameter (0),
                  which is set by the program when a new workout is created, is not taken into
                  account when calculating the average of all the input results.
                </Card.Text>
                <Card.Subtitle>Last</Card.Subtitle>
                <Card.Text>
                View the selected workout last parameter here.
                </Card.Text>
                <Card.Subtitle>Notes</Card.Subtitle>
                <Card.Text>
                View the selected workout notes here.
                </Card.Text>
              </Card.Body>
            </Card>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion defaultActiveKey="0">
        <Accordion.Item>
          <Accordion.Header>Planner</Accordion.Header>
          <Accordion.Body>
            <Card border="info">
              <Card.Body>
                <Container style={styles.helpIcon}>
                  <FontAwesomeIcon icon={faBrain} size="3x" />
                </Container>
                <Card.Header style={{ textAlign: theme.alignments.center }}>
                  <Card.Title>Planner</Card.Title>
                </Card.Header>
                <br />
                <Card.Subtitle>Select plan: Plans</Card.Subtitle>
                <Card.Text>
                The saved plans will show up here in alphabetical order. By clicking a plan,
                the plan will appear under the Selected Plan tab.
                </Card.Text>
                <Card.Subtitle>Selected Plan</Card.Subtitle>
                <Card.Text>
                Here the plan that was selected from Select plan dropdown list will be shown.
                </Card.Text>
                <Card.Subtitle>Delete</Card.Subtitle>
                <Card.Text>
                By clicking the Delete button on the Planner Tab page and selecting OK from the
                dialog &rsquo;Yes, I understand that his action is irreversible and I wish to delete
                my plan.&rsquo;, the selected plan will be deleted.
                  <br />
                  <FontAwesomeIcon icon={faInfo} color="blue" /> NB If there wasn&rsquo;t a plan
                selected when clicking the OK button from the dialog, it will not delete anything.
                </Card.Text>
                <Card.Subtitle>Create a New Plan Name</Card.Subtitle>
                <Card.Text>
                This should represent generally the type of plan or memo you are going to
                execute, e.g. Plan A, Pizza Recipe, Workout Schedule, Road to Guitar Excellence or
                Random thoughts just to name a few.
                </Card.Text>
                <Card.Subtitle>Create a New Plan Memo</Card.Subtitle>
                <Card.Text>
                Here you can again use your imagination to set up whatever kind of memo you want
                for you plan. As an example, you could write down the instructions when something
                important is supposed to happen like &rsquo;MONDAYS and WEDNESDAYS: Upper body&rsquo;.
                </Card.Text>
                <Card.Subtitle>Save</Card.Subtitle>
                <Card.Text>
                By clicking the Save button on the Planner Tab page, the fields of the Planner form
                with the currently input text will be saved to your user account as a new plan.
                </Card.Text>
              </Card.Body>
            </Card>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion defaultActiveKey="0">
        <Accordion.Item>
          <Accordion.Header>Profile</Accordion.Header>
          <Accordion.Body>
            <Card border="info">
              <Card.Body>
                <Container style={styles.helpIcon}>
                  <FontAwesomeIcon icon={faUser} size="3x" />
                </Container>
                <Card.Header style={{ textAlign: theme.alignments.center }}>
                  <Card.Title>Profile</Card.Title>
                </Card.Header>
                <br />
                <Card.Subtitle>Logged in User</Card.Subtitle>
                <Card.Text>
                Here the username of the logged in user is displayed. This field is uneditable.
                </Card.Text>
                <Card.Subtitle>Tooltips</Card.Subtitle>
                <Card.Text>
                The current status of the Tooltips&rsquo; visibility is displayed the first row.
                &rsquo;On&rsquo; means that the Tooltips are visible and &rsquo;Off&rsquo; means
                that they are not visible. Select the desired visibility from the corresponding
                dropdown list between values &rsquo;On&rsquo; and &rsquo;Off&rsquo;. By clicking
                the Save button, the Tooltips visibility will be changed.
                </Card.Text>
                <Card.Subtitle>Change Password</Card.Subtitle>
                <Card.Text>
                Write the password you currently use to login to the Old Password field. Write the new
                password to which you want to change your current password to the New Password field.
                Write the new password you wrote into the New Password field again to the Password
                Confirmation field. By clicking the Save button below the aforementioned password fields,
                the old account password that was used with login, will be changed to the new one.
                </Card.Text>
                <Card.Subtitle>Delete Account</Card.Subtitle>
                <Card.Text>
                By clicking the Delete My Account button on the Profile Tab page and
                selecting OK from the dialog &rsquo;Yes, I understand that his action is irreversible and I wish to delete
                my account.&rsquo;, all account information will be deleted and you will
                be redirected back to the login page.
                  <br />
                  <FontAwesomeIcon icon={faSkullCrossbones} color="red" />
                  <FontAwesomeIcon icon={faInfo} color="blue" /> NB This action is irreversible!
                </Card.Text>
                <Card.Subtitle>Logout</Card.Subtitle>
                <Card.Text>
                By clicking the Log out button on the Profile Tab page, you will log out from the
                Workout Helper App and be redirected back to the login page.
                </Card.Text>
              </Card.Body>
            </Card>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <br /><br />
      <br /><br />
      <Footer />
    </Container>
  )
}

export default Help