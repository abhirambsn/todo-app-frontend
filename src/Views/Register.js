import React, { Component } from 'react'
import { authAPIHandler } from '../api/auth'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: ''
        }
        this.register = this.register.bind(this)
        this.changeEmail = this.changeEmail.bind(this)
        this.changeName = this.changeName.bind(this)
        this.changePassword = this.changePassword.bind(this)
    }

    register = (event) => {
        event.preventDefault()
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        authAPIHandler.post("/register", data)
            .then((response) => {
                if (response.status === 200) {
                    alert(`User Registration Successful Please logIn`)
                    window.location = "/login"
                }
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    alert(err)
                }
            })
    }

    changeName = (event) => {
        this.setState({name: event.target.value})
    }

    changeEmail = (event) => {
        this.setState({email: event.target.value})
    }

    changePassword = (event) => {
        this.setState({password: event.target.value})
    }

    render() {
        return (
            <div className="container">
                <br/>
                <div className="justify-content-center align-items-center">
                    <div className="card">
                        <div className="card-header text-center">
                            Register
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.register}>
                                <div className="row">
                                    <label htmlFor="name" className="col-3 form-label">Name</label>
                                    <input type="text" name="name" id="name" onChange={this.changeName} className="col form-control" placeholder="Enter Name" />
                                </div><br />
                                <div className="row">
                                    <label htmlFor="email" className="col-3 form-label">Email</label>
                                    <input type="email" name="email" id="email" onChange={this.changeEmail} className="col form-control" placeholder="Enter Email" />
                                </div><br />
                                <div className="row">
                                    <label htmlFor="password" className="col-3 form-label">Password</label>
                                    <input type="password" name="password" id="password" onChange={this.changePassword} className="col form-control" placeholder="Enter Password" />
                                </div><br />
                                <div className="row d-grid gap-2">
                                    <input type="submit" className="btn btn-success" value="Register" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export { Register }