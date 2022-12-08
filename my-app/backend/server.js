// const WebSocket = require("ws");

// const wss = new WebSocket.Server({ port: 5000 });
// wss.on("connection", (ws) => {
//   console.log("new Client");

//   ws.on("close", () => console.log("disconnected"));
// });
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const io = require;
