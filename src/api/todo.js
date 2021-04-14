import axios from 'axios'

const todoAPIHandler = axios.create({
    baseURL: "http://localhost:5000/api/todo"
})

export { todoAPIHandler }