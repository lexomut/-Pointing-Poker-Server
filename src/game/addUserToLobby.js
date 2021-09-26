import { gameService } from "./GameService.js";

export async function addUserToLobby(gameID, newUser) {
  try {
    const game = await gameService.getGame(gameID);

    game.users.map((user) => user.userID);
    if (game.users.every((user) => user.userID !== newUser.userID)) {
      const users = [...game.users, newUser];
      await gameService.updateGame(gameID, "users", users);
    }
  } catch (error) {
    console.log(error);
  }
}
