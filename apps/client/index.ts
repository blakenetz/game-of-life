import express, { Request, Response } from "express";
// import logger from "./logger";
// import simulate from "./simulate";
// import { getWorld, postResults } from "./api";

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

app.get("/", async (req: Request, res: Response) => {
  const world = await fetch("http://localhost:3001/world").then((res) =>
    res.json()
  );

  // logger.debug("running simulation...");
  // const results = await simulate(world);

  // logger.debug("posting results...");
  // const response = await postResults(results);

  // logger.time.end();
  // res.send(`Visit results at: ${response.url}`);
  res.send("hi");
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
