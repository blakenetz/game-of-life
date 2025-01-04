import { Generations } from "@/types";
import express, { Request, Response } from "express";
import { cache, Simulation } from "./services";

const app = express();
const router = express.Router();
const port = 3002;

app.use(express.json());
app.use("/simulation", router);

app.listen(port, () => {
  console.log(`Simulation app running on port ${port}`);
});

router.post("/", async (req: Request, res: Response): Promise<void> => {
  const { payload } = req.body;
  const cachedSimulation = await cache.get<Generations>(payload.id);

  if (cachedSimulation) {
    res.json({
      id: payload.id,
      generationCount: payload.generationCount,
      generations: cachedSimulation,
    });
  }

  const simulation = new Simulation(payload);

  const handleError = (error: Error) => {
    // logger.error("Error running simulation");
    throw error;
  };

  const generations = await simulation.run().catch(handleError);

  cache.set(payload.id, generations);

  res.json({
    id: simulation.id,
    generationCount: simulation.count,
    generations,
  });
});
