import {
  World,
  Results,
  Payload,
  Neighbors,
  Cell,
  Generations,
  Neighborhood,
} from "@/types";
import logger from "../packages/logger";
import cache from "../packages/cache";

export default async function (payload: Payload): Promise<Results> {
  const cachedSimulation = await cache.get<Generations>(payload.id);

  if (cachedSimulation) {
    logger.debug("Simulation fetched from cache");
    return {
      id: payload.id,
      generationCount: payload.generationCount,
      generations: cachedSimulation,
    };
  }

  const simulation = new Simulation(payload);

  const handleError = (error: Error) => {
    logger.error("Error running simulation");
    throw error;
  };

  const generations = await simulation.run().catch(handleError);

  cache.set(payload.id, generations);

  return {
    id: simulation.id,
    generationCount: simulation.count,
    generations,
  };
}

class Simulation {
  id: string;
  count: number;
  limit: number;
  startingWorld: World;

  constructor(payload: Payload) {
    this.id = payload.id;
    this.count = payload.generationCount;
    this.limit = payload.size - 1;
    this.startingWorld = payload.world;
  }

  private toCell(value: boolean) {
    return Number(value) as Cell;
  }

  private getNeighbors(
    [top, current, bottom]: Neighborhood,
    index: number
  ): Neighbors {
    const isStart = index === 0;
    const isEnd = index === this.limit;

    return {
      // top row
      topLeft: !top || isStart ? 0 : top[index - 1],
      top: !top ? 0 : top[index],
      topRight: !top || isEnd ? 0 : top[index + 1],
      // bottom row
      bottomLeft: !bottom || isStart ? 0 : bottom[index - 1],
      bottom: !bottom ? 0 : bottom[index],
      bottomRight: !bottom || isEnd ? 0 : bottom[index + 1],
      // sides
      left: isStart ? 0 : current[index - 1],
      right: isEnd ? 0 : current[index + 1],
    };
  }

  /**
   * For living cells:
   * cell with < 2 live neighbors dies (under population)
   * cell with 2-3 live neighbors lives
   * cell with > 3 dies (overpopulation)
   *
   * for dead cells:
   * cell with 3 live neighbors becomes "alive"
   */
  private determineFate(cell: Cell, neighbors: Neighbors): boolean {
    const neighborCount = Object.values(neighbors).reduce<number>(
      (acc, neighbor) => (acc += neighbor),
      0
    );

    // revitalize dead cell
    if (cell === 0) return neighborCount === 3;

    // determine fate of living cell
    return neighborCount === 2 || neighborCount === 3;
  }

  private simulateGeneration(world: World): World {
    return world.map((row, i) => {
      if (!row) throw Error("Row not found");

      // get the rows above and below the current row
      const neighborhood: Neighborhood = [world[i - 1], row, world[i + 1]];
      // iterate over the cells
      return row.map((cell, j) => {
        const neighbors = this.getNeighbors(neighborhood, j);
        const fate = this.determineFate(cell, neighbors);
        return this.toCell(fate);
      });
    });
  }

  async run(): Promise<Generations> {
    return new Promise((resolve, reject) => {
      const generations: Generations = [];

      // iterate through each generation
      for (let i = 0; i < this.count; i++) {
        // start simulation with first world
        const world = generations[i - 1] ?? this.startingWorld;
        if (!world) reject("Unable to find world to simulate");

        try {
          const nextGeneration = this.simulateGeneration(world);
          generations.push(nextGeneration);
        } catch (error) {
          logger.error("Unable to simulate generation");
          throw error;
        }
      }

      resolve(generations);
    });
  }
}