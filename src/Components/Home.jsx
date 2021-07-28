import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Divider, Flex, Heading, Textarea, useDisclosure, VStack } from '@chakra-ui/react'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import Header from './Header';
import axios from "axios";
import PersonCard from "./PersonCard";
import PostCard from './PostCard';
import { useDispatch } from 'react-redux';
import { loading } from './Redux/Action/userAction/Action';
import { useHistory } from 'react-router-dom';

export default function Home() {
    let history = useHistory();
    if (!localStorage.getItem("accessToken") && !localStorage.getItem("refreshToken")) history.push("/");
    const [userDetail, setUserDetail] = useState();
    let dataRef = useRef();
    let dispatch = useDispatch();
    const [posts, setPosts] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    async function getSuggestion() {
        dispatch(loading(true))
        try {
            let response = await axios.get("action/possibleFollow", {
                validateStatus: function (status) {
                    return status < 500; // Reject only if the status code is greater than or equal to 500
                }
            })
            setSuggestions(response.data.message);
            await getPosts();
        } catch (err) {
            console.log(err);
        }
        dispatch(loading(false))
    }
    async function getPosts() {
        dispatch(loading(true));
        try {
            let response = await axios.get("authorize", {
                validateStatus: function (status) {
                    return status < 500; // Reject only if the status code is greater than or equal to 500
                }
            })
            console.log(response.data.message);
            if (response.status === 200) setUserDetail(response.data.message);
            response = await axios.get("/post", {
                validateStatus: function (status) {
                    return status < 500; // Reject only if the status code is greater than or equal to 500
                }
            })
            setPosts(response.data.message);

        } catch (err) {
            console.log(err);
        }
        dispatch(loading(false))
    }
    useEffect(() => {
        getSuggestion();
        // eslint-disable-next-line
    }, [])
    if (userDetail) {
        return (
            <Fragment>
                <Header username={userDetail.username} />
                <Flex justifyContent="space-between" pl="150px" pr="150px">
                    <VStack mt="20px">
                        <Heading as="h2" size="lg">Posts by your friends</Heading>
                        {posts.map((elem, index) => <PostCard post={elem} user={userDetail} getProfile={getPosts} key={index} />)}
                    </VStack>
                    <VStack alignItems="flex-start" bg="rgb(238,238,238)" minH="87vh" p={5} w="300px">
                        <Heading size="md">Follow Other Users...</Heading>
                        {suggestions?.map((elem, index) => <PersonCard key={index} person={elem} getSuggestion={getSuggestion} getPosts={getPosts} />)}
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
    } else {
        return (
            <div></div>)
    }

    async function createPost(e) {
        onClose();
        dispatch(loading(true))
        if (dataRef.current.value === "") return;
        let body = {
            "content": dataRef.current.value
        }
        try {
            await axios.post("post/", body, {
                validateStatus: function (status) {
                    return status < 500; // Reject only if the status code is greater than or equal to 500
                }
            })
        } catch (err) {
            console.log(err);
        }
        dispatch(loading(false));
        await getPosts();
    }
}
