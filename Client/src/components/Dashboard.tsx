import { withRouter } from "react-router-dom";
import {
    Grid,
    Box,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Button,
    Text
} from "@chakra-ui/react"
import AllBooksAndMags from "./AllBooksAndMags"
import AllBooks from "./AllBooks";
import AllMags from "./AllMags";
import { ChevronDownIcon, } from "@chakra-ui/icons"
import { useState } from "react";

function Dashboard() {
    const [comp, setComp] = useState("Books + Magazines")
    return (
        <Grid>
            <Box ml="4" mt="4" >
                <Text fontWeight="bold" color="GrayText" ml="1" mb="1" >Category</Text>
                <Menu colorScheme="twitter" isLazy lazyBehavior="unmount" >
                    {({ isOpen }) => (
                        <>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme="blackAlpha">
                                {comp}
                            </MenuButton>
                            <MenuList backgroundColor="Menu" >
                                <MenuItem onClick={
                                    async () => { setComp("Books + Magazines") }}>
                                    Books + Magazines
                                </MenuItem>
                                <MenuDivider />
                                <MenuItem onClick={
                                    async () => { setComp("Books") }
                                }>
                                    Books
                                </MenuItem>
                                <MenuItem onClick={
                                    async () => { setComp("Magazines") }
                                }>
                                    Magazines
                                </MenuItem>
                            </MenuList>
                        </>
                    )}
                </Menu>
            </Box>
            <Box mr="4" ml="4">
                {
                    comp === "Books + Magazines"
                        ? <AllBooksAndMags />
                        : comp === "Books"
                            ? <AllBooks />
                            : <AllMags />
                }
            </Box>
        </Grid>
    )
}
export default withRouter(Dashboard);
