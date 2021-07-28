import { Heading, VStack, Text, Divider } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineLike } from "react-icons/ai";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { loading } from './Redux/Action/userAction/Action';
export default function PostCard({ post, user, getProfile }) {
    let dispatch = useDispatch();
    return (
        <VStack border="1px" borderColor="gray.400" p={5} bg="white" alignItems="flex-start" w="25vw">
            <Heading size="xs" color="rgb(27,118,211)">@{post.user.username}</Heading>
            <Heading size="sm">{post.content}</Heading>
            <Text fontSize="12px" color="gray.500">Posted on: {new Date(post.createdAt).toLocaleString()}</Text>
            <Text display="flex" color="gray.600" alignItems="center" style={{ gap: "5px" }}>{post.likes.length} likes <AiOutlineLike /> </Text>
            <Divider />
            {post.likes.includes(user._id) ? <Text fontSize="25px" cursor="pointer" color="gray.600" bg="blue.500" alignSelf="center" borderRadius="50" p="2px" onClick={dislikePost}><AiOutlineLike /></Text> : <Text size="md" color="gray.600" cursor="pointer" fontSize="25px" alignSelf="center" border="1px" borderRadius="50" p="2px" onClick={likePost}><AiOutlineLike /></Text>}

        </VStack>
    )
    async function dislikePost() {
        dispatch(loading(true));
        try {
            let response = await axios.post(`/post/dislike/${post.slug}`, {}, {
                validateStatus: function (status) {
                    return status < 500; // Reject only if the status code is greater than or equal to 500
                }
            })
            if (response.status === 200) await getProfile();

        } catch (err) {
            console.log(err);
        }
        dispatch(loading(false))
    }

    async function likePost() {
        dispatch(loading(true));
        try {
            let response = await axios.post(`/post/like/${post.slug}`, {}, {
                validateStatus: function (status) {
                    return status < 500; // Reject only if the status code is greater than or equal to 500
                }
            })
            if (response.status === 200) await getProfile();

        } catch (err) {
            console.log(err);
        }
        dispatch(loading(false));
    }
}
