import React from 'react'
import { Box, Image, Text, Button, Center, useDisclosure } from '@chakra-ui/react'
import GameModal from '../modals/gameModal/GameModal'
import BacklogModal from '../modals/backlogModal/BacklogModal';

const Game = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    let gameWidth = ["40%", "40%", "30%", "15%", "10%", "10%", "10%"]

    // if the game component is being displayed for searched games, the width is of the
    // component is altered
    if (props.searched) {
      gameWidth = ["40%", "40%", "30%", "15%", "10%", "20%", "20%"]
    }

    return (
        <Button
            as={Box}
            m="10px" 
            padding="1px"
            width={gameWidth}
            height="fit-content"
            display="inline-block"
            rounded={10}
            _hover={{bg: "#DD6B20"}}
            background="#F6AD55"
            boxShadow="5px 5px #3182ce"
            onClick={onOpen}
        >
            <Center>
                <Image 
                    src={props.image} 
                    rounded={15}
                    p={["10px", "10px", "10px", "5px"]}
                    boxSize={["100%", "100%", "100%", "80%"]}
                />
            </Center>
            <Center>
                <Text
                    maxWidth="90%" 
                    fontSize={["sm", "md", "xl", "xl"]} 
                    isTruncated
                >
                    {props.name}
                </Text>
            </Center>
            {props.backlog ? 
                <BacklogModal 
                    isOpen={isOpen} 
                    onClose={onClose} 
                    image={props.image}
                    name={props.name}
                    id={props.id}
                    description={props.description}
                    completed={props.completed}
                /> :
                <GameModal 
                    isOpen={isOpen} 
                    onClose={onClose} 
                    image={props.image}
                    name={props.name}
                    id={props.id}
                    description={props.description}
                />
            }
        </Button>
    )
}

export default Game