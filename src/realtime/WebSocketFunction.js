import { handler } from "./handler.js";
import { addChatMessageToBase } from "../game/addChatMessageToBase.js";
import { CHAT_MESSAGE, SET_GAME_STATE, USER_CONNECTION } from "./Constants.js";
let timeout = [];
// eslint-disable-next-line no-unused-vars
export function webSocketFunction(ws, req) {
  console.log("подключение c клиентом установлено");

  // ws.send();

  ws.on("message", function (message) {
    console.log(message);
    try {
      const mesg = JSON.parse(message);
      switch (mesg.event) {
        case USER_CONNECTION:
          handler.initMessage(ws, mesg);
          console.log(timeout.includes(mesg.user.userID), timeout);
          if (!timeout.includes(mesg.user.userID))
            connectionHandler(
              ws,
              mesg,
              handler.broadcastConnection.bind(handler)
            );
          timeout.push(mesg.user.userID);
          setTimeout(() => {
            timeout = timeout.filter((id) => mesg.user.userID !== id);
          }, 1000 * 60 * 3);
          break;
        case CHAT_MESSAGE:
          if (!mesg.chatMessage) {
            sendError(ws, "нет обекта сообшения чата");
            return;
          }
          connectionHandler(ws, mesg, handler.broadcastMessage.bind(handler));
          addChatMessageToBase(mesg.gameID, mesg.chatMessage);
          break;
        case SET_GAME_STATE:
          connectionHandler(ws, mesg, handler.setGameState.bind(handler));
          break;
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

// ws.on("close", () => {
//   console.log("WebSocket was closed");
// });

// ws.onmessage = function (message) {}
