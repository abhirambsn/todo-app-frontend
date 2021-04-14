import axios from 'axios'
import env from 'react-dotenv'

const todoAPIHandler = axios.create({
    baseURL: env.API_URL + "/api/todo"
})

export { todoAPIHandler }