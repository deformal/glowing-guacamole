import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton
} from "@chakra-ui/react"
import { ReactChild, ReactFragment, ReactPortal } from "react";
export default function ErrorMessages(props: { message: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined, code: string }) {

    return (
        <Alert position="absolute" right="0" top="10" width="-moz-max-content" status="error">
            <CloseButton position="absolute" right="8px" top="8px" />
            <AlertIcon />
            <AlertTitle mr={2}>{props.code}!</AlertTitle>
            <AlertDescription mr={10} >{props.message}.</AlertDescription>
        </Alert>
    )
}
