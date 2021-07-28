import React, { Fragment, useState } from 'react'
import { Center, VStack, Heading, Box, InputGroup, Input, InputRightElement, Button, useToast } from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import FormData from "form-data"
import axios from "axios"
import { useDispatch } from 'react-redux';
import { loading } from "./Redux/Action/userAction/Action"
export default function Signup() {
    let toast = useToast();
    let history = useHistory();
    let [passwordType, setPasswordType] = useState("password");
    let dispatch = useDispatch();
    async function signingUp(e) {
        dispatch(loading(true));
        e.preventDefault();
        let data = new FormData();
        e.target.profilePic.files.length > 0 && data.append("profilePic", e.target.profilePic?.files[0], e.target.profilePic?.files[0].name);
        data.append("name", e.target.name.value);
        data.append("username", e.target.username.value);
        data.append("email", e.target.email.value);
        data.append("password", e.target.password.value);
        try {
            let response = await axios.post("http://localhost:3300/auth/signup", data, {
                validateStatus: function (status) {
                    return status < 500; // Reject only if the status code is greater than or equal to 500
                },
                headers: {
                    "accept": "application/json",
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`
                }
            })
            toast({
                title: "Account",
                description: `${response.data.message}`,
                status: response.status === 200 ? "success" : "error",
                duration: 1500,
                isClosable: true,
            })
            dispatch(loading(false));
            if (response.status === 200) {
                setTimeout(() => history.push("/"), 1500)
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <Fragment>
            <Center h="100vh" w="100vw" >
                <VStack spacing={6}>
                    <Heading>
                        Get on "<span style={{ color: "rgb(27,118,211)", fontSize: "40px" }}>Bord</span>"
                    </Heading>
                    <Box boxShadow="sm" border="1px" p="20px" borderColor="gray.200" pt="30px" pb="80px">
                        <form onSubmit={signingUp}>
                            <VStack spacing={4}>
                                <Heading size="lg" alignSelf="flex-start">
                                    Sign Up
                                </Heading>

                                <InputGroup>
                                    <Input required name="name" type="text" placeholder="Full Name" >
                                    </Input>
                                </InputGroup>
                                <InputGroup>
                                    <Input required name="username" type="text" pattern="^[a-zA-Z0-9_]{5,20}$" title="user name should be alphaNumeric character between 5 to 20 character" placeholder="Username">
                                    </Input>
                                </InputGroup>
                                <InputGroup>
                                    <Input required name="email" type="email" placeholder="Email">
                                    </Input>
                                </InputGroup>
                                <InputGroup>
                                    <Input required name="password" type={passwordType} pattern="^[a-zA-Z0-9_]{7,20}$" title="password should be alphaNumeric character between 7 to 20 character" placeholder="Password" >
                                    </Input>
                                    <InputRightElement onClick={() => passwordType === "password" ? setPasswordType("text") : setPasswordType("password")}
                                        children={passwordType === "password" ? <AiOutlineEyeInvisible color="gray.300" size="15px" /> : <AiOutlineEye color="gray.300" size="15px" />}
                                        cursor="pointer"
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <input name="profilePic" type="file" accept="image/*" />
                                </InputGroup>
                                <Button type="submit" colorScheme="blue">Submit</Button>
                            </VStack>
                        </form>
                    </Box>
                </VStack>
            </Center>
        </Fragment >
    )
}
