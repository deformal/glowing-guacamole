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
    Container,
    Flex
} from "@chakra-ui/react"
import { Poster } from './fetcher'
import { showAllMyFiles } from "./query"
import { useAuth0 } from '@auth0/auth0-react'
import cacheStore from '../store/cahceStore'

type Myfiles = {
    myBooks: Array<string>,
    myMagazines: Array<string>
}

export default function MyFilesList() {
    const { getAccessTokenSilently } = useAuth0()
    const cacheData = cacheStore(s => s.cacheMyFiles)
    const isCached = cacheStore(s => s.myFilesCache)

    const fetchData = async () => {
        const token = await getAccessTokenSilently()
        const response = await Poster(showAllMyFiles, token, null)
        cacheData([(response.data as any).showMyFiles])
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (isCached.length > 0) {
        return (
            <Flex mt="100" >
                <Container>
                    <Text mt="2" fontSize="2xl" fontWeight="bold" color="GrayText" >My Books</Text>
                    <Table
                        variant="striped"
                        colorScheme="blue"
                        size="sm"
                    >
                        <TableCaption placement="top" >
                            <Badge fontSize="1em" colorScheme="orange" variant="outline" pos="absolute" top="20" right="10">
                                viewing the cached version of data
                            </Badge>
                        </TableCaption>
                        <Thead>
                            <Tr>
                                <Th textAlign="center" fontWeight="black" >Filename</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {(isCached as any)[0].myBooks.map((elms: string) => (
                                <Tr key={elms} >
                                    <Td textAlign="center">{elms}</Td>
                                </Tr>
                            ))
                            }
                        </Tbody>
                    </Table>
                </Container>
                <Container>
                    <Text mt="2" fontWeight="bold" fontSize="2xl" color="GrayText" >My Magazines</Text>
                    <Table
                        variant="striped"
                        colorScheme="blue"
                        size="sm"
                    >
                        <TableCaption placement="top" >
                            <Badge fontSize="1em" colorScheme="orange" variant="outline" pos="absolute" top="20" right="10">
                                viewing the cached version of data
                            </Badge>
                        </TableCaption>
                        <Thead>
                            <Tr>
                                <Th textAlign="center" fontWeight="black" >Filename</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {(isCached as any)[0].myMagazines.map((elms: string) => (
                                <Tr key={elms} >
                                    <Td textAlign="center">{elms}</Td>
                                </Tr>
                            ))
                            }
                        </Tbody>
                    </Table>
                </Container>
            </Flex>
        )
    }

    return (
        <Center>
            <Spinner />
        </Center>
    )

}
