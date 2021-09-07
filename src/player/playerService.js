import Player from "./playerTypes.js";
import fileService from "./FileService.js";

class PlayerService {
  async createPlayer(playerConfig, file) {
    if (!playerConfig) throw new Error("нет оъекта игрока");
    const fileName = fileService.saveFile(file);
    const player = await Player.create({ ...playerConfig, fileName });
    return player;
  }

  async getPlayer(id) {
    if (!id) throw new Error("нет id игрока");
    const player = await Player.findById(id);
    return player;
  }
}

export default new PlayerService();
