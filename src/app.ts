import express, { Request, Response } from "express";
import logger from "./logger";
import simulate from "./simulate";
import { getWorld, postResults } from "./api";

const app = express();
const port = 3000;

app.get("/", async (req: Request, res: Response) => {
  logger.debug("fetching world...");
  logger.time.start();

  const world = await getWorld();

  logger.debug("running simulation...");
  const results = await simulate(world);

  logger.debug("posting results...");
  const response = await postResults(results);

  logger.time.end();
  res.send(`Visit results at: ${response.url}`);
});

app.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const world = await getWorld(id);

  logger.debug("running simulation...");
  const results = await simulate(world);

  logger.debug("posting results...");
  const response = await postResults(results);

  logger.time.end();
  res.send(`Visit results at: ${response.url}`);
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
