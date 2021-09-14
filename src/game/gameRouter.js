import Router from "express";
import { Game } from "./gameTypes.js";
import { gameService } from "./GameService.js";
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
  const gameID = req.params.id;
  if (!gameID) res.status(400).json({ massage: "id не указан" });
  try {
    console.log("получение Game из базы по id");
    const gameConfig = await gameService.getGame(gameID);
    res.status(200).json(gameConfig);
  } catch (error) {
    res.status(500).json(error);
  }
});

gameRouter.post("/", async (req, res) => {
  try {
    const game = await gameService.createGame({
      status: "new",
      chatMessages: [],
      users: [],
      onlineUsers: [],
    });
    res.status(200).json(game);
  } catch (error) {
    console.log("ошибка создания игры");
    res.status(500).json(error);
  }
});
