import axios from 'axios'
import storage from '../utils/storage'

let baseUrl = '/dashboard/planner'

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` }
  }
}

if (process.env.NODE_ENV === 'test') {
  baseUrl = 'http://localhost:3001/dashboard/planner'
}

if (process.env.NODE_ENV === 'production') {
  baseUrl = '/dashboard/planner'
}

const createNewPlan = async (newPlan) => {
  const response = await axios.post(`${baseUrl}/newPlan`, newPlan, getConfig())
  return response.data
}

const getAll = async () => {
  const response = await axios.post(`${baseUrl}/plans`, {}, getConfig())
  return response.data
}

export default { createNewPlan, getAll }