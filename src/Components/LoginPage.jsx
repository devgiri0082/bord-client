import React, { Fragment, useState } from 'react'
import { Center, useToast, Heading, VStack, Box, Input, InputGroup, InputLeftElement, InputRightElement, Button, Text } from "@chakra-ui/react";
import { AiOutlineUser, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import axios from "axios";
export default function LoginPage() {
    let toast = useToast();
    let history = useHistory();
    let [passwordType, setPasswordType] = useState("password");
    let signingIn = async (e) => {
        e.preventDefault();
        let values = {
            username: e.target.username.value,
            password: e.target.password.value
        }
        let response = await axios.post("http://localhost:3300/auth/signin", values, {
            validateStatus: function (status) {
                return status < 500; // Reject only if the status code is greater than or equal to 500
            },
            headers: {
                "accept": "application/json",
                'Content-Type': `application/json`
            }
        })
        toast({
            title: "Account",
            description: `${response.data.message
                }`,
            status: response.status === 200 ? "success" : "error",
            duration: 1500,
            isClosable: true,
        })
        if (response.status === 200) {
            console.log(response.data);
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            setTimeout(() => history.push("/feed"), 1500)
        }
        console.log(response);
    }
    return (
        <Fragment>
            <Center h="100vh" w="100vw" >
                <form onSubmit={signingIn}>
                    <VStack spacing={6}>
                        <Heading >
                            "<span style={{ color: "rgb(27,118,211)", fontSize: "40px" }}>Bord</span>" are we?
                        </Heading>
                        <Box boxShadow="sm" border="1px" p="20px" borderColor="gray.200" pb="50px">
                            <VStack spacing={4}>
                                <Heading size="lg" alignSelf="flex-start">
                                    Login
                                </Heading>
                                <InputGroup>
                                    <Input name="username" required type="text" placeholder="Username" w="250px">
                                    </Input>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<AiOutlineUser color="gray.300" size="20px" />}
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <Input name="password" required type={passwordType} placeholder="Password">
                                    </Input>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<AiOutlineLock color="gray.300" size="20px" />}
                                    />
                                    <InputRightElement onClick={() => passwordType === "password" ? setPasswordType("text") : setPasswordType("password")}
                                        children={passwordType === "password" ? <AiOutlineEyeInvisible color="gray.300" size="15px" /> : <AiOutlineEye color="gray.300" size="15px" />}
                                        cursor="pointer"
                                    />
                                </InputGroup>
                                <Button colorScheme="blue" type="submit">Submit</Button>
                            </VStack>
                        </Box>
                        <Text onClick={() => history.push("/signup")} cursor="pointer" _hover={{ textDecoration: "underline" }} style={{ marginTop: "0px" }} color="rgb(25,145,255)">Don't have an account signup.</Text>
                    </VStack>
                </form>
            </Center>
        </Fragment >
    )
}
