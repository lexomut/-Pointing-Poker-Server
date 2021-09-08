import { wss } from "../index.js";
export function webSocketFunction(ws, req) {
  console.log("соединение");

  ws.on("message", function (message) {
    ws.send(message);
    console.log(message);
  });
  ws.on("close", () => {
    console.log("WebSocket was closed");
  });

  // eslint-disable-next-line unicorn/prefer-add-event-listener
  ws.onmessage = function (message) {
    console.log(message.data);
    for (const client of wss.clients) {
      client.send(message.data);
    }
  };
}
