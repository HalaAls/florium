import axios from 'axios'

axios.defaults.withCredentials = true

const isDevelopment = import.meta.env.MODE === 'development'
let baseURL = 'http://localhost:5050'

if (!isDevelopment) {
  // Update this later when you have a working backend server
  baseURL = 'http://localhost:5050'
}

const api = axios.create({
  baseURL
})
export { baseURL }
export default api
