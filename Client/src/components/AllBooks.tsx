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
    Badge,
    Box
} from "@chakra-ui/react"
import { Poster } from './fetcher'
import { getOnlyBooks } from "./query"
import { useAuth0 } from '@auth0/auth0-react'
import ErrorMessages from './ErrorMessages'
import cacheStore from "../store/cahceStore"
import SearchBar from "./SearchBar"

type Books = {
    title: string,
    isbn: string,
    authors: string,
    description: string
}

export default function AllBooks() {
    const { getAccessTokenSilently } = useAuth0()
    const cacheData = cacheStore(s => s.cacheOnlyBooks)
    const isCached = cacheStore(s => s.onlyBooksCache)

    const fetchData = async () => {
        const token = await getAccessTokenSilently()
        const response = await Poster(getOnlyBooks, token, null)
        cacheData((response.data as any).getBooks)
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (isCached.length > 0) {
        return (
            <>
                <Text mt="2" fontWeight="bold" color="GrayText" >Search Options</Text>
                <SearchBar pageType={"Books"} />
                <Table
                    variant="striped"
                    colorScheme="telegram"
                    size="lg"
                >
                    <TableCaption placement="top" >
                        <Badge fontSize="1em" colorScheme="orange" variant="outline" pos="absolute" top="20" right="10">
                            viewing the cached version of data
                        </Badge>
                    </TableCaption>
                    <Thead>
                        <Tr>
                            <Th textAlign="center" fontWeight="black" >Title</Th>
                            <Th textAlign="center" fontWeight="black" >Authors</Th>
                            <Th textAlign="center" fontWeight="black" >ISBN</Th>
                            <Th textAlign="center" fontWeight="black" >Description</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {isCached.map((elms: Books) => (
                            <Tr key={elms.isbn} >
                                <Td textAlign="center">{elms.title}</Td>
                                <Td textAlign="center" isTruncated >{elms.authors.split(",").map(e => (
                                    <Text key={e} >{e}</Text>
                                ))}
                                </Td>
                                <Td textAlign="center" isTruncated>{elms.isbn}</Td>
                                <Td >{elms.description}</Td>
                            </Tr>
                        ))
                        }
                    </Tbody>
                </Table>
            </>
        )
    }

    return (
        <Center>
            <Spinner />
        </Center>
    )

}
