import { getWorld, postResults } from "./api";
import simulate from "./simulate";
import logger from "./logger";

async function main() {
  logger.debug("fetching world...");
  logger.time.start();

  const world = await getWorld();

  logger.debug("running simulation...");
  const results = await simulate(world);

  logger.debug("posting results...");
  const response = await postResults(results);

  logger.time.end();
  logger.info(`Visit results at: ${response.url}`);
}

main().catch((e) => logger.error(e));
