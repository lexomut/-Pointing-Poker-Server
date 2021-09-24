import { gameService } from "./GameService.js";

export async function addUserToLobby(gameID, newUser) {
  try {
    const game = await gameService.getGame(gameID);
    console.log("newUser", newUser);
    console.log(
      "game.users",
      game.users.map((user) => user.userID)
    );
    if (game.users.every((user) => user.userID !== newUser.userID)) {
      console.log("добавлен user ");
      const users = [...game.users, newUser];
      await gameService.updateGame(gameID, "users", users);
    }
  } catch (error) {
    console.log(error);
  }
}
