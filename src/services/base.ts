import logger from "@utils/logger";

export default class BaseService {
  log(...args: any[]) {
    logger.debug(...args);
  }
}
