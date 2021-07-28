import { Button, Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loading } from './Redux/Action/userAction/Action';
export default function Header({ username }) {
    let dispatch = useDispatch();
    let history = useHistory();
    return (
        <Flex >
            <Flex boxShadow="2xl" position="sticky" h="13vh" w="100%" p={5} align="center" bg="white" alignItems="center" justifyContent="space-between">
                <Heading color="rgb(27,118,211)" onClick={() => history.push("/")} cursor="pointer">
                    Bord
                </Heading>
                <Flex spacing={4} justify="space-evenly" w="250px">
                    <Button bg="rgb(27,118,211)" color="white" borderRadius="0" onClick={() => {
                        console.log(username);
                        if (username)
                            history.push(`/profile/${username}`);
                        else history.push("/");
                    }}>{username ? "Profile" : "login"}</Button>
                    {username && <Button color="black" border="1px" borderColor="gray.300" borderRadius="0" onClick={logout}>Log Out</Button>}
                </Flex>
            </Flex>
        </Flex>

    )
    async function logout() {
        try {
            dispatch(loading(true));
            let response = await axios.post("auth/signout", {}, {
                validateStatus: function (status) {
                    return status < 500; // Reject only if the status code is greater than or equal to 500
                }
            })
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("accessToken");
            if (response.status === 200) {
                history.push("/");
            }
        } catch (err) {
            console.log(err);
        }
        dispatch(loading(false));
    }
}
