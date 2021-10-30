import React, { useEffect, useState } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    Text,
    Spinner,
    Center,
    Badge
} from "@chakra-ui/react"
import { Poster } from './fetcher'
import { getEverything } from "./query"
import { useAuth0 } from '@auth0/auth0-react'
import ErrorMessages from './ErrorMessages'
import cacheStore from "../store/cahceStore"
import { Axios } from 'axios'

type BooksAndMags = {
    title: string,
    isbn: string,
    authors: string,
    description_or_publishedAt: string
}

export default function AllBooksAndMags() {
    const { getAccessTokenSilently } = useAuth0()
    const cacheData = cacheStore(s => s.cacheBooksAndMags)
    const isCached = cacheStore(s => s.booksAndMags)
    const [errors, setErrors] = useState("")

    const fetchData = async () => {
        const token = await getAccessTokenSilently()
        const response = await Poster(getEverything, token, null)
        cacheData((response.data as any).getAllBooksAndMags)
    }
    useEffect(() => {
        fetchData()
    }, [])

    if (errors) {
        return (
            <ErrorMessages
                message={errors}
                code={""} />
        )
    }
    if (isCached.length > 0) {
        return (
            <Table
                variant="striped"
                colorScheme="telegram"
                size="lg"
            >
                <TableCaption placement="top">
                    <Badge fontSize="1em" colorScheme="orange" variant="outline" pos="absolute" top="20" right="10">
                        viewing the cached version of data
                    </Badge>

                </TableCaption>
                <Thead>
                    <Tr>
                        <Th textAlign="center" fontWeight="black" >Title</Th>
                        <Th textAlign="center" fontWeight="black" >Authors</Th>
                        <Th textAlign="center" fontWeight="black" >ISBN</Th>
                        <Th textAlign="center" fontWeight="black" >Description / Published-At</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {isCached.map((elms: BooksAndMags) => (
                        <Tr key={elms.isbn} >
                            <Td textAlign="center">{elms.title}</Td>
                            <Td textAlign="center" isTruncated >{elms.authors.split(",").map(e => (
                                <Text key={e} >{e}</Text>
                            ))}
                            </Td>
                            <Td textAlign="center" isTruncated>{elms.isbn}</Td>
                            <Td >{elms.description_or_publishedAt}</Td>
                        </Tr>
                    ))
                    }
                </Tbody>
            </Table>
        )
    }

    return (
        <Center>
            <Spinner />
        </Center>
    )

}
