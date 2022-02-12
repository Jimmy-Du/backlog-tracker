import React, { useState, createContext, useContext } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    // Function:    checkForLogin()
    // Description: checks localstorage for a valid login token
    // Parameters:  N/A
    // Return:      N/A
    const isUserLoggedIn = () => {
        let alreadyLoggedIn = true

        // if a login token is present in local storage, the expiration time will be checked
        if (localStorage.token) {
            // decode token to access user info
            const decoded = jwt_decode(localStorage.token)

            // check for expired token
            const currentTime = Date.now() / 1000

            // if the token has expired, the user will be set to logged out
            if (decoded.exp < currentTime) {
                alreadyLoggedIn = false
            }
            else {
                setAuthToken(localStorage.token)
            }
        }
        // if no login token is present, the user is set to be logged out
        else {
            alreadyLoggedIn = false
        }

        return alreadyLoggedIn
    }

    // Function:    register()
    // Description: attempts to register a new user
    // Parameters:  email: the email used for the new user
    //              password: the password for the new user
    //              password2: used to confirm that the user has correctly typed their password
    // Return:      N/A
    const register = async (email, password, password2) => {
        const registerInfo = {
            email: email,
            password: password,
            password2: password2
        }

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, registerInfo)
        }
        catch (error) {
            throw new Error(error.response.data.error)
        }
    }

    // Function:    login()
    // Description: attempts to log in the user using their email and password
    // Parameters:  email: the email used to log in
    //              password: the password used to log in
    // Return:      N/A
    const login = async (email, password) => {
        const loginInfo = {
            email: email,
            password: password
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, loginInfo)

            // adds auth token into localstorage and sets the header with the token
            localStorage.setItem('token', response.data.token)
            setAuthToken(response.data.token)

            setLoggedIn(true)
        }
        // if error occurs, the error state is set to the error message to be displayed to the user
        catch (error) {
            throw new Error(error.response.data.error)
        }
    }

    // Function:    logout()
    // Description: removes the login token for the user and sets the user to logged out
    // Parameters:  N/A
    // Return:      N/A
    const logout = () => {
        if (localStorage.token) {
            localStorage.removeItem("token")
        }

        setLoggedIn(false)
    }

    const [loggedIn, setLoggedIn] = useState(isUserLoggedIn())

    const value = {
        login,
        logout,
        register,
        loggedIn
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}