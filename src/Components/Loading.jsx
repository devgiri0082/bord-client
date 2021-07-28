import { Box, CircularProgress } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from "react-redux";

export default function Loading(props) {
    let loadingState = useSelector(state => state.loading);
    return (
        <div>
            {loadingState && <Box pos="absolute" h="100%" w="100%" bgColor="rgba(0, 0, 0, 0.5)" zIndex={3} display="flex" justifyContent="center" alignItems="center">
                <CircularProgress isIndeterminate color="blue.300" />
            </Box>}

            {props.children}
        </div >
    )
}
