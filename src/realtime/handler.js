import { aWss } from "../index.js";
import Game from "../game/gameTypes.js";

class Handler {
  broadcastConnection(ws, message) {
    console.log(message);
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
      const game = await Game.findByIdAndUpdate(gameID, {
        [gameProperty]: value,
      });
      this.broadcastMessage(ws, { ...message, game });
    } catch {
      ws.send("при измемненни в базе произошла ошибка");
      // console.log(error);
    }
  }
}
export const handler = new Handler();
