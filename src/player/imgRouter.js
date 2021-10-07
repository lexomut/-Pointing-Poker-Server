import Router from "express";
import { imageService } from "./imageService.js";

export const imgRouter = Router();

imgRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) res.status(400).json({ massage: "id не указан" });
  try {
    const image = await imageService.getImage(id);
    res.contentType(image.contentType);
    res.send(image.data);
  } catch (error) {
    res.status(500).json({ error });
  }
});
