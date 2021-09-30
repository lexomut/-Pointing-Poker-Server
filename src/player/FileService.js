import * as path from "node:path";
import * as uuid from "uuid";

class FileService {
  saveFile(file) {
    const filename = uuid.v4() + "." + file.name.split(".")[1];
    try {
      const filePath = path.resolve("static", filename);
      file.mv(filePath);
    } catch (error) {
      console.log(error);
    }
    return filename;
  }
}

export default new FileService();
