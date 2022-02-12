import React, { useState, useRef, useEffect } from 'react'
import { Heading, Flex, Text, Input, Button, Alert } from '@chakra-ui/react'
import axios from 'axios'

const Setting = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [email, setEmail] = useState("")

    const passwordRef = useRef()
    const password2Ref = useRef()
    const emailRef = useRef()

    // useEffect to retrieve the user's information upon the first render
    useEffect(() => {
        getCurrentUser()
    }, [])

    // Function:    getCurrentUser()
    // Description: gets the user information to display to the user
    // Parameters:  N/A
    // Return:      N/A
    const getCurrentUser = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/me`)
            setEmail(response.data.email)
        }
        catch (error) {
            setError(error.response.data.error)   
        }
    }

    // Function:    updateSettingHandler()
    // Description: called upon when the user clicks the "update" button, will then
    //              send a request to update the desired changes
    // Parameters:  N/A
    // Return:      N/A
    const updateSettingHandler = async () => {
        setLoading(true)

        const updateInfo = {
            ...(passwordRef.current.value !== '') && {password: passwordRef.current.value},
            ...(passwordRef.current.value !== '') && {password2: password2Ref.current.value},
            ...(emailRef.current.value !== '') && {email: emailRef.current.value}
        }

        try {
            await axios.patch(`${process.env.REACT_APP_API_URL}/users/me`, updateInfo)
        }
        catch (error) {
            setError(error.response.data.error)
        }

        setLoading(false)
    }

    return (
        <Flex height="90vh" alignItems="center" justifyContent="center" background="whatsapp.100">
            <Flex 
                direction="column" 
                background="white" 
                p={[3, 8, 20, 17]} 
                rounded={6} 
                boxShadow="5px 5px #888888"
                minHeight="25%"
                width={["80%", "80%", "60%", "30%", "30%", "20%"]}
                fontSize={{"2xl": "2xl", "3xl": "3xl"}}
            >
                <Heading mb={3}>Settings</Heading>
                <Text>Current Email:</Text>
                <Input mb={3} value={email} fontSize={{"2xl": "2xl", "3xl": "3xl"}} readOnly/>
                <Text>New Email:</Text>
                <Input placeholder="New Email" mb={3} type="email" fontSize={{"2xl": "2xl", "3xl": "3xl"}} ref={emailRef}/>
                <Text>Current Password:</Text>
                <Input mb={3} value="password" type="password" fontSize={{"2xl": "2xl", "3xl": "3xl"}} readOnly/>
                <Text>New Password:</Text>
                <Input 
                  placeholder="New Password" 
                  mb={3} 
                  type="password" 
                  fontSize={{"2xl": "2xl", "3xl": "3xl"}} 
                  ref={passwordRef}
                />
                <Text>Confirm New Password:</Text>
                <Input 
                  placeholder="Confirm Password" 
                  mb={3} 
                  type="password" 
                  fontSize={{"2xl": "2xl", "3xl": "3xl"}} 
                  ref={password2Ref}
                />
                <Button 
                  colorScheme="teal" 
                  mb={6} 
                  onClick={updateSettingHandler} 
                  isLoading={loading} 
                  fontSize={{"2xl": "2xl", "3xl": "3xl"}}
                >
                    Update
                </Button>
                {error ? <Alert status="error">{error}</Alert> : null}
            </Flex>
        </Flex>
    )
}

export default Setting