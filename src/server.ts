import "reflect-metadata"
import express from "express"
import cors from "cors"
import { logger } from "./winstonConfig"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { createServer } from "http"
import { buildSchema } from "type-graphql"
import { ApolloServer } from "apollo-server-express"
import { AuthenticationError } from "apollo-server-errors"
import { jwtCheckMiddleware, correctUserInfo } from "./middlewares/auth"
import { SignupAndLoginResolver } from
  "./graphql/resolvers/signup_login_resolver"
import { BooksResolver } from "./graphql/resolvers/csvfilesresolvers"
import { exec } from "child_process"
import {
  ApolloServerPluginDrainHttpServer
  , ApolloServerPluginLandingPageGraphQLPlayground
  , ApolloServerPluginLandingPageDisabled
} from "apollo-server-core"
import { readFileSync } from "fs"
import path from "path"

// const options = {
//   key: readFileSync(path.resolve(__dirname, "../key.pem")),
//   cert: readFileSync(path.resolve(__dirname, "../cert.pem")),
// }


dotenv.config()
const app = express()
const httpServer = createServer(app)
const port = process.env.PORT
const origin = process.env.GOOGLE_AUTH_REDIRECT_URL

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({ origin, credentials: true }))
app.use(jwtCheckMiddleware)



app.get("/.well-known/pki-validation/72E062A554B38A5FC1327613280E89C4.txt", (req, res) => {
  const aTP = path.resolve(__dirname, "./72E062A554B38A5FC1327613280E89C4.txt")
  res.sendFile(aTP)
})

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
    resolvers: [SignupAndLoginResolver, BooksResolver],
    dateScalarMode: "isoDate",
    authMode: "error"
  })
  const server = new ApolloServer({
    schema: schema,
    context: async ({ req, res }) => {
      const isValidEmail = await correctUserInfo(req)
      if (!isValidEmail) {
        throw new
          AuthenticationError("Not a valid user/ Try again")
      }
      const user = req.user
      return { req, res, user }
    },
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
      var yourscript = exec("yarn devmigrate",
        (error, stdout, stderr) => {
          console.log(stdout)
          if (error !== null) {
            console.log(`exec error: ${error}`);
          }
        });
      logger.info(
        // eslint-disable-next-line max-len
        `server is live in production mode on https://localhost:${port}${server.graphqlPath}`
      )
    } else {
      logger.info(
        // eslint-disable-next-line max-len
        `server is live in development mode on https://localhost:${port}${server.graphqlPath}`
      )
    }
  }))
})()
