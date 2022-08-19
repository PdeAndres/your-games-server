const router = require("express").Router();
const Game = require("../models/Game.model");
const Comment = require("../models/Comment.model");

const isAuthenticated = require("../middlewares/isAuthenticated");

//* POST "/api/games/:gameId" => Add one game to the DB
router.post("/", isAuthenticated, async (req, res, next) => {
  const { valoration, isFavourite, user, id, name, image } = req.body;
  try {
    const newGame = await Game.create({
      valoration,
      isFavourite,
      user,
      id,
      name,
      image,
    });
    res.json(newGame);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//* GET "/api/games/:gameId" => Find one game in the DB
router.get("/:gameId", isAuthenticated, async (req, res, next) => {
  const { gameId } = req.params;

  try {
    const findGame = await Game.findById(gameId);
    console.log(findGame);
    res.json(findGame);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//* DELETE "/api/games/:gameId" => Delete one game from the DB
router.delete("/:gameId", isAuthenticated, async (req, res, next) => {
  const { gameId } = req.params;
  console.log(gameId)
  try {
    await Game.findByIdAndDelete(gameId);
    res.status(200).json({ message: "Game deleted from the DB" });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;