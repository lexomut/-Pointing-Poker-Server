import { handler } from "./handler.js";
import { addChatMessageToBase } from "../game/addChatMessageToBase.js";
import { CHAT_MESSAGE, SET_GAME_STATE, USER_CONNECTION } from "./Constants.js";
import { addUserToLobby } from "../game/addUserToLobby.js";
import { VOTE } from "./Constants.js";

let timeout = [];
// eslint-disable-next-line no-unused-vars
export function webSocketFunction(ws, req) {
  console.log("подключение c клиентом установлено");

  // ws.send();

  ws.on("message", async function (message) {
    // console.log("ws.on message+++++++++++++++++++++++++++++++++", message);
    try {
      const mesg = JSON.parse(message);
      switch (mesg.event) {
        case USER_CONNECTION: {
          await addUserToLobby(mesg.gameID, mesg.user);
          handler.initMessage(ws, mesg);
          if (!timeout.includes(mesg.user.userID))
            connectionHandler(
              ws,
              mesg,
              handler.broadcastConnection.bind(handler)
            );
          timeout.push(mesg.user.userID);
          setTimeout(() => {
            timeout = timeout.filter((id) => mesg.user.userID !== id);
          }, 1000 * 10);
          break;
        }
        case CHAT_MESSAGE: {
          if (!mesg.chatMessage) {
            sendError(ws, "нет обекта сообшения чата");
            return;
          }
          connectionHandler(ws, mesg, handler.broadcastMessage.bind(handler));
          addChatMessageToBase(mesg.gameID, mesg.chatMessage);
          break;
        }
        case SET_GAME_STATE: {
          connectionHandler(ws, mesg, handler.setGameState.bind(handler));
          break;
        }
        case VOTE: {
          connectionHandler(ws, mesg, handler.addVoteToGameState.bind(handler));
          break;
        }
      }
    } catch {
      ws.send("я вас не понимаю");
      console.log("e");
    }

    // console.log(message);
  });
}

function connectionHandler(ws, mesg, callback) {
  ws.id = mesg.gameID;
  callback(ws, mesg);
}
function sendError(ws, errorMessage) {
  ws.send({ event: "error", errorMessage });
}
