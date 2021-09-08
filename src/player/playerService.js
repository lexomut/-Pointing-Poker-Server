import Player from "./playerTypes.js";
import fileService from "./FileService.js";

class PlayerService {
  async createPlayer(playerConfig, file) {
    if (!playerConfig) throw new Error("нет оъекта игрока");
    const avatarUrl = file ? fileService.saveFile(file) : "default";
    try {
      const player = await Player.create({ ...playerConfig, avatarUrl });
      return player;
    } catch (error) {
      console.log("ошибка записи в базу", error);
    }
  }

  async getPlayer(id) {
    if (!id) throw new Error("нет id игрока");
    const player = await Player.findById(id);
    return player;
  }
}

export default new PlayerService();
