import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Header } from './Header/Header'
import { Footer } from './Footer/Footer'
import { Home } from './Views/Home'
import { Login } from './Views/Login'
import { Register } from './Views/Register'
import { ProtectedRoute } from './Views/checkAuth'
import { Dashboard } from './Views/Dashboard'
import { Logout } from './Views/Logout'
import { NotFound } from './Views/404'
import { Profile } from './Views/Profile'

class App extends Component {
    render() {
        return (
            <>
                <Header />
                <Router>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <ProtectedRoute path="/dashboard" component={Dashboard} />
                        <ProtectedRoute path="/profile" component={Profile} />
                        <ProtectedRoute path="/logout" component={Logout} />
                        <Route component={NotFound} />
                        <ProtectedRoute component={Dashboard} />
                    </Switch>
                </Router>
                <Footer />
            </>
        )
    }
}

export { App }