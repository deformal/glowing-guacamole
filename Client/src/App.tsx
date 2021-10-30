import Dashboard from "./components/Dashboard";
import { Switch, BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import { ChakraProvider, Spinner, Center } from "@chakra-ui/react"
import Navbar from "./components/Navbar"
import { useAuth0 } from "@auth0/auth0-react"
import Home from "./components/Home"
import NewCSVFile from "./components/NewCSVFile"
import MyFilesList from "./components/MyFilesList";

function App() {
  const { isAuthenticated, isLoading } = useAuth0()
  if (isLoading) {
    return (
      <ChakraProvider>
        <Center>
          <Spinner />
        </Center>
      </ChakraProvider>
    )
  }
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        {isAuthenticated
          ? <Redirect to="/dashboard" />
          : <Redirect to="/" />
        }
        <Switch>
          <Route exact path="/" >
            <Home />
          </Route>
          <Route exact path="/dashboard" >
            <Dashboard />
          </Route>
          <Route exact path="/newfile" >
            {
              isAuthenticated
                ? <NewCSVFile />
                : <Home />
            }
          </Route>
          <Route exact path="/myfiles" >
            {
              isAuthenticated
                ? <MyFilesList />
                : <Home />
            }
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  )
}

export default App
