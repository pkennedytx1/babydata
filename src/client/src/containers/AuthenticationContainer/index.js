import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { setCurrentUser, logoutUser } from "../../actions/authActions"
import { Provider } from 'react-redux' 
import jwt_decode from "jwt-decode"
import setAuthToken from "../../utils/setAuthToken"
import store from "../../store"
import Page1 from '../../components/Page1'
import Page2 from '../../components/Page2'

// Imported Components
import Login from '../../components/Login'
import Signup from '../../components/Signup'
import PrivateRoute from '../../components/PrivateRoute'
import Home from '../../components/Home'

// Checking for jt token with some security checks.
if (localStorage.jwtToken) {
    const token = localStorage.jwtToken
    setAuthToken(token)
    const decoded = jwt_decode(token)
    store.dispatch(setCurrentUser(decoded))
    const currentTime = Date.now() / 1000

    if (decoded.exp < currentTime) {
      store.dispatch(logoutUser())
      window.location.href = "./login"
    }
}

export default function AuthenticationContainer() {
    return(
        <Provider store={store}>
            <Router>
                <Route exact path='/login' component={Login} />
                <Route exact path='/signup' component={Signup} />
                <Switch>
                    <PrivateRoute exact path='/home' component={Home} />
                    <PrivateRoute exact path='/page1' component={Page1} />
                    <PrivateRoute exact path='/page2' component={Page2} />
                </Switch>
            </Router>
        </Provider>
    )
}
