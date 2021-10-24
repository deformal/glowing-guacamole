import "reflect-metadata"
import express from "express"
import expressJwt from "express-jwt"
import { logger } from "./winstonConfig"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import http from "http"
import { buildSchema } from "type-graphql"
import { SignupAndLoginResolver } from "./graphql/resolvers/signup_login_resolver"
import { ApolloServer } from "apollo-server-express"
import {
  ApolloServerPluginDrainHttpServer
  , ApolloServerPluginLandingPageGraphQLPlayground
  , ApolloServerPluginLandingPageDisabled
} from "apollo-server-core"

dotenv.config()
const app = express()
const httpServer = http.createServer(app)
const port = process.env.PORT
const origin = process.env.GOOGLE_AUTH_REDIRECT_URL

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(expressJwt({
  secret: process.env.AUTH_TOKEN_SECRET as string,
  algorithms: ["HS256"],
  credentialsRequired: false
}))

// process related exits
process.stdout.on("error", (err) => {
  logger.error(err)
  process.exit(1)
})

process.on("uncaughtException", (err) => {
  logger.error(err)
  process.exit(1)
})

process.on("SIGTERM", () => process.exit(1));

// main IEFE
(async () => {
  const schema = await buildSchema({
    resolvers: [SignupAndLoginResolver],
    dateScalarMode: "isoDate",
    authMode: "error"
  })

  const server = new ApolloServer({
    schema: schema,
    context: ({ req, res }) => ({ req, res }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground()
    ]
  })

  await server.start()
  server.applyMiddleware({ app, cors: { origin, credentials: true } })
  await new Promise(() => httpServer.listen(port, () => {
    if (process.env.NODE_ENV === "production") {
      logger.info(
        `server is live in production mode on http://localhost:${port}${server.graphqlPath}`
      )
    } else {
      logger.info(
        `server is live in development mode on http://localhost:${port}${server.graphqlPath}`
      )
    }
  }))
})()
