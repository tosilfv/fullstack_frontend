import axios from 'axios'

let baseUrl = '/welcome/login'

if (process.env.NODE_ENV === 'test') {
  baseUrl = 'http://localhost:3001/welcome/login'
}

if (process.env.NODE_ENV === 'production') {
  baseUrl = '/welcome/login'
}

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }