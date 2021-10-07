import Player from "./playerTypes.js";

import { imageService } from "./imageService.js";

class PlayerService {
  async createPlayer(playerConfig, file) {
    if (!playerConfig) throw new Error("нет оъекта игрока");
    const avatarUrl = file ? await imageService.saveImage(file) : "default";
    try {
      playerConfig.initials = (
        playerConfig.firstName[0] + (playerConfig.lastName[0] || "")
      ).toUpperCase();
      const player = await Player.create({ ...playerConfig, avatarUrl });
      player.userID = player._id;
      player.imgSrc = avatarUrl;

      console.log("playerу", avatarUrl, player);
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

export const playerService = new PlayerService();
