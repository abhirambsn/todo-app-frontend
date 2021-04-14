import { Component } from "react";
import { Redirect } from "react-router";

class Logout extends Component {
    render() {
        localStorage.clear()
        return (
            <Redirect to={{pathname: "/login"}} />
        )
    }
}

export { Logout }