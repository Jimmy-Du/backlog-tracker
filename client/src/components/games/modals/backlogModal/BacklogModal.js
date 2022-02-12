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
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const BacklogModal = (props) => {
    const [completed, setCompleted] = useState(props.completed)
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const history = useHistory()

    // Function:    updateHandler()
    // Description: called upon when the user clicks the "update" button and will then send
    //              a request to update the desired backlogged game
    // Parameters:  N/A
    // Return:      N/A
    const updateHandler = async () => {
        setLoading(true)

        try {
            await axios.patch(`${process.env.REACT_APP_API_URL}/backlog/${props.id}`, {completed: completed})

            toast({
                title: "Backlogged game changed saved.",
                description: `Changes for ${props.name} have been saved.`,
                status: "success",
                duration: 9000,
                isClosable: true
            })
        }
        catch (error) {
            toast({
                title: "Something went wrong.",
                description: `Changes for ${props.name} were unable to be saved.`,
                status: "error",
                duration: 9000,
                isClosable: true
            })
        }

        setLoading(false)
        history.go(0)
        props.onClose()
    }

    // Function:    deleteHandler()
    // Description: called upon when the user clicks the "delete" button and will then send
    //              a request to delete the desired backlogged game
    // Parameters:  N/A
    // Return:      N/A
    const deleteHandler = async () => {
        setLoading(true)

        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/backlog/${props.id}`)

            toast({
                title: "Backlogged game has been deleted.",
                description: `Deleted ${props.name} from backlog.`,
                status: "success",
                duration: 9000,
                isClosable: true
            })
        }
        catch (error) {
            toast({
                title: "Something went wrong.",
                description: `Unable to delete ${props.name} from backlog.`,
                status: "error",
                duration: 9000,
                isClosable: true
            })
        }

        setLoading(false)
        history.go(0)
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
                <Button colorScheme="red" mr={3} onClick={deleteHandler}>Delete</Button>
                <Button colorScheme="teal" onClick={updateHandler} isLoading={loading}>Update</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default BacklogModal