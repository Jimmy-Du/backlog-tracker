import React, { useState, useRef } from 'react'
import { Flex, Heading, Input, Button } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import SearchedGames from '../games/searchedGames/SearchedGames'

const Search = () => {
    const searchRef = useRef()
    const [searchResults, setSearchResults] = useState(null)
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    // Function:    searchHandler()
    // Description: called upon when the user clicks the "search" button, and displays the games
    //              matching the search term
    // Parameters:  N/A
    // Return:      N/A
    const searchHandler = async () => {
        setLoading(true)

        try {
          const response = await axios.post(`${process.env.REACT_APP_API_URL}/games/search`, { 
            search: searchRef.current.value 
          })

          setSearchResults(<SearchedGames gameData={response.data}/>)

          setLoading(false)
        }
        catch (error) {
          // if the error is an unauthorized error, they will be redirected to the login screen
          if (error.response.status === 401) {
            history.push("/login")
          }
        }
    }

    return (
        <Flex height="90vh" background="whatsapp.100" flexDirection="column" alignItems="center">
            <Heading>Search</Heading>
            <Input 
                mt="10px" 
                width={["80%", "80%", "50%", "50%", "35%", "25%"]}
                background="white" 
                placeholder="Game Title" 
                ref={searchRef}
                fontSize={{"sm": "large", "2xl": "2xl", "3xl": "3xl"}}
                p={5}
            />
            <br/>
            <Button 
                mt="10px" 
                width={["20%", "20%", "20%", "10%", "7%", "5%"]} 
                colorScheme="teal" 
                onClick={searchHandler} 
                isLoading={loading}
                fontSize={{"2xl": "2xl"}}
            >
                Search
            </Button>
            {searchResults ? <Heading>Results</Heading> : null}
            {searchResults}
        </Flex>
    )
}

export default Search