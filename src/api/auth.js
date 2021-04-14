import axios from 'axios'

const authAPIHandler = axios.create({
    baseURL: "http://localhost:5000/api/user"
})

export { authAPIHandler }