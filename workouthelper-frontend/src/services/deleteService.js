import axios from 'axios'
import storage from '../utils/storage'

let baseUrl = '/api/delete'

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` }
  }
}

if (process.env.NODE_ENV === 'test') {
  baseUrl = 'http://localhost:3001/api/delete'
}

if (process.env.NODE_ENV === 'production') {
  baseUrl = '/api/delete'
}

const deletePlan = async (plan) => {
  const response = await axios.delete(`${baseUrl}/plan/${plan}`, getConfig())
  return response.data
}

const deleteUser = async (username) => {
  const response = await axios.delete(`${baseUrl}/${username}`, getConfig())
  return response.data
}

const deleteWorkout = async (workout) => {
  const response = await axios.delete(`${baseUrl}/workout/${workout}`, getConfig())
  return response.data
}

export default { deletePlan, deleteUser, deleteWorkout }