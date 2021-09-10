import { handler } from "./handler.js";
// eslint-disable-next-line no-unused-vars
export function webSocketFunction(ws, req) {
  console.log("подключение c клиентом установлено");
  // ws.send("сервер: вы подключились ко мне");

  ws.on("message", function (message) {
    console.log(message);
    try {
      const mesg = JSON.parse(message);
      switch (mesg.event) {
        case "userConnection":
          connectionHandler(
            ws,
            mesg,
            handler.broadcastConnection.bind(handler)
          );
          break;
        case "message":
          connectionHandler(ws, mesg, handler.broadcastMessage.bind(handler));
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

// ws.on("close", () => {
//   console.log("WebSocket was closed");
// });

// ws.onmessage = function (message) {}
