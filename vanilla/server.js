const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res, next) => {
  res.sendFile("index.html");
});

function startServer() {
  return new Promise((resolve, reject) => {
    const server = app.listen(3000, () => {
      resolve("http://localhost:3000");
    });
    server.on("connect", () => {
      console.log("Listening to server 3000");
    });
    server.on("error", (err) => {
      console.log(err);
      reject(err);
    });
  });
}

module.exports = startServer;
