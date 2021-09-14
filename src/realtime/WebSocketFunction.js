import { handler } from "./handler.js";
import { addChatMessageToBase } from "../game/addChatMessageToBase.js";
// eslint-disable-next-line no-unused-vars
export function webSocketFunction(ws, req) {
  console.log("подключение c клиентом установлено");

  // ws.send();

  ws.on("message", function (message) {
    console.log(message);
    try {
      const mesg = JSON.parse(message);
      switch (mesg.event) {
        case "userConnection":
          handler.initMessage(ws, mesg);
          connectionHandler(
            ws,
            mesg,
            handler.broadcastConnection.bind(handler)
          );
          break;
        case "message":
          if (!mesg.chatMessage) {
            sendError(ws, "нет обекта сообшения чата");
            return;
          }
          connectionHandler(ws, mesg, handler.broadcastMessage.bind(handler));
          addChatMessageToBase(mesg.gameID, mesg.chatMessage);
          break;
        case "setGameState":
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
