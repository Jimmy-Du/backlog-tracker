import React, { useState } from 'react'
import { 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Box,
    Button,
    Image,
    Center,
    Heading,
    Radio,
    RadioGroup,
    useToast
} from "@chakra-ui/react"
import axios from 'axios'

const GameModal = (props) => {
    const [completed, setCompleted] = useState(false)
    const [loading, setLoading] = useState(false)
    const toast = useToast()

    // Function:    addHandler()
    // Description: called upon when the user clicks the "add" button and will then 
    //              attempt to add the game to the user's backlog
    // Parameters:  N/A
    // Return:      N/A
    const addHandler = async () => {
        try {
            setLoading(true)

            await axios.post(`${process.env.REACT_APP_API_URL}/backlog/`, {gameId: props.id, completed: completed})

            toast({
                title: "Game added to backlog.",
                description: `${props.name} has been added to your backlog.`,
                status: "success",
                duration: 9000,
                isClosable: true
            })
        }
        catch (error) {
            toast({
                title: "Game already in backlog.",
                description: `${props.name} has already been added to your backlog.`,
                status: "error",
                duration: 9000,
                isClosable: true
            })
        }

        setLoading(false)

        props.onClose()
    }

    // Function:    completedHandler()
    // Description: called upon when the user toggles between the radio button options,
    //              and changes the selected value for the radio toggles
    // Parameters:  N/A
    // Return:      N/A
    const completedHandler = () => {
        setCompleted(!completed)
    }

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>{props.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Center>
                    <Image src={props.image} mb={3}/>
                </Center>
                <Box 
                    borderWidth="2px" 
                    borderColor="black" 
                    padding="10px"
                    maxHeight="300px"
                    overflowY="scroll"
                >
                    <Center>
                        <Heading size="md">Description</Heading>
                    </Center>
                    {props.description}
                </Box>
                <Box
                    borderWidth="2px" 
                    borderColor="black" 
                    padding="10px"
                    mt={3}
                >
                    <Center>
                        <Heading size="md">Completed?</Heading>
                        <RadioGroup ml={3} onChange={completedHandler} value={completed}>
                            <Radio value={true}>Yes</Radio>
                            <Radio value={false} ml={3}>No</Radio>
                        </RadioGroup>
                    </Center>
                </Box>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme="red" mr={3} onClick={props.onClose}>Close</Button>
                <Button colorScheme="teal" onClick={addHandler} isLoading={loading}>Add</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default GameModal