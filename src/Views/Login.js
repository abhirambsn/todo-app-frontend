import React, { Component } from 'react'
import { authAPIHandler } from '../api/auth'

// const none = "#"

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }

        this.login = this.login.bind(this)
        this.changedEmail = this.changedEmail.bind(this)
        this.changedPassword = this.changedPassword.bind(this)
    }

    login = (event) => {
        event.preventDefault()
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        authAPIHandler.post("/login",  data)
            .then((response) => {
                if (response.status === 200) {
                    alert(`Welcome ${this.state.email}`)
                    localStorage.setItem("token", response.data)
                    window.location = "/dashboard"
                }
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    alert(`Invalid Password`)
                } else {
                    alert(error)
                }
            })
    }

    changedEmail = (event) => {
        this.setState({email: event.target.value})
    }

    changedPassword = (event) => {
        this.setState({password: event.target.value})
    }

    render() {
        return (
            <div className="container">
                <br />
                <div className="justify-content-center align-items-center">
                    <div className="card">
                        <div className="card-header text-center">
                            Login
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.login}>
                                <div className="row">
                                    <label htmlFor="email" className="col-3 form-label">Email</label>
                                    <input type="email" className="col form-control" onChange={this.changedEmail} placeholder="Email Address" />
                                </div><br/>
                                <div className="row">
                                    <label htmlFor="password" className="col-3 form-label">Password</label>
                                    <input type="password" className="col form-control" onChange={this.changedPassword} placeholder="Password" />
                                </div><br />
                                <div className="row d-grid gap-2">
                                    <input type="submit" className="btn btn-primary" value="Login" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export { Login }