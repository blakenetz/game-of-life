import { getWorld, postResults } from "./api";
import simulate from "./simulate";
import logger from "./logger";

async function main() {
  logger.debug("initializing...");
  const world = await getWorld();
  const results = await simulate(world);
  const response = await postResults(results);

  logger.debug(response);
  logger.info(`Visit results at: ${response.url}`);
}

main().catch((e) => logger.error(e));
