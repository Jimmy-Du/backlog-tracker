import React from 'react'
import { Flex, Link, UnorderedList, ListItem } from '@chakra-ui/react'
import { Link as ReactRouterLink, useHistory } from 'react-router-dom'
import { useAuth } from '../../hooks/AuthContext'

const Navbar = () => {
    const { loggedIn, logout } = useAuth()
    const history = useHistory()

    // Function:    logoutHandler()
    // Description: logout the current user and return them to the login screen
    // Parameters:  e: additional info about the event
    // Return:      N/A
    const logoutHandler = (e) => {
        e.preventDefault()

        logout()
        history.push("/login")
    }

    const authLinks = (
        <UnorderedList width="100vw" height="fit-content">
            <ListItem><Link as={ReactRouterLink} to="/dashboard">Home</Link></ListItem>
            <ListItem><Link as={ReactRouterLink} to="/search">Search</Link></ListItem>
            <ListItem><Link as={ReactRouterLink} to="/settings">Settings</Link></ListItem>
            <ListItem><Link href="#" onClick={logoutHandler}>Logout</Link></ListItem>
        </UnorderedList>
    )

    const guestLinks = (
        <UnorderedList width="100vw" height="fit-content">
            <ListItem><Link as={ReactRouterLink} to="/">Home</Link></ListItem>
            <ListItem><Link as={ReactRouterLink} to="/register">Register</Link></ListItem>
            <ListItem><Link as={ReactRouterLink} to="/login">Login</Link></ListItem>
        </UnorderedList>
    )

    return (
        <Flex 
          id="navbar" 
          fontSize={["sm", "sm", "md", "xl", "xl", "2xl", "3xl"]} 
          height="5vh" 
          justifyContent="center" 
          alignItems="center"
        >
            {loggedIn ? authLinks : guestLinks}
        </Flex>
    )
}

export default Navbar