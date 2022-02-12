import React, { useEffect, useState } from 'react'
import { Box, Heading } from '@chakra-ui/react'
import axios from 'axios'
import Game from '../games/game/Game'

const Dashboard = () => {
    const [backlog, setBacklog] = useState([])

    // Function:    getBacklog()
    // Description: retrieves the user's backlog information
    // Parameters:  N/A
    // Return:      N/A
    const getBacklog = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/backlog`)

            setBacklog(response.data)
        }
        catch (error) {
            console.log(error.response.data.error)
        }
    }

    // useEffect everytime the component is rendered to get the user's backlog information
    useEffect(() => {
        getBacklog()
    }, [])

    return (
        <Box background="whatsapp.100" minHeight="90vh">
            <Heading mb={5} fontWeight="semibold" textDecoration="underline">In Progress</Heading>
            <Box overflowY="hidden" height="fit-content">
                {backlog.map(data => (
                    !data.completed ? 
                    <Game
                        key={data.game.gameId}
                        id={data._id}
                        image={`https://images.igdb.com/igdb/image/upload/t_cover_big/${data.game.image}.png`} 
                        name={data.game.name}
                        description={data.game.summary}
                        backlog
                        completed={false}
                    /> :
                    null
                ))}
            </Box>
            <Heading mt={5} mb={5} fontWeight="semibold" textDecoration="underline">Completed</Heading>
            <Box overflowY="hidden" height="fit-content">
                {backlog.map(data => (
                    data.completed ? 
                    <Game
                        key={data.game.gameId}
                        id={data._id}
                        image={`https://images.igdb.com/igdb/image/upload/t_cover_big/${data.game.image}.png`} 
                        name={data.game.name}
                        description={data.game.summary}
                        backlog
                        completed
                    /> :
                    null
                ))}
            </Box>
        </Box>
    )
}

export default Dashboard