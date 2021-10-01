import { Game } from "../game/gameTypes.js";

class GameService {
  async createGame(gameConfig) {
    if (!gameConfig) throw new Error("нет оъекта игры");
    try {
      console.log("функция создания игры");
      let game = await Game.create({ ...gameConfig, gameID: "" });
      const gameID = game._id.toString();
      await gameService.updateGame(game._id, "gameID", gameID);
      game.gameID = gameID;
      return game;
    } catch (error) {
      console.log("ошибка записи в базу", error);
    }
  }

  async getGame(gameID) {
    if (!gameID) throw new Error("нет id");
    try {
      const game = Game.findById(gameID);
      return game;
    } catch (error) {
      console.log("ошибка поучения из базы", error);
    }
  }
  async updateGame(gameID, gameProperty, value) {
    if (!gameID || !gameProperty) throw new Error("переданы не все параметры");
    try {
      return await Game.findByIdAndUpdate(gameID, {
        [gameProperty]: value,
      });
    } catch (error) {
      console.log("ошибка записи в базу", error);
    }
  }
}

export const gameService = new GameService();
