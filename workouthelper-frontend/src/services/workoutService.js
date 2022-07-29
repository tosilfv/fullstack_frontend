import axios from 'axios'
import storage from '../utils/storage'

let baseUrl = '/dashboard/workouts'

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` }
  }
}

if (process.env.NODE_ENV === 'test') {
  baseUrl = 'http://localhost:3001/dashboard/workouts'
}

if (process.env.NODE_ENV === 'production') {
  baseUrl = '/dashboard/workouts'
}

const createNewWorkout = async (newWorkout) => {
  const response = await axios.post(`${baseUrl}/newWorkout`, newWorkout, getConfig())
  return response.data
}

const getAll = async () => {
  const response = await axios.post(`${baseUrl}/workouts`, {}, getConfig())
  return response.data
}

const updateWorkout = async (workout) => {
  const response = await axios.put(`${baseUrl}/updateWorkout`, workout, getConfig())
  return response.data
}

export default { createNewWorkout, getAll, updateWorkout }