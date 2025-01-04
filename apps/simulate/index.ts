import { Generations, Payload, Results } from "@/types";
import express, { Request, Response } from "express";

const baseUrl = "https://game-of-life-service-ai3nmiz7aa-uc.a.run.app/";

const app = express();
const port = 3002;

app.post("/", async (_req: Request, res: Response) => {
  const cachedSimulation = await cache.get<Generations>(payload.id);

  if (cachedSimulation) {
    return res.json({
      id: payload.id,
      generationCount: payload.generationCount,
      generations: cachedSimulation,
    });
  }

  const simulation = new Simulation(payload);

  const handleError = (error: Error) => {
    logger.error("Error running simulation");
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

app.listen(port, () => {
  console.log(`Simulate app running on port ${port}`);
});
