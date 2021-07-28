import { Button, Text, Flex, Heading, VStack, Avatar, toast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from './Header';
import axios from "axios";
import PostCard from './PostCard';
import { useDispatch } from 'react-redux';
import { loading } from './Redux/Action/userAction/Action';

export default function Profile() {
    let [userDetail, setUserDetail] = useState({});
    let [profile, setProfile] = useState();
    let dispatch = useDispatch();
    let { username } = useParams();
    async function getProfile() {
        dispatch(loading(true));
        try {
            console.log("gettinguser");
            let response = await axios.get(`profile/${username}`, {
                validateStatus: function (status) {
                    return status < 500; // Reject only if the status code is greater than or equal to 500
                }
            })
            if (response.data.message.user.picture) response.data.message.user.picture = response.data.message.user.picture.split("/")[1];
            console.log(response.data.message);
            setProfile(response.data.message);
            response = await axios.get("authorize", {
                validateStatus: function (status) {
                    return status < 500; // Reject only if the status code is greater than or equal to 500
                }
            })
            if (response.status === 200) setUserDetail(response.data.message);
        } catch (err) {
            console.log(err);
        }
        dispatch(loading(false));
    }
    useEffect(() => {
        getProfile();
        // eslint-disable-next-line
    }, [])
    if (profile) {
        return (
            <div>
                <Header username={userDetail.username} />
                <VStack border="1px" borderColor="gray.400" p={5} bg="white" alignItems="flex-start" w="70%" m="50px">
                    <Avatar size="lg" name={profile?.user.username} src={`http://localhost:3300/${profile?.user.picture}`} />{" "}
                    <Heading>{profile?.user.name}</Heading>
                    <Flex>
                        <Heading mt="35px" size="md" mr={3}>@{profile?.user.username}</Heading>
                        {profile?.user.username === userDetail.username ? "" : profile?.link.followers.includes(userDetail._id) ? <Button mt="35px" w="75px" h="35px" bg="red" borderRadius="3" type="submit" color="white" onClick={unfollow}>unfollow</Button> : <Button mt="35px" w="75px" h="35px" bg="rgb(27,118,211)" borderRadius="3" type="submit" color="white" onClick={follow}>follow</Button>}
                    </Flex>
                    <Flex >
                        <Text mt={3} mr="15px">{profile?.link.followers.length} Followers</Text>
                        <Text mt={3}>{profile?.link.following.length} Following</Text>
                    </Flex>
                </VStack>
                <VStack mt={5} alignItems="flex-start" m="50px">
                    <Heading>{profile?.user.username}'s posts</Heading>
                    {profile?.user.posts.length > 0 ? profile?.user.posts.map((elem) => {
                        let newProfile = { ...elem, user: { username: profile?.user.username } }
                        return <PostCard post={newProfile} user={userDetail} getProfile={getProfile} />
                    }) : <Heading size="md"> wow so empty</Heading>}
                </VStack>
            </div>
        )
    } else {
        return (
            <div style={{ height: "100vh", width: "100vw" }}></div>
        )
    }
    async function follow() {
        dispatch(loading(true));
        try {
            let response = await axios.post(`action/follow/${profile?.user.username}`, {}, {
                validateStatus: function (status) {
                    return status < 500; // Reject only if the status code is greater than or equal to 500
                }
            });
            if (response.status === 200) getProfile();
            else toast({
                title: "Account",
                description: `user not logged in`,
                status: "error",
                duration: 500,
                isClosable: true,
            })
        } catch (err) {
            console.log(err);
        }
        dispatch(loading(false));
    }
    async function unfollow() {
        dispatch(loading(true));
        try {
            let response = await axios.post(`action/unfollow/${profile?.user.username}`, {
                validateStatus: function (status) {
                    return status < 500; // Reject only if the status code is greater than or equal to 500
                }
            });
            if (response.status === 200) getProfile();
            else toast({
                title: "Account",
                description: `user not logged in`,
                status: "error",
                duration: 500,
                isClosable: true,
            })
        } catch (err) {
            console.log(err);
        }
        dispatch(loading(false));
    }
}
