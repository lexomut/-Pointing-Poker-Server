import Player from "./playerTypes.js";

class PlayerService {
  async createPlayer(playerConfig) {
    if (!playerConfig) throw new Error('нет оъекта игрока');
    await Player.create(playerConfig);
    return playerConfig;
  }

  async getPlayer(id) {
    if (!id) throw new Error('нет id игрока');
    const player = await Player.findById(id)
    return player;
  }

}

export default new PlayerService();