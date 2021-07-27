import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import axios from "axios";
import { useHistory } from 'react-router-dom';
export default function Header() {
    let history = useHistory();
    return (
        <Flex >
            <Flex boxShadow="2xl" position="sticky" h="13vh" w="100%" p={5} align="center" bg="white" alignItems="center" justifyContent="space-between">
                <Heading color="rgb(27,118,211)">
                    Bord
                </Heading>
                <Flex spacing={4} justify="space-evenly" w="250px">
                    <Button bg="rgb(27,118,211)" borderRadius="0" type="submit">Profile</Button>
                    <Button color="black" border="1px" borderColor="gray.300" borderRadius="0" type="submit" onClick={logout}>Log Out</Button>
                </Flex>
            </Flex>
        </Flex>

    )
    async function logout() {
        try {
            let response = await axios.post("auth/signout", {}, {
                validateStatus: function (status) {
                    return status < 500; // Reject only if the status code is greater than or equal to 500
                }
            })
            console.log(response);
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("accessToken");
            if (response.status === 200) {
                history.push("/");
            }
        } catch (err) {
            console.log(err);
        }

    }
}
