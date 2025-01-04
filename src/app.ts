import express, { Request, Response } from "express";
import logger from "@utils/logger";
import { simulationRouter, apiRouter } from "./services";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/api", apiRouter);
app.use("/simulation", simulationRouter);

app.get("/", async (req: Request, res: Response) => {
  logger.debug("fetching world...");
  logger.time.start();

  // const world = await getWorld();

  // logger.debug("running simulation...");
  // const results = await simulate(world);

  // logger.debug("posting results...");
  // const response = await postResults(results);

  logger.time.end();
  res.send(`Visit results at: `);
});

// app.get("/:id", async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const world = await getWorld(id);

//   logger.debug("running simulation...");
//   const results = await simulate(world);

//   logger.debug("posting results...");
//   const response = await postResults(results);

//   logger.time.end();
//   res.send(`Visit results at: ${response.url}`);
// });

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
