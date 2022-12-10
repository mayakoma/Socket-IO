/*const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 5000 });
wss.on("connection", (ws) => {
  console.log("new Client");

  ws.on("close", () => console.log("disconnected"));
});
*/

const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const HttpError = require("./model/httpError");
const codeRoute = require("./routes/code-route");
const { Server } = require("socket.io");
let clientsConnections = new Array().fill(0);
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

mongoose.set("strictQuery", false);
app.use(cors());
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

app.use("/code", codeRoute);

app.use((req, res, next) => {
  const error = new HttpError("Could  not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    "mongodb+srv://mayakoma:mayakoma7@cluster0.wkzoen0.mongodb.net/code?retryWrites=true&w=majority"
  )
  .then(() => {
    server.listen(5000, () => console.log("listen  port 5000"));
    io.on("connection", (socket) => {
      console.log(`c connected ${socket.id} `);

      socket.on("join_code", (data) => {
        [room, index] = data;
        socket.join(room);
        console.log(`user with ID ${socket.id} joined code-room ${room}`);

        if (
          Number.isNaN(clientsConnections[index]) ||
          !clientsConnections[index]
        ) {
          clientsConnections[index] = 0;
        }
        clientsConnections[index]++;
        if (clientsConnections[index] === 1) {
          socket.emit("edit_mood", [false, socket.id]);
        } else {
          socket.emit("edit_mood", [true, socket.id]);
        }
        console.log(clientsConnections);
      });

      socket.on("send_code", (data) => {
        socket.to(data.room).emit("receive_code", data);
      });

      socket.on("remove_client", (data) => {
        clientsConnections[data.roomIndex]--;
        console.log(clientsConnections);
      });

      socket.on("disconnect", () => {
        console.log(`c disconnected ${socket.id} `);
      });
    });
  })
  .catch((err) => console.log(err));
