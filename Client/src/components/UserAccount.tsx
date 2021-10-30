import {
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Flex,
    Text,
    MenuDivider
} from "@chakra-ui/react"
import { ChevronDownIcon, } from "@chakra-ui/icons"
import ErroMessages from "./ErrorMessages"
import { Spinner } from "@chakra-ui/react"
import { useAuth0 } from "@auth0/auth0-react"
import { withRouter } from "react-router"
import { useHistory, Link } from "react-router-dom"

function UserAccount() {
    const { user, error, logout, isLoading } = useAuth0()
    if (error) {
        <ErroMessages
            message={error.message}
            code={error.name} />
    }

    if (isLoading) {
        return (
            <Spinner />
        )
    }

    return (
        <Menu>
            <MenuButton
                as={Button}
                padding="7"
                outline="0"
                backgroundColor="transparent"
                rightIcon={
                    <ChevronDownIcon fontSize="2xl" />
                }
            >
                <Flex alignItems="center" w="100%" justifyContent="space-between">
                    <Avatar src={user?.picture} />
                    <Text pl="1" fontSize="2xl">
                        {user?.given_name}
                    </Text>
                </Flex>
            </MenuButton>
            <MenuList backgroundColor="Menu" >
                <MenuItem ><Link to="/newfile" >New CSV File</Link></MenuItem>
                <MenuDivider />
                <MenuItem ><Link to="/myfiles" >My Files</Link></MenuItem>
                <MenuDivider />
                <MenuItem onClick={async () => logout()} >Logout</MenuItem>
            </MenuList>
        </Menu>
    )
}

export default withRouter(UserAccount)
