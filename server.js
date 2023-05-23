const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");

// import routes
const GameRoutes = require("./routes/game.routes");

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(morgan("dev"));

server.use("/api/v1/games", GameRoutes);

server.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/homepage.html`);
});

server.get("/game-detail/:id", (req, res) => {
  // Gửi dữ liệu về game với id đó về
  res.sendFile(`${__dirname}/public/gamepage.html`);
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
