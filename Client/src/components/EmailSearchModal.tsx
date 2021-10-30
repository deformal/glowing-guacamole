import { useAuth0 } from "@auth0/auth0-react"
import {
    Button,
    Input,
    FormControl,
    FormLabel,
    Flex
} from "@chakra-ui/react"
import { Poster } from "./fetcher"
import { getMagsByEmail, getBooksByEmail } from "./query"
import cacheStore from "../store/cahceStore"
import { useRef, Ref, useState } from "react"

export default function EmailSearchModal(props: any) {
    const { getAccessTokenSilently } = useAuth0()
    const storeInBooks = cacheStore(s => s.cacheOnlyBooks)
    const storeInMags = cacheStore(s => s.cacheOnlyMags)
    const [error, setError] = useState()

    const inputRef: Ref<any> = useRef()

    const filterMags = async () => {
        const token = await getAccessTokenSilently()
        const res = await Poster(getMagsByEmail, token, { x: inputRef.current.value })
        storeInMags((res.data as any).getMagsByEmail)
    }

    const filterBooks = async () => {
        const token = await getAccessTokenSilently()
        const res = await Poster(getBooksByEmail, token, { x: inputRef.current.value })
        storeInBooks((res.data as any).getBooksByEmail)
    }

    return (
        <FormControl>
            <FormLabel>Search {props.pageType} by Author/'s Email/'s</FormLabel>
            <Flex>
                <Input ref={inputRef} placeholder="Enter Authro Email" mr="2" />
                <Button colorScheme="blue" onClick={
                    props.pageType === "Mags"
                        ? filterMags
                        : filterBooks
                } >Search</Button>
            </Flex>
        </FormControl>
    )
}
