import { gameService } from "./GameService.js";

export async function addChatMessageToBase(gameID, chatMessage) {
  const game = await gameService.getGame(gameID);
  console.log(game.chatMessages);
  const chatMessages = [...game.chatMessages, chatMessage];
  await gameService.updateGame(gameID, "chatMessages", chatMessages);
}
