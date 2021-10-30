import {
    Menu,
    MenuButton,
    MenuList,
    Button,
    MenuDivider,
    Box,
    Spacer,
} from "@chakra-ui/react"
import { ChevronDownIcon } from '@chakra-ui/icons'
import EmailSearchModal from "./EmailSearchModal"
import IsbnSearchModal from './IsbnSearchModal'
import EverythingbyEmail from "./EverythingbyEmail"

export default function SearchBar(props: any) {

    return (
        <Box mt='1' >
            <Menu colorScheme="facebook" isLazy lazyBehavior="unmount" >
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme="blue" >
                    Search Options
                </MenuButton>
                <MenuList p="3" >
                    <EmailSearchModal pageType={props.pageType} />
                    <IsbnSearchModal pageType={props.pageType} />
                    <MenuDivider />
                    <Spacer />
                    <EverythingbyEmail />
                </MenuList>
            </Menu>
        </Box>
    )
}
