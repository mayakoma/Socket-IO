/*const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 5000 });
wss.on("connection", (ws) => {
  console.log("new Client");

  ws.on("close", () => console.log("disconnected"));
});
*/

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //every port can send
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});
