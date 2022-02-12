import React, { useRef, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Flex, Heading, Input, Button, Alert } from '@chakra-ui/react'
import { useAuth } from '../../hooks/AuthContext'

const Register = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const password2Ref = useRef()

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const history = useHistory()
    const { register, loggedIn } = useAuth()

    useEffect(() => {
        // if the user is already logged in, the user will redirected to the dashboard
        if (loggedIn) {
            history.push("/dashboard")
        }
    })

    // Function:    registerHandler()
    // Description: called upon when the user clicks the "register" button and will
    //              attempt to register a new account with the info the user entered
    // Parameters:  N/A
    // Return:      N/A
    const registerHandler = async () => {
        try {
            setLoading(true)
            await register(emailRef.current.value, passwordRef.current.value, password2Ref.current.value)
            setLoading(false)
          
            history.push("/login")
        }
        catch (error) {
            setLoading(false)
            setError(error.message)
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
                <Heading mb={3}>Register</Heading>
                <Input 
                  placeholder="email" 
                  mb={3} 
                  type="email" 
                  ref={emailRef}
                  fontSize={{"sm": "large", "2xl": "2xl", "3xl": "3xl"}}
                />
                <Input 
                  placeholder="password" 
                  mb={3} 
                  type="password" 
                  ref={passwordRef} 
                  fontSize={{"sm": "large", "2xl": "2xl", "3xl": "3xl"}}
                />
                <Input 
                  placeholder="confirm password" 
                  mb={6} 
                  type="password" 
                  ref={password2Ref} 
                  fontSize={{"sm": "large", "2xl": "2xl", "3xl": "3xl"}}
                />
                <Button 
                  colorScheme="teal" 
                  mb={6} 
                  onClick={registerHandler} 
                  isLoading={loading}
                  fontSize={{"2xl": "2xl", "3xl": "3xl"}}
                >
                  Register
                </Button>
                {error ? <Alert status="error" width="100%" alignSelf="center" justifyContent="center">{error}</Alert> : null}
            </Flex>
        </Flex>
    )
}

export default Register