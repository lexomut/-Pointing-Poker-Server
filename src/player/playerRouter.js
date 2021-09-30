import Router from "express";
import Player from "./playerTypes.js";
import { playerService } from "./playerService.js";

export const playerRouter = Router();

playerRouter.get("/all", async (req, res) => {
  try {
    const playerConfig = await Player.find();

    res.status(200).json(playerConfig);
  } catch (error) {
    res.status(500).json(error);
  }
});

playerRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) res.status(400).json({ massage: "id не указан" });
  try {
    const playerConfig = await playerService.getPlayer(id);

    res.status(200).json(playerConfig);
  } catch (error) {
    res.status(500).json(error);
  }
});

playerRouter.post("/", async (req, res) => {
  let { userConfig } = req.body;
  userConfig = JSON.parse(userConfig);
  if (!userConfig.firstName)
    return res.status(400).json("first name is undefined");
  try {
    const player = await playerService.createPlayer(
      userConfig,
      req.files && req.files.avatar
    );
    res.status(200).json(player);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});
