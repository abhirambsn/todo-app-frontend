import axios from 'axios'
import env from 'react-dotenv'

const authAPIHandler = axios.create({
    baseURL:  env.API_URL + "/api/user"
})

export { authAPIHandler }