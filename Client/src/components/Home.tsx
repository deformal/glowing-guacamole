import { Heading, Container, Text, Center, Box, Stack } from "@chakra-ui/react"
export default function Home() {
    function Feature({ title, desc, ...rest }: any) {
        return (
            <Box p={5} shadow="md" borderWidth="1px" {...rest}>
                <Heading fontSize="xl">{title}</Heading>
                <Text mt={4}>{desc}</Text>
            </Box>
        )
    }
    return (
        <>
            <Center
                color="teal"
                fontWeight="black"
                fontSize="5xl"
            >
                CSVReader Project
            </Center>
            <Container mt="5" maxW="xl" mb="20" >
                <Stack spacing={8}>
                    <Feature
                        title="About the project."
                        desc="This is a end result of the task 
                        given to me, which was to build a system which reads form csv files namely authors.csv, books.csv and magazines.csv
                        and perform certain task's on them. This application does all the tasks which were mentioned in the NodeJs task document.
                        Please refer to the documet given to me to clear any doubts. 
                        "
                    />
                    <Feature
                        title="1)  Authentication"
                        desc="The application uses Auth0 for user authentication. You have to login with Google account in order to use the application"
                    />
                    <Feature
                        title="2) Graphql based api"
                        desc="The application uses GraphQL for data communication instead of Rest api's therefore can easily scale and can be integrated with any db easily."
                    />
                    <Feature
                        title="3) Hosting"
                        desc="The api server is hosted on Heroku containers and the frontend is hosted on Heroku"
                    />
                    <Feature
                        title="4) Future upgrades"
                        desc="Synchronization with Google sheets and Google Drive, Allowing Download of the CSV files, and many more."
                    />
                </Stack>
            </Container>
        </>
    )
}
