import { useAuth0 } from "@auth0/auth0-react"
import {
    Button,
    Input,
    FormControl,
    FormLabel,
    Flex
} from "@chakra-ui/react"
import { Poster } from "./fetcher"
import { getAllByEmail } from "./query"
import cacheStore from "../store/cahceStore"
import { useRef, Ref, useState } from "react"

export default function EverythingbyEmail(props: any) {
    const { getAccessTokenSilently } = useAuth0()
    const storeInBooks = cacheStore(s => s.cacheOnlyBooks)
    const storeInMags = cacheStore(s => s.cacheOnlyMags)
    const [error, setError] = useState()

    const inputRef: Ref<any> = useRef()

    const getAll = async () => {
        const token = await getAccessTokenSilently()
        const res = await Poster(getAllByEmail, token, { x: inputRef.current.value })
        storeInMags((res.data as any).getAllByAuthorEmail)
        storeInBooks((res.data as any).getAllByAuthorEmail)
    }

    return (
        <FormControl>
            <FormLabel>Search books and magazines by author's email</FormLabel>
            <Flex>
                <Input ref={inputRef} placeholder="Enter Author Email" mr="2" />
                <Button colorScheme="blue" onClick={getAll} >Search</Button>
            </Flex>
        </FormControl>
    )
}
