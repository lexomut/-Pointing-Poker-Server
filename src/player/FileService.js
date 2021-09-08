import * as path from "node:path";
import * as uuid from "uuid";

class FileService {
  saveFile(file) {
    try {
      const filename = uuid.v4() + "." + file.name.split(".")[1];
      const filePath = path.resolve("static", filename);
      file.mv(filePath);
      return filename;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new FileService();
