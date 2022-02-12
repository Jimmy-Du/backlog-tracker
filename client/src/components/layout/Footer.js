import React from 'react'
import { Flex } from '@chakra-ui/react'

const Footer = () => {
    return (
        <Flex 
          bg="tomato" 
          w="100%" 
          color="white" 
          fontSize={["sm", "sm", "md", "xl", "xl", "2xl", "3xl"]} 
          height="5vh"
          justifyContent="center"
          alignItems="center"
        >
            Created by: Jimmy Du
        </Flex>
    )
}

export default Footer