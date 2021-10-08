import dotenv from "dotenv";
import express from "express";
import { currentIpAddress } from "./getCurrentIp";

dotenv.config();

const port = process.env.PORT;
const app = express();


app.get("/", (req, res) => {
  res.send(`<h1>Hello from the server</h1>`)
})

app.listen(port, () =>
  console.log(`server is live on http://localhost:${port}/
or http://${currentIpAddress}:${port}/
`));

process.stdout.on('error', function (err) {
  if (err.code == "EPIPE") {
    process.exit(0);
  }
});
