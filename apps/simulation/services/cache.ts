import { createStorage } from "unstorage";
import fsDriver from "unstorage/drivers/fs";

export default createStorage({
  driver: fsDriver({ base: "./.cache" }),
});
