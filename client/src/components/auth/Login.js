import React, { useRef, useState, useEffect } from 'react'
import { Link as ReactRouterLink, useHistory } from 'react-router-dom'
import { Flex, Heading, Input, Button, Alert, Link } from '@chakra-ui/react'
import { useAuth } from '../../hooks/AuthContext'

const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const { login, loggedIn } = useAuth()
    const history = useHistory()

    useEffect(() => {
        // if the user is already logged in, the user will redirected to the dashboard
        if (loggedIn) {
            history.push("/dashboard")
        }
    })

    // Function:    loginHandler()
    // Description: called upon when the user clicks the "log in" button and will attempt to log in with
    //              the values entered in the input fields.
    // Parameters:  e: additional info about the event
    // Return:      N/A
    const loginHandler = async (e) => {
        e.preventDefault()

        setError(null)
        setLoading(true)

        try {
            await login(emailRef.current.value, passwordRef.current.value)

            setLoading(false)
            history.push("/dashboard")
        }
        // if error occurs, the error state is set to the error message to be displayed to the user
        catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }

    return (
        <Flex 
            height="90vh" 
            alignItems="center" 
            justifyContent="center" 
            background="whatsapp.100"
        >
            <Flex 
                direction="column" 
                background="white" 
                p={[3, 10, 20, 20]} 
                rounded={6} 
                boxShadow="5px 5px #888888"
                width={["70%", "70%", "90%", "60%", "30%", "20%", "15%"]}
            >
                <Heading mb={3}>Log in</Heading>
                <Input 
                  placeholder="email" 
                  mb={3} 
                  type="email" 
                  ref={emailRef} 
                  width="100%"
                  fontSize={{"sm": "large", "2xl": "2xl", "3xl": "3xl"}}
                />
                <Input 
                  placeholder="password" 
                  mb={6} 
                  type="password" 
                  ref={passwordRef}
                  fontSize={{"sm": "large", "2xl": "2xl", "3xl": "3xl"}}
                />
                <Button 
                  colorScheme="teal" 
                  mb={6} 
                  onClick={loginHandler} 
                  isLoading={loading} 
                  fontSize={{"2xl": "2xl", "3xl": "3xl"}}
                >
                    Log in
                </Button>
                {error? <Alert status="error" width="100%" alignSelf="center" justifyContent="center">{error}</Alert> : null}
                <Link 
                    color="blue" 
                    as={ReactRouterLink} 
                    to="/register"
                    fontSize={["sm", "sm", "md", "lg", "lg", "lg", "2xl"]}
                >
                    Don't have an account? Click here
                </Link>
            </Flex>
        </Flex>
    )
}

export default Login