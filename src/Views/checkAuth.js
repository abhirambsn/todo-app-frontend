import { Redirect, Route } from "react-router"
import { authAPIHandler } from "../api/auth"

const checkAuth = async () => {
    let isAuth = false;
    try {
        const token = localStorage.getItem("token")
        const headers = {
            "auth-token": token
        }
        await authAPIHandler.get("/profile", { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    isAuth = true
                } else {
                    isAuth = false
                }
            })
            .catch((error) => {
                isAuth = false
            })
    } catch(err) {
        isAuth = false
    }
    return isAuth
}

const ProtectedRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        checkAuth() ? (<Component {...props} />) : (<Redirect to={{pathName: "/login"}} />) 
    )}></Route>
)

export { checkAuth, ProtectedRoute }