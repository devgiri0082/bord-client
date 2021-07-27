import { AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, Button } from '@chakra-ui/react'
import React from 'react'

export default function AlertBox() {
    return (
        <AlertDialogContent>
            <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
                Are you sure you want to discard all of your notes? 44 words will be
                deleted.
            </AlertDialogBody>
            <AlertDialogFooter>
                <Button>
                    No
                </Button>
                <Button colorScheme="red" ml={3}>
                    Yes
                </Button>
            </AlertDialogFooter>
        </AlertDialogContent>
    )
}
