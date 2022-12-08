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
mongoose.set("strictQuery", false);
const HttpError = require("./model/httpError");
const codeRoute = require("./routes/code-route");

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
    const server = app.listen(5000, () => console.log("listen  port 5000"));
    const io = require("socket.io")(server);
    io.on("connection", (socket) => {
      console.log("c c");
    });
  })
  .catch((err) => console.log(err));
