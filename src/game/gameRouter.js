import Router from "express";
import Game from "./gameTypes.js";
export const gameRouter = Router();

gameRouter.get("/all", async (req, res) => {
  try {
    const gameConfig = await Game.find();

    res.status(200).json(gameConfig);
  } catch (error) {
    res.status(500).json(error);
  }
});

gameRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) res.status(400).json({ massage: "id не указан" });
  try {
    const gameConfig = await Game.findById(id);

    res.status(200).json(gameConfig);
  } catch (error) {
    res.status(500).json(error);
  }
});

gameRouter.post("/", async (req, res) => {
  // const { gameConfig } = req.body;
  try {
    const game = await Game.create({ status: "new" });
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json(error);
  }
});
