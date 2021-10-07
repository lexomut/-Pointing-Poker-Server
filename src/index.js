import express from "express";
import * as path from "node:path";
import mongoose from "mongoose";
import expressWsModule from "express-ws";
import { gameRouter } from "./game/gameRouter.js";
import { playerRouter } from "./player/playerRouter.js";
import fileUpload from "express-fileupload";
import cors from "cors";
import { webSocketFunction } from "./realtime/WebSocketFunction.js";
import { imgRouter } from "./player/imgRouter.js";
const staticPath = path.resolve("static");
const PORT = process.env.PORT || 5000;
const DB_URL =
  "mongodb+srv://reactjs:reactjs@cluster0.gncmp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const app = express();
const expressWs = expressWsModule(app);
export const aWss = expressWs.getWss();

const router = express.Router();
router.ws("/", webSocketFunction);

app.use(cors());
app.use(fileUpload({}));
app.use(express.json());
app.use("/ws", router);
// app.ws("/ws", webSocketFunction);
app.use("/game", gameRouter);
app.use("/img", imgRouter);
app.use("/player", playerRouter);
app.use(express.static(staticPath));
app.use("/", (req, res) => {
  res.end("<h1>pointing-poker-server</h1>");
});

async function startApp() {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => console.log(`Server start on port:`, PORT));
  } catch (error) {
    console.log(error);
  }
}
startApp();
