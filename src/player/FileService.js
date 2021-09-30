import * as path from "node:path";
import * as uuid from "uuid";

class FileService {
  saveFile(file) {
    const filename = uuid.v4() + "." + file.name.split(".")[1];
    let fp;
    try {
      const filePath = path.resolve("static", filename);
      fp = filePath;
    } catch (error) {
      console.log("директория не создана", error);
    }
    try {
      file.mv(fp);
    } catch (error) {
      console.log(`не могу переместить файл ${filename} пути ${fp}`, error);
    }
    return filename;
  }
}

export default new FileService();
