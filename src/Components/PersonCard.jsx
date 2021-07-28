import { VStack, Heading, Text, Divider, Button } from "@chakra-ui/react";
import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loading } from "./Redux/Action/userAction/Action";

export default function PersonCard({ person, getSuggestion, getPosts }) {
  let dispatch = useDispatch();
  return (
    <VStack border="1px" borderColor="gray.400" p={5} bg="white" alignItems="flex-start" w="100%">
      <Heading size="md" color="rgb(27,118,211)">@{person.username}</Heading>
      <Text color="gray.500">{person.followers} Followers</Text>
      <Divider />
      <Button alignSelf="center" h="35px" bg="white" border="1px" borderColor="gray.400" borderRadius="0" onClick={follow}>Follow</Button>
    </VStack>
  );
  async function follow() {
    dispatch(loading(true));
    try {

      let response = await axios.post(`action/follow/${person.username}`, {}, {
        validateStatus: function (status) {
          return status < 500; // Reject only if the status code is greater than or equal to 500
        }
      });
      if (response.status === 200) {
        await getSuggestion();
        await getPosts();
      }
    } catch (err) {
      console.log(err);
    }
    dispatch(loading(false));
  }
}
