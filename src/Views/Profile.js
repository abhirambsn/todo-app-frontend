import { Component } from "react";
import { authAPIHandler } from "../api/auth";

const headers = {
    "auth-token": localStorage.getItem("token")
}

class Profile extends Component {
    constructor(props) {
        super(props)
        this.getProfile = this.getProfile.bind(this)
        this.printDate = this.printDate.bind(this)
        this.state = {
            user: {},
            curPass: '',
            password1: '',
            password2: ''
        }
    }

    printDate(date) {
        const dt = new Date(date)
        const dateString = dt.getDate() + "/" + dt.getMonth() + "/" + dt.getFullYear()
        return dateString
    }

    changeCPass = (event) => {
        this.setState({curPass: event.target.value})
    }

    changePass1 = (event) => {
        this.setState({password1: event.target.value})
    }
    
    changePass2 = (event) => {
        this.setState({password2: event.target.value})
    }
    
    changePassword = async (event) => {
        event.preventDefault()
        if (this.state.password1 !== this.state.password2) {
            alert(`Password Does not match`)
            return
        }
        const data = {
            currentPassword: this.state.curPass,
            password1: this.state.password1
        }

        await authAPIHandler.put('/changePassword', data, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    alert(`Password Changed`)
                    window.location.reload()
                } else {
                    alert(`Error: ${response.data}`)
                    window.location.reload()
                }
            })
            .catch((err) => {
                alert(err)
                window.location.reload()
            })
    }

    getProfile = async () => {
        try {
            await authAPIHandler.get('/profile', { headers: headers })
                .then((response) => {
                    if (response.status === 200) {
                        this.setState({user: response.data})
                    } else {
                        alert(`An Error Occured: ${response.data}`)
                    }
                })
                .catch((err) => {
                    alert(err)
                })
        } catch (error) {
            alert(error)
        }
    }

    async componentDidMount() {
        await this.getProfile()

    }
    render() {
        return (
            <div className="container">
                <br />
                <div className="card">
                    <div className="card-header">
                        
                    </div>
                    <div className="card-body">
                        <h5 className="card-title text-center">Profile of User ID: {this.state.user._id} </h5>
                        <br />
                        <div className="row">
                            <p className="col card-text"><b>Name: </b> <input className="col form-control-plaintext" readOnly value={this.state.user.name} /></p>
                            <p className="col card-text"><b>Email:</b> <input className="col form-control-plaintext" readOnly value={this.state.user.email} /></p>  
                        </div>
                        <p className="card-text"><b>Date of Registration: </b> <input className="col form-control-plaintext" readOnly value={this.printDate(this.state.user.date)} /></p>
                        <div className="d-grid gap-2">
                            <button className="col-2 btn btn-primary" data-bs-toggle="modal" data-bs-target="#changePasswd">Change Password</button>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="changePasswd" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="changePasswdLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-center" id="changePasswdLabel">Change Password</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.changePassword}>
                                    <div className="container">
                                        <div className="row">
                                            <label htmlFor="curPass" className="form-label">Current Password</label>
                                            <input type="password" onChange={this.changeCPass} name="curPass" placeholder="Current Password" id="curPass" className="form-control" />
                                        </div><br />
                                        <div className="row">
                                            <label htmlFor="password1" className="form-label">New Password</label>
                                            <input type="password" onChange={this.changePass1} name="password1" placeholder="New Password" id="password1" className="form-control" />
                                        </div><br />
                                        <div className="row">
                                            <label htmlFor="password2" className="form-label">Re-Enter Password</label>
                                            <input type="password" onChange={this.changePass2} name="password2" placeholder="New Password" id="password2" className="form-control" />
                                        </div><br />
                                        <div className="d-grid gap-2 row">
                                            <input type="submit" className="btn btn-primary" value="Change Password" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export { Profile }