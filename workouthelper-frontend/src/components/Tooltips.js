import React from 'react'

import { Tooltip } from 'react-bootstrap'

// Dashboard
export const workoutTooltip = (props) => (
  <Tooltip id="workoutTooltip" {...props}>
    Workout
  </Tooltip>
)

export const timersTooltip = (props) => (
  <Tooltip id="timersTooltip" {...props}>
    Timers
  </Tooltip>
)

export const statisticsTooltip = (props) => (
  <Tooltip id="statisticsTooltip" {...props}>
    Statistics
  </Tooltip>
)

export const plannerTooltip = (props) => (
  <Tooltip id="plannerTooltip" {...props}>
    Planner
  </Tooltip>
)

export const profileTooltip = (props) => (
  <Tooltip id="profileTooltip" {...props}>
    Profile
  </Tooltip>
)

export const helpTooltip = (props) => (
  <Tooltip id="helpTooltip" {...props}>
    Help
  </Tooltip>
)

// Workout
export const selectedWorkoutCategoryTitleTooltip = (props) => (
  <Tooltip id="selectedWorkoutCategoryTitleTooltip" {...props}>
    This is the category and title of the selected workout
  </Tooltip>
)

export const selectedWorkoutPreviousTargetTooltip = (props) => (
  <Tooltip id="selectedWorkoutPreviousTooltip" {...props}>
    This is the previous target result of the selected workout
  </Tooltip>
)

export const selectedWorkoutPreviousResultTooltip = (props) => (
  <Tooltip id="selectedWorkoutPreviousTooltip" {...props}>
    This is the previous result of the selected workout
  </Tooltip>
)

export const selectedWorkoutPreviousNotesTooltip = (props) => (
  <Tooltip id="selectedWorkoutPreviousTooltip" {...props}>
    These are the previous notes of the selected workout.
    Expand the text area by dragging the bottom right corner.
  </Tooltip>
)

export const selectedWorkoutTargetTooltip = (props) => (
  <Tooltip id="selectedWorkoutTargetTooltip" {...props}>
    Type the new target result of the selected workout. Previous target will be
    overwritten. This field is optional.
  </Tooltip>
)

export const selectedWorkoutResultTooltip = (props) => (
  <Tooltip id="selectedWorkoutResultTooltip" {...props}>
    Type the new result of the selected workout
  </Tooltip>
)

export const selectedWorkoutNotesTooltip = (props) => (
  <Tooltip id="selectedWorkoutNotesTooltip" {...props}>
    Write here the new notes of your selected workout. Expand the text area by
    dragging the bottom right corner. This field is optional.
  </Tooltip>
)

export const newWorkoutCategoryTitleTooltip = (props) => (
  <Tooltip id="newWorkoutCategoryTitleTooltip" {...props}>
    Type your new workout category and title
  </Tooltip>
)

export const newWorkoutTargetTooltip = (props) => (
  <Tooltip id="newWorkoutTargetTooltip" {...props}>
    Type your new workout target result
  </Tooltip>
)

// Timers
export const advanceTooltip = (props) => (
  <Tooltip id="advanceTooltip" {...props}>
    Set time before timer starts
  </Tooltip>
)

export const bopTooltip = (props) => (
  <Tooltip id="bopTooltip" {...props}>
    Set Bop to talk when timer advance and time is finished
  </Tooltip>
)

export const startTooltip = (props) => (
  <Tooltip id="startTooltip" {...props}>
    Start
  </Tooltip>
)

export const pauseTooltip = (props) => (
  <Tooltip id="pauseTooltip" {...props}>
    Pause
  </Tooltip>
)

export const resetTooltip = (props) => (
  <Tooltip id="resetTooltip" {...props}>
    Reset
  </Tooltip>
)

export const countdowntimerTimeTooltip = (props) => (
  <Tooltip id="countdowntimerTimeTooltip" {...props}>
    Remember to set countdown time before setting advance
  </Tooltip>
)

export const metronomeLightTooltip = (props) => (
  <Tooltip id="metronomeLightTooltip" {...props}>
    Set metronome light on or off
  </Tooltip>
)

export const metronomeSoundTooltip = (props) => (
  <Tooltip id="metronomeSoundTooltip" {...props}>
    Set metronome sound on or off
  </Tooltip>
)

// Statistics
export const statisticsNotesTooltip = (props) => (
  <Tooltip id="statisticsNotesTooltip" {...props}>
      Expand your statistics notes text area by dragging the bottom right corner
  </Tooltip>
)

// Planner
export const plannerNameTooltip = (props) => (
  <Tooltip id="plannerNameTooltip" {...props}>
    Type your plan name here
  </Tooltip>
)

export const plannerMemoTooltip = (props) => (
  <Tooltip id="plannerMemoTooltip" {...props}>
    Expand your plan memo text area by dragging the bottom right corner
  </Tooltip>
)