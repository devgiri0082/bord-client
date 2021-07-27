import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Divider, Flex, Heading, Text, Textarea, useDisclosure, VStack } from '@chakra-ui/react'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import Header from './Header';
import axios from "axios";
import PersonCard from "./PersonCard";

export default function Home() {
    let dataRef = useRef();
    const [suggestions, setSuggestions] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    async function getSuggestion() {
        try {
            let response = await axios.get("action/possibleFollow", {
                validateStatus: function (status) {
                    return status < 500; // Reject only if the status code is greater than or equal to 500
                }
            })
            console.log(response.data.message);
            console.log(response.data.message, "useEffect");
            setSuggestions(response.data.message);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getSuggestion()
    }, [])
    return (
        <Fragment>
            <Header />
            <Flex justifyContent="space-between" pl="150px" pr="150px">
                <VStack mt="20px">
                    <Heading as="h2" size="lg">Posts by your friends</Heading>
                    <Heading size="md">No post follow more people</Heading>
                </VStack>
                <VStack alignItems="flex-start" bg="rgb(238,238,238)" minH="87vh" p={5} w="300px">
                    <Heading size="md">Follow Other Users...</Heading>
                    {suggestions.map((elem) => <PersonCard person={elem} getSuggestion={getSuggestion} />)}
                </VStack>
            </Flex>
            <Button pb="5px" bg="rgb(27,118,211)" borderRadius="50" pos="fixed" bottom="6%" h="40px" w="40px" right="6%" fontSize="4xl" onClick={onOpen} color="white">&#x2b;</Button>
            <AlertDialog
                motionPreset="slideInBottom"
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>Add new Post</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <Divider />
                    <AlertDialogBody>
                        <Textarea h="150px" ref={dataRef} />
                    </AlertDialogBody>
                    <Divider />
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="blue" ml={3} onClick={createPost}>
                            Post
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Fragment>
    )
    async function createPost(e) {
        if (dataRef.current.value === "") return;
        let body = {
            "content": dataRef.current.value
        }
        try {
            let response = await axios.post("post/", body, {
                validateStatus: function (status) {
                    return status < 500; // Reject only if the status code is greater than or equal to 500
                }
            })
            console.log(response.data);
            onClose();
        } catch (err) {
            console.log(err);
        }


    }
}
