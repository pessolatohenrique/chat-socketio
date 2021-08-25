const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "public"));
app.engine("html", require("ejs").renderFile);

app.use("/", (req, res) => {
  res.render("index.html");
});

io.on("connection", (socket) => {
  console.log(`connected as ${socket.id}`);
  socket.on("sendMessage", (message) => {
    console.log({ ...message });
  });
});

server.listen(3000);
