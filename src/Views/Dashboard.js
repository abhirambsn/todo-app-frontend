import { Component } from "react";
import { todoAPIHandler } from "../api/todo";
import { checkAuth } from "./checkAuth";

const headers = {
    "auth-token": localStorage.getItem("token")
}

class Dashboard extends Component {
    constructor() {
        super()
        this.getAllTodos = this.getAllTodos.bind(this)
        this.printDate = this.printDate.bind(this)
        this.deleteTodo = this.deleteTodo.bind(this)
        this.addTodo = this.addTodo.bind(this)
        this.changedContent = this.changedContent.bind(this)
        this.changedTitle = this.changedTitle.bind(this)
        this.markAsComplete = this.markAsComplete.bind(this)
        this.state = {
            todos: [],
            title: '',
            content: '',
        }
        this.auth = null
    }

    addTodo = async (event) => {
        event.preventDefault()
        const data = {
            title: this.state.title,
            content: this.state.content
        }

        await todoAPIHandler.post("/", data, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    alert(`Todo Added\nTodo ID: ${response.data._id}`)
                    window.location.reload()
                } else {
                    alert(`An Error Occured: ${response.data}`)
                }
            })
            .catch((err) => {
                console.error(err)
                alert(err)
            })
    }

    changedContent = (event) => {
        this.setState({content: event.target.value})
    }

    changedTitle = (event) => {
        this.setState({title: event.target.value})
    }

    deleteTodo = async (event) => {
        const tId = event.target.id
        const uri = "/" + tId
        await todoAPIHandler.delete(uri, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    alert(`Todo Deleted`)
                    window.location.reload()
                }
            })
            .catch((error) => {
                alert(error)
            })
    }

    getAllTodos = async () => {
        
        await todoAPIHandler.get("/", { headers: headers })
            .then((response) => {
                this.setState({todos: response.data})
                console.log(this.state.todos);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    markAsComplete = async (event) => {
        const tId = event.target.id
        const uri = "/" + tId + "/complete"
        await todoAPIHandler.put(uri, {}, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    alert(`Todo ${tId} marked as Complete`)
                    window.location.reload()
                } else {
                    alert(`Error: ${response.data}`)
                }
            })
            .catch((err) => {
                alert(err)
            })
    }

    async componentDidMount() {
        const authenticate = await checkAuth()
        this.auth = authenticate
        await this.getAllTodos()    
    }

    printDate(date) {
        const dt = new Date(date)
        const dateString = dt.getDate() + "/" + dt.getMonth() + "/" + dt.getFullYear()
        return dateString
    }

    componentWillUnmount() {
        this.setState = (state,callback)=>{
            return;
        };
    }

    render() {
        const todos = this.state.todos.map((todo) => (
            <div className="col-4 pb-3">
                <div className="card">
                    <div className="card-header">
                        
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{todo.title}</h5>
                        <p className="card-text"><b>Content:</b> {todo.content}</p>
                        <p className="card-text"><b>Due Date: </b>{this.printDate(todo.dueDate)}</p>
                        {!todo.isCompleted ? (<p className="card-text"><b>Status: </b>Incomplete</p>) : (<p className="card-text"><b>Status: </b>Complete</p>)}
                        <div className="row">
                            {!todo.isCompleted ? (
                                <button className="col-5 btn btn-info" id={todo._id} onClick={this.markAsComplete}>Mark Complete</button>
                            ) : (
                                <button className="col-5 btn btn-success" disabled id={todo._id} onClick={this.markAsComplete}>Completed</button>
                            ) }
                            <div className="col-2"></div>
                            <button className="col-5 btn btn-danger" id={todo._id} onClick={this.deleteTodo}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        ))
        return (
            this.auth ? (
                <div className="container">
                <br />
                <div className="row">
                <h4 className="col-9 text-center">My Todos</h4>
                <button className="col-2 btn btn-primary align-items-right" data-bs-toggle="modal" data-bs-target="#addTodo">Add Todo</button>
                </div>
                <br/>
                <div className="row">
                    {todos}
                </div>
                <br/>
                <div className="modal fade" id="addTodo" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="addTodoLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-center" id="addTodoLabel">Add a Todo Task</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.addTodo}>
                                    <div className="container">
                                        <div className="row">
                                            <label htmlFor="title" className="form-label">Title</label>
                                            <input type="text" onChange={this.changedTitle} name="title" placeholder="Title" id="title" className="form-control" />
                                        </div><br />
                                        <div className="row">
                                            <label htmlFor="content" className="form-label">Content</label>
                                            <textarea name="content" onChange={this.changedContent} placeholder="Content" id="content" className="form-control" />
                                        </div><br />
                                        <div className="d-grid gap-2 row">
                                            <input type="submit" className="btn btn-primary" value="Add Todo" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ) : (<div className="container"><h4 className="text-center">NOT AUTHENTICATED</h4></div> )
            
        )
    }
}

export { Dashboard }