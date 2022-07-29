import axios from 'axios'
import storage from '../utils/storage'

let baseUrl = '/dashboard/profile'

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` }
  }
}

if (process.env.NODE_ENV === 'test') {
  baseUrl = 'http://localhost:3001/dashboard/profile'
}

if (process.env.NODE_ENV === 'production') {
  baseUrl = '/dashboard/profile'
}

const getTooltips = async () => {
  const response = await axios.post(`${baseUrl}/tooltips`, {}, getConfig())
  return response.data
}

const toggleTooltips = async (tooltips) => {
  const response = await axios.put(`${baseUrl}/toggleTooltips`, tooltips, getConfig())
  return response.data
}

const changePassword = async (changePassword) => {
  const response = await axios.put(`${baseUrl}/newPassword`, changePassword, getConfig())
  return response.data
}

export default { getTooltips, toggleTooltips, changePassword }