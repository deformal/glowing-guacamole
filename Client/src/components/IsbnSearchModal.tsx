import { useState, useRef, Ref } from "react"
import {
    Button,
    Input,
    FormControl,
    FormLabel,
    Flex
} from "@chakra-ui/react"
import cacheStore from "../store/cahceStore"
import ErrorMessages from "./ErrorMessages"
import { Poster } from "./fetcher"
import { useAuth0 } from "@auth0/auth0-react"
import { getMagByIsbn, getABookByIsbn } from "./query"

export default function IsbnSearchModal(props: any) {
    const { getAccessTokenSilently } = useAuth0()
    const storeInBooks = cacheStore(s => s.cacheOnlyBooks)
    const storeInMags = cacheStore(s => s.cacheOnlyMags)
    const [error, setError] = useState("")
    const inputRef: Ref<any> = useRef()


    const filterMags = async () => {
        const token = await getAccessTokenSilently()
        const res = await Poster(getMagByIsbn, token, { x: inputRef.current.value })
        storeInMags((res.data as any).getMagByIsbn)
    }

    const filterBooks = async () => {
        const token = await getAccessTokenSilently()
        const res = await Poster(getABookByIsbn, token, { x: inputRef.current.value })
        storeInBooks((res.data as any).getBookByIsbn)
    }

    return (
        <>
            <FormControl>
                <FormLabel>Search {props.pageType} by ISBN</FormLabel>
                <Flex>
                    <Input ref={inputRef as any} placeholder="Enter ISBN" mr="2" />
                    <Button colorScheme="blue" onClick={
                        props.pageType === "Mags"
                            ? filterMags
                            : filterBooks
                    } >Search</Button>
                </Flex>
            </FormControl>
            {error ? <ErrorMessages message={error} code={""} /> : ""}
        </>
    )
}
