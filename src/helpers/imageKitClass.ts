import ImageKit from "imagekit";
import serverConfiguration from "../config/configServer";
import { logger } from "./logger";
const imageKit = new ImageKit({
  publicKey: serverConfiguration.imageKit.publicKey,
  privateKey: serverConfiguration.imageKit.privateKey,
  urlEndpoint: serverConfiguration.imageKit.urlEndPoing,
});

export default class imageKitClass {
  /**  UPLOAD IMAGE  **/
  async uploadImage(img: Buffer) {
    try {
      const base = img.toString("base64");
      const data = await imageKit.upload({
        file: base,
        fileName: `${Date.now()}`,
      });
      return data;
    } catch (e: any) {
      return logger.error(e.message);
    }
  }

  /** DELETE IMAGE  **/
  async deleteImage(id: string) {
    try {
      const res = await imageKit.deleteFile(id);
      return res;
    } catch (e: any) {
      return logger.error(e.message);
    }
  }
}
