const planKey = process.env.REACT_APP_PLAN_KEY
const statisticsKey = process.env.REACT_APP_STATISTICS_KEY
const tabKey = process.env.REACT_APP_TAB_KEY
const timeoutKey = process.env.REACT_APP_TIMEOUT_KEY
const storageKey = process.env.REACT_APP_STORAGE_KEY
const workoutKey = process.env.REACT_APP_WORKOUT_KEY

const savePlan = (plan) =>
  localStorage.setItem(planKey, JSON.stringify(plan))

const loadPlan= () =>
  JSON.parse(localStorage.getItem(planKey))

const saveStatistics = (statistics) =>
  localStorage.setItem(statisticsKey, JSON.stringify(statistics))

const loadStatistics = () =>
  JSON.parse(localStorage.getItem(statisticsKey))

const saveTab = (tab) =>
  localStorage.setItem(tabKey, JSON.stringify(tab))

const loadTab = () =>
  JSON.parse(localStorage.getItem(tabKey))

const saveTimeout = (timeout) =>
  localStorage.setItem(timeoutKey, JSON.stringify(timeout))

const loadTimeout = () =>
  JSON.parse(localStorage.getItem(timeoutKey))

const saveUser = (user) =>
  localStorage.setItem(storageKey, JSON.stringify(user))

const loadUser = () =>
  JSON.parse(localStorage.getItem(storageKey))

const logoutUser = () => {
  localStorage.removeItem(planKey)
  localStorage.removeItem(statisticsKey)
  localStorage.removeItem(tabKey)
  localStorage.removeItem(timeoutKey)
  localStorage.removeItem(storageKey)
  localStorage.removeItem(workoutKey)
}

const saveWorkout = (workout) =>
  localStorage.setItem(workoutKey, JSON.stringify(workout))

const loadWorkout = () =>
  JSON.parse(localStorage.getItem(workoutKey))

export default {
  savePlan,
  loadPlan,
  saveStatistics,
  loadStatistics,
  saveTab,
  loadTab,
  saveTimeout,
  loadTimeout,
  saveUser,
  loadUser,
  logoutUser,
  saveWorkout,
  loadWorkout,
}