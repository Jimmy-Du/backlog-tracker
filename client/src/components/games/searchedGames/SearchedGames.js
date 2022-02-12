import React from 'react'
import { Box } from '@chakra-ui/react'
import Game from '../game/Game'

const SearchedGames = (props) => {
    return (
        <Box 
          overflowY="scroll" 
          height="65vh" 
          border='1px' 
          borderColor='black' 
          width={{"sm": "98vw", "2xl": "50vw"}}
          rounded={10}
        >
            {props.gameData.map(data => {
                return <Game
                            key={data.id}
                            id={data.id}
                            image={data.url ? data.url.replace("t_thumb", "t_cover_big") : null} 
                            name={data.name}
                            description={data.summary}
                            searched
                        />
            })}
        </Box>
    )
}

export default SearchedGames