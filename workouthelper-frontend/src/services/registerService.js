import axios from 'axios'

let baseUrl = '/welcome/register'

if (process.env.NODE_ENV === 'test') {
  baseUrl = 'http://localhost:3001/welcome/register'
}

if (process.env.NODE_ENV === 'production') {
  baseUrl = '/welcome/register'
}

const createNew = async (newUser) => {
  const response = await axios.post(baseUrl, newUser)
  return response.data
}

export default { createNew }