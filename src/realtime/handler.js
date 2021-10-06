import { aWss } from "../index.js";
import { gameService } from "../game/GameService.js";

class Handler {
  async addVoteToGameState(ws, message) {
    const { gameID, user, vote } = message;
    try {
      const game = await gameService.getGame(gameID);
      if (!game.vote) return;
      if (vote) game.vote.yes++;
      else game.vote.no++;
      game.vote.votedUsersID.push(user.userID);

      if (game.vote.no + game.vote.yes >= game.users.length - 1) {
        if (game.vote.no < game.vote.yes) {
          gameService.updateGame(gameID, "kickedUsersID", [
            ...game.kickedUsersID,
            game.vote.kickID,
          ]);
          const users = game.users.filter(
            (user) => game.vote.kickID !== user.userID
          );
          await gameService.updateGame(gameID, "users", users);
        }
        const und = undefined;
        await gameService.updateGame(gameID, "vote", und);
      } else await gameService.updateGame(gameID, "vote", game.vote);
      const event = "initMessage";
      const newGame = await gameService.getGame(gameID);
      this.broadcastMessage(ws, { gameID, event, game: newGame });
    } catch (error) {
      ws.send("при измемненни в базе произошла ошибка");
      console.log(error);
    }
  }

  broadcastConnection(ws, message) {
    // console.log(message);
    this.initMessage;
    this.broadcastMessage(ws, message);
  }

  async broadcastMessage(ws, message) {
    for (const client of aWss.clients) {
      if (client.id === message.gameID) {
        await client.send(JSON.stringify(message));
        console.log("broadcastMessage выполнен");
      }
    }
  }
  async setGameState(ws, message) {
    const { gameID, gameProperty, value } = message;
    try {
      const game = await gameService.updateGame(gameID, gameProperty, value);
      await this.broadcastMessage(ws, { ...message, game });
      if (gameProperty === "vote") {
        setTimeout(async () => {
          const game = await gameService.getGame(gameID);
          if (game.vote) {
            const game = await gameService.updateGame(
              gameID,
              gameProperty,
              value
            );
            await this.broadcastMessage(ws, {
              ...message,
              game: { ...game, vote: undefined },
            });
          }
        }, 1000 * 60 * 3);
      }
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
      ws.send(JSON.stringify({ ...message, event, game }));
    } catch (error) {
      ws.send(
        "сервер: initMessage - при получении данных из базы произошла ошибка"
      );
      console.log("при получении данных из базы произошла ошибка", error);
    }
  }
  async setSelectedCards(ws, message) {
    const { gameID, user, card } = message;
    try {
      const game = await gameService.getGame(gameID);

      // gameService.getGame(gameID).then(console.log);
      const { selectedCards, round, gameSettings, users } = game;
      const observers = users.filter((_user) => _user.role === "observer");
      if (round.status !== "going") return;
      const newSelectedCards = selectedCards.filter(
        (object) => object.user.userID !== user.userID
      );
      newSelectedCards.push({ card, user });
      await gameService.updateGame(gameID, "selectedCards", newSelectedCards);
      const cards = newSelectedCards.reduce(
        (sum, object) => (object.card ? sum + 1 : sum),
        0
      );
      const dealerISPlayer = gameSettings.dealerIsPlaying ? 0 : 1;
      if (
        !gameSettings.isTimerNeeded &&
        users.length - observers.length - dealerISPlayer === cards
      ) {
        console.log("raund over");
        await gameService.updateGame(gameID, "round", {
          ...round,
          status: "over",
        });
      }
      const event = "initMessage";
      const messageGame = await gameService.getGame(gameID);
      await this.broadcastMessage(ws, { ...message, event, game: messageGame });
    } catch (error) {
      ws.send(
        "сервер: initMessage - при получении данных из базы произошла ошибка"
      );
      console.log("при получении данных из базы произошла ошибка", error);
    }
  }
}
export const handler = new Handler();
