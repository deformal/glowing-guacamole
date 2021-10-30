import {
    Container,
    Box,
    Center,
    Select,
    Heading
} from "@chakra-ui/react"
import { useState } from "react"
import BooksForm from "./BooksForm"
import MagsForm from "./MagsForm"

export default function NewCSVFile() {
    const [value, setValue] = useState("")

    const changeHandler: any = async (event: Event) => {
        setValue((event.target as any).value)
    }

    return (
        <>
            {value === ""
                ? <Box>
                    <Center mt="10" >
                        <Heading
                            fontWeight="bold"
                            color="GrayText"
                        >
                            Please select a file type to start.
                        </Heading>
                    </Center>
                    <Container
                        mt="5"
                        borderRadius="20px"
                        p="2"
                        bgColor="blackAlpha.200"
                        color="GrayText"
                    >
                        <form >
                            <Box>
                                <Select
                                    value={value}
                                    onChange={changeHandler}
                                    fontWeight="bold"
                                    placeholder="Select File Type"
                                >
                                    <option value="book">Book</option>
                                    <option value="mag">Magazine</option>
                                </Select>
                            </Box>
                        </form>
                    </Container>
                </Box>
                : ""
            }
            {
                value === "book"
                    ? <BooksForm />
                    : value === "mag"
                        ? <MagsForm />
                        : ""
            }
        </>
    )
}
