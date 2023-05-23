const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/:id", (req, res) => {
  let { id } = req.params;
  try {
    let games = JSON.parse(fs.readFileSync("./database/games-data.json"));
    let find = games.find((e, i) => e.id === +id);
    if (!find) {
      res.json({
        message: "Game not found",
      });
    }
    return res.json(find);
  } catch (error) {
    res.json({
      error,
    });
  }
});

router.post("/", (req, res) => {
  let { player1, player2, player3, player4 } = req.body;
  let id = Math.floor(Math.random() * 10000000000000);
  let newGame = {
    id,
    users: [player1, player2, player3, player4],
    rounds: [],
  };

  try {
    let games = JSON.parse(fs.readFileSync("./database/games-data.json"));
    games.push(newGame);
    fs.writeFileSync("./database/games-data.json", JSON.stringify(games));
    res.json({
      id,
      message: "Game created successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      error,
    });
  }
});

router.put("/:id", (req, res) => {
  // game_id
  // round_index,
  // []
  let { id } = req.params;
  let { roundIndex, roundPoints } = req.body;
  console.log(roundIndex, roundPoints);
  if (typeof roundPoints === "string") {
    roundPoints = JSON.parse(roundPoints);
  }
  try {
    let games = JSON.parse(fs.readFileSync("./database/games-data.json"));
    let findIndex = games.findIndex((e, i) => e.id === +id);
    if (!roundIndex) {
      // console.log(games[findIndex].rounds);
      // console.log(roundPoints);
      games[findIndex].rounds.push(roundPoints);
      // console.log("hihihihih");
      // console.log(findIndex);
      fs.writeFileSync("./database/games-data.json", JSON.stringify(games));
      res.json({
        message: "Create new round successfully",
      });
    } else {
      games[findIndex].rounds[roundIndex] = roundPoints;
      console.log("hihihihihih");
      fs.writeFileSync("./database/games-data.json", JSON.stringify(games));
      res.json({
        message: `Update round at ${roundIndex + 1} successfully`,
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
});

module.exports = router;
