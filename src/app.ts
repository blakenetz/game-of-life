import { ApiService, SimulationService } from "@services";
import { Generations } from "@types";
import cache from "@utils/cache";
import logger from "@utils/logger";
import express, { Request, Response } from "express";

const app = express();
const port = 3000;

app.get("/", async (req: Request, res: Response) => {
  logger.debug("fetching world...");
  logger.time.start();

  const world = await ApiService.getWorld();

  const cachedUrl = await cache.get<string>(world.id);
  if (cachedUrl) res.send(`Visit results at: ${cachedUrl}`);

  logger.debug("running simulation...");
  const results = await SimulationService.simulate(world);

  logger.debug("posting results...");
  const response = await ApiService.postResults(results);
  cache.set(world.id, response.url);

  logger.time.end();
  res.send(`Visit results at: ${response.url}`);
});

app.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const cachedUrl = await cache.get<string>(id);
  if (cachedUrl) res.send(`Visit results at: ${cachedUrl}`);

  const world = await ApiService.getWorld(id);

  logger.debug("running simulation...");
  const results = await SimulationService.simulate(world);

  logger.debug("posting results...");
  const response = await ApiService.postResults(results);
  cache.set(id, response.url);

  logger.time.end();
  res.send(`Visit results at: ${response.url}`);
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
