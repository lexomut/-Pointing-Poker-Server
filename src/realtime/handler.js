import { aWss } from "../index.js";
import { gameService } from "../game/GameService.js";

class Handler {
  broadcastConnection(ws, message) {
    console.log(message);
    this.initMessage;

    this.broadcastMessage(ws, message);
  }

  broadcastMessage(ws, message) {
    for (const client of aWss.clients) {
      if (client.id === message.gameID) client.send(JSON.stringify(message));
    }
  }
  async setGameState(ws, message) {
    const { gameID, gameProperty, value } = message;
    try {
      const game = await gameService.updateGame(gameID, gameProperty, value);
      this.broadcastMessage(ws, { ...message, game });
    } catch {
      ws.send("при измемненни в базе произошла ошибка");
      // console.log(error);
    }
  }
  async initMessage(ws, message) {
    const { gameID } = message;
    try {
      const game = await gameService.getGame(gameID);
      const event = "initMessage";
      ws.send({ ...message, event, game });
    } catch {
      ws.send("при получении данных из базы произошла ошибка");
      // console.log("при получении данных из базы произошла ошибка");
    }
  }
}
export const handler = new Handler();
