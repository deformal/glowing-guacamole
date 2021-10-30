import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react"
import {
    Button,
    Box,
    Spinner,
    Flex,
    Heading,
    Spacer,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Text,
    Avatar,
    Tag,
    TagLabel,
    Link as Links,
    Divider
} from "@chakra-ui/react"
import { ChevronRightIcon } from "@chakra-ui/icons"
import ErrorMessages from './ErrorMessages'
import { signupQuery } from "./query"
import UserAccount from "./UserAccount";
import userStore from '../store/userStore'
import { Poster } from './fetcher'
import { useHistory, useLocation, Link } from 'react-router-dom'

export default function Auth0login() {
    const {
        loginWithPopup,
        isLoading,
        getAccessTokenSilently,
        error: authErr,
        isAuthenticated,
    } = useAuth0();
    const [errors, setErrors] = useState("")
    const storeId = userStore(s => s.changeUserId);
    const url = useLocation()

    const loginhandler = async () => {
        try {
            await loginWithPopup()
            const token = await getAccessTokenSilently()
            const response = await Poster(signupQuery, token, null)
            if (!response.data) {
                setErrors(s => response.errors[0].message)
            }
            storeId(response.data.create_a_new_account_or_login.userId)
        } catch (err) {
            console.error(err)
            setErrors(s => (err as string))
        }
    }

    if (authErr) {
        return (
            <ErrorMessages
                message={authErr.message}
                code={authErr.name} />
        )
    }

    if (isLoading) {
        return (
            <Spinner />
        )
    }

    if (errors) {
        return (
            <ErrorMessages
                message={errors}
                code={""} />
        )
    }

    return (
        <Flex m="2" >
            <Breadcrumb separator={<ChevronRightIcon fontSize="3xl" color="gray.500" />}>
                <BreadcrumbItem>
                    <Link to="/dashboard">
                        <Text
                            fontSize="3xl"
                            fontWeight="bold"
                            color="GrayText" >
                            CSV-Reader
                        </Text>
                    </Link>
                </BreadcrumbItem>
                {isAuthenticated
                    ?
                    <BreadcrumbItem >
                        <Link to={url.pathname}>
                            <Text
                                fontSize="3xl"
                                fontWeight="bold"
                                color="Highlight">
                                {url.pathname.slice(1)}
                            </Text>
                        </Link>
                    </BreadcrumbItem>
                    : ""
                }
            </Breadcrumb>
            <Spacer />
            {!isAuthenticated
                ? <Box mr="3" >
                    <Tag size="lg" padding="2" colorScheme="blackAlpha" borderRadius="full">
                        <Avatar
                            objectFit="cover"
                            src="https://avatars.githubusercontent.com/u/46109434?s=400&u=6bb626afba64e6402990b14a5d1681ea280c3d3c&v=4"
                            size="sm"
                            name="Saurabh Jainwal"
                            mr={2}
                        />
                        <TagLabel >
                            <Links href="https://github.com/deformal" >
                                Saurabh Jainwal
                            </Links>
                        </TagLabel>

                    </Tag>
                </Box>
                : ""
            }
            <Spacer />
            <Box>
                {isAuthenticated
                    ? <UserAccount />
                    : <Button
                        onClick={loginhandler}
                        colorScheme="green"
                        fontSize="2xl"
                        padding="4"
                    >

                        Login
                    </Button>
                }
            </Box>
        </Flex>
    )
}
