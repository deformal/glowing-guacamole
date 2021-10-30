import {
    FormLabel,
    Input,
    Container,
    Box,
    FormControl,
    Button,
    Center,
    Badge,
    Heading,
} from "@chakra-ui/react"
import { ChangeEvent, useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { Poster } from "./fetcher"
import { addNewMag } from "./query"
import { CheckCircleIcon } from "@chakra-ui/icons"

type NewMag = {
    a?: string,
    b?: string,
    c?: string,
    d?: string,
}

export default function BooksForm() {
    const { getAccessTokenSilently } = useAuth0()
    const [inputValues, setInputValues] = useState({
        filename: "",
        title: "",
        authors: "",
        publishedAt: ""
    })
    const [success, toggleSuccess] = useState(false)

    const changeHandler2 = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValues({
            ...inputValues,
            [event.target.name]: event.target.value
        })
    }

    const submitMag = async () => {
        const token = await getAccessTokenSilently()
        const magObj: NewMag = {
            a: inputValues.filename,
            b: inputValues.title,
            c: inputValues.authors,
            d: inputValues.publishedAt
        }
        const response = await Poster(addNewMag, token, magObj)
        console.log(response)
        if (!(response.data as any).addNewMag.status) {
            toggleSuccess(false)
        }
        toggleSuccess(true)
    }

    if (success) {
        return (
            <Center mt="100" >
                <CheckCircleIcon fontSize="9xl" color="green" />
                <Badge
                    ml="3"
                    fontSize="4xl"
                    borderRadius="10"
                    variant="solid"
                    colorScheme="green"
                >
                    Success
                </Badge>
            </Center>
        )
    }

    return (
        <Container
            mt="4"
            borderRadius="20px"
            p="10"
            bgColor="blackAlpha.200"
            color="GrayText"
        >
            <Heading
                mt="50"
                fontWeight="bold"
                color="GrayText"
                textAlign="center"
            >
                Fill the following details and press done then generate file
            </Heading>
            <FormControl>
                <Box>
                    <FormLabel>
                        Filename
                    </FormLabel>
                    <Input
                        type="text"
                        onChange={changeHandler2}
                        value={inputValues.filename}
                        name="filename"
                        borderColor="blackAlpha.500"
                        placeholder="Filename"
                    />
                </Box>
                <Box>
                    <FormLabel>
                        Magazine Title
                    </FormLabel>
                    <Input
                        type="text"
                        onChange={changeHandler2}
                        value={inputValues.title}
                        name="title"
                        borderColor="blackAlpha.500"
                        placeholder="Enter magazine title"
                    />
                </Box>
                <Box>
                    <FormLabel>
                        Authors Email
                    </FormLabel>
                    <Input
                        type="text"
                        onChange={changeHandler2}
                        value={inputValues.authors}
                        name="authors"
                        borderColor="blackAlpha.500"
                        placeholder="Enter Authors eamil"
                    />
                </Box>
                <Box>
                    <FormLabel>
                        PublishedAt
                    </FormLabel>
                    <Input
                        type="text"
                        onChange={changeHandler2}
                        value={inputValues.publishedAt}
                        name="publishedAt"
                        borderColor="blackAlpha.500"
                        placeholder="Enter publication date"
                    />
                </Box>
            </FormControl>
            <Center mt="4" >
                <Button
                    size="lg"
                    colorScheme="whatsapp"
                    disabled={inputValues.filename === "" ? true : false}
                    onClick={submitMag}
                > Generate File</Button>
            </Center>
        </Container>
    )
}
