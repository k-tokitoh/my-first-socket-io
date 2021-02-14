import express from "express";
import http from "http";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (_req, res) => {
  res.send("<h1>Hello world</h1>");
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
