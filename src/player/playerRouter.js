import Router from 'express';
import Player from "./playerTypes.js";
import PlayerService from "./playerService.js"

export const playerRouter = Router();


playerRouter.get('/all', async (req, res) => {

  try {
    const playerConfig = await Player.find()

    res.status(200)
      .json(playerConfig)

  } catch (e) {
    res.status(500).json(e)

  }

})

playerRouter.get('/:id', async (req, res) => {

  const {id} = req.params
  if (!id) res.status(400).json({massage: "id не указан"})
  try {
    const playerConfig = await PlayerService.getPlayer(id)

    res.status(200)
      .json(playerConfig)

  } catch (e) {
    res.status(500).json(e)

  }
})


playerRouter.post('/', async (req, res) => {
  const {playerConfig} = req.body
  try {
    const player = await PlayerService.createPlayer(playerConfig);
    res.status(200)
      .json(player);

  } catch (e) {
    res.status(500).json(e);

  }

})