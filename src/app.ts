import { ApiService, SimulationService } from "@services";
import cache from "@utils/cache";
import logger from "@utils/logger";
import express, { NextFunction, Request, Response } from "express";

const app = express();
const port = 3000;

app.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  logger.time.start();

  try {
    const world = await ApiService.getWorld();

    const cachedUrl = await cache.get<string>(world.id);
    if (cachedUrl) {
      res
        .status(200)
        .send(
          `<a href="${cachedUrl}" target="_blank">Visit results</a> for world ${world.id}`
        );
      return;
    }

    const results = await SimulationService.simulate(world);
    const response = await ApiService.postResults(results);

    cache.set(world.id, response.url);
    logger.time.end();
    res
      .status(200)
      .send(
        `<a href="${response.url}" target="_blank">Visit results</a>  for world ${world.id}`
      );
  } catch (error) {
    logger.time.end();
    next(error);
  }
});

app.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  logger.time.start();

  const cachedUrl = await cache.get<string>(id);
  if (cachedUrl) {
    res
      .status(200)
      .send(
        `<a href="${cachedUrl}" target="_blank">Visit results</a> for world ${id}`
      );
    return;
  }

  try {
    const world = await ApiService.getWorld(id);
    const results = await SimulationService.simulate(world);
    const response = await ApiService.postResults(results);

    cache.set(id, response.url);
    logger.time.end();
    res
      .status(200)
      .send(
        `<a href="${response.url}" target="_blank">Visit results</a> for world ${id}`
      );
  } catch (error) {
    logger.time.end();
    next(error);
  }
});

// 404
app.all("*", (req, res) => {
  res.status(404).send(`Page not found <a href="/">Try again</a>`);
});

// error handling
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof Response) {
    logger.error(err.statusText);
    res.status(500).send(`<strong>Error!</strong>
      <p>Here's what we know</p>
      <p>status: ${err.status}</p>
      <p>message: ${err.statusText}</p>
      <a href="/">Try again</a>
      `);
  } else {
    logger.error(err.stack);
    res.status(500).send(`<strong>Error!</strong>
      <p>Here's what we know</p>
      <p>name: ${err.name}</p>
      <p>message: ${err.message}</p>
      <a href="/">Try again</a>
      `);
  }
});

app.listen(port, () => console.log(`App running on port ${port}`));
