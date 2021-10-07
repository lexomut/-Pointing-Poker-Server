import { Image } from "./imageSchema.js";
import { Game } from "../game/gameTypes.js";

class ImageService {
  async saveImage(file) {
    // console.log(file)
    let imageName;
    const imgObject = {
      name: file.name,
      ext: file.name.split(".")[1],
      img: {
        data: file.data,
        contentType: file.mimetype,
      },
    };
    try {
      const img = await Image.create(imgObject);
      imageName = "img/" + img._id.toString() + "." + img.ext;
    } catch (error) {
      console.log(error);
    }
    return imageName;
  }

  async getImage(imageName) {
    if (!imageName) throw new Error("нет imageName");
    try {
      const imageID = imageName.split(".")[0];
      const image = await Image.findById(imageID);
      return image.img;
    } catch (error) {
      console.log("ошибка поучения из базы", error);
    }
  }
}
export const imageService = new ImageService();
