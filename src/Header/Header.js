import React, { Component } from 'react'
import { title } from '../constants'
import { checkAuth } from '../Views/checkAuth'

class Header extends Component {
    constructor() {
        super()
        this.state = {
            auth: false
        }
    }
    async componentDidMount() {
        const authenticated = await checkAuth()
        this.setState({auth: authenticated})
        
    }
    render() {
        const none = "#"
        return (
            !this.state.auth ? (
                <nav className="navbar navbar-light navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href={none}>{title}</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="btn btn-outline-success" href="/login">Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="btn btn-outline-primary ms-2" href="/register">Register</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            ) : (
                <nav className="navbar navbar-light navbar-expand-lg bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href={none}>{title}</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/dashboard">Dashboard</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/profile">My Profile</a>
                                </li>
                            </ul>
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="btn btn-outline-danger" href="/logout">Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            )
        )
    }
}

export { Header }