import * as path from "node:path";
import * as uuid from "uuid";

class FileService {
  async saveFile(file) {
    const filename = uuid.v4() + "." + file.name.split(".")[1];
    let fp;
    try {
      const filePath = await path.resolve("static", filename);
      fp = filePath;
      if (!filePath) console.log("путь не создан");
      console.log(filePath);
    } catch (error) {
      console.log("директория не создана", error);
    }
    try {
      if (!file) console.log("файла нет");
      await file.mv(fp);
    } catch (error) {
      console.log(`не могу переместить файл ${filename} пути ${fp}`, error);
    }
    return filename;
  }
}

export default new FileService();
