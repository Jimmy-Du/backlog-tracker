import React, { useEffect } from 'react'
import { Flex, Button, ButtonGroup, Heading, Text, Link } from '@chakra-ui/react'
import { Link as ReactRouterLink, useHistory } from 'react-router-dom'
import { useAuth } from '../../hooks/AuthContext'

const Landing = () => {
    const { loggedIn } = useAuth()
    const history = useHistory()

    useEffect(() => {
        // if the user is already logged in, the user will redirected to the dashboard
        if (loggedIn) {
            history.push("/dashboard")
        }
    })

    return (
        <Flex 
            height="90vh"
            alignItems="center" 
            justifyContent="center" 
            background="whatsapp.100"
        >
            <Flex
                direction="column" 
                height="fit-content" 
                p={5}
                background="white" 
                justifyContent="center" 
                rounded={10}
                boxShadow="5px 5px #888888"
                border="10px" 
                borderColor="black"
                width={["80%", "80%", "75%", "75%", "75%", "50%", "40%"]}
            >
                <Heading 
                  mt={5} 
                  mb={5} 
                  fontSize={["lg", "lg", "2xl", "2xl", "2xl", "4xl", "5xl"]}
                >
                  Welcome to BacklogTracker
                </Heading>
                <Text 
                    m={3} 
                    fontSize={["sm", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"]}
                >
                    BacklogTracker is a website that allows you to track the games that you've been meaning to play.
                    <br/>
                    Utilizing the IGDB API, BacklogTracker gives you access to a wide selection of games to track.
                    <br/>
                    Never have to recall what games you have or haven't compeleted and jump from game to game after completion.
                </Text>
                <Text
                    m={2} 
                    fontSize={["sm", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"]}
                >
                    To begin log in or register for an account:
                </Text>
                <ButtonGroup spacing={6} alignSelf="center" size="md">
                    <Link as={ReactRouterLink} to="/login">
                        <Button colorScheme="teal" fontSize={{"2xl": "2xl", "3xl": "3xl"}}>
                            Log in
                        </Button>
                    </Link>
                    <Link as={ReactRouterLink} to="/register">
                        <Button colorScheme="teal" fontSize={{"2xl": "2xl", "3xl": "3xl"}}>
                            Register
                        </Button>
                    </Link>
                </ButtonGroup>
            </Flex>
        </Flex>
    )
}

export default Landing