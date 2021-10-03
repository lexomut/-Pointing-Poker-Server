import { gameService } from "./GameService.js";

export async function addUserToLobby(gameID, newUser) {
  if (!newUser.userID) return;
  try {
    const game = await gameService.getGame(gameID);
    // gameService.getGame(gameID).then((m) => console.log("до добавления", m));
    game.users.map((user) => user.userID);
    if (
      game.users.every((user) => user.userID !== newUser.userID) &&
      (game.status === "pending" || game.status === "new")
    ) {
      const users = [...game.users, newUser];
      await gameService.updateGame(gameID, "users", users);
      //   gameService
      //     .getGame(gameID)
      //     .then((m) => console.log("после добавления", m));
    }
  } catch (error) {
    console.log(error);
  }
}
