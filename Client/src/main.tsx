import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  from,
  HttpLink
} from "@apollo/client";
import { Auth0Provider } from "@auth0/auth0-react"
import { setContext } from '@apollo/client/link/context';

const domain = import.meta.env.VITE_DOMAIN!
const clientId = import.meta.env.VITE_CLIENT_ID!
const redirectUri = import.meta.env.VITE_REDIRECT_URI!
const apiUri = import.meta.env.VITE_GRAPHQL_SERVER!
const audienceUri = import.meta.env.VITE_AUDIENCE_URI!

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const link = from([
  authLink,
  new HttpLink({
    uri: apiUri as string,
    credentials: "include",
  })
])

const client = new ApolloClient({
  cache: new InMemoryCache(), //cache is an instance of InMemoryCache, which Apollo Client uses to cache query results after fetching them.
  link: link,
  name: "chat-rocket-ui",
  version: '0.0.5'
});


ReactDOM.render(
  <Auth0Provider
    domain={domain as string}
    clientId={clientId as string}
    redirectUri={redirectUri as string}
    audience={audienceUri as string}
    scope="openid profile email"
  >
    <ApolloProvider client={client} >
      <App />
    </ApolloProvider>
  </Auth0Provider>,
  document.getElementById('root')
)
