import React from 'react'
import { Route, Redirect} from 'react-router-dom'
import { useAuth } from '../../hooks/AuthContext'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { loggedIn } = useAuth()

    return (
        <Route 
            {...rest}
            render={props => {
                return loggedIn ? <Component {...props}/> : <Redirect to="login"/>
            }}></Route>
    )
}

export default PrivateRoute