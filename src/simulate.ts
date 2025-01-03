import {
  World,
  Results,
  Payload,
  Neighbors,
  Cell,
  Neighborhood,
} from "@/types";

export default function (payload: Payload): Results {
  const simulation = new Simulation(payload);

  return {
    id: simulation.id,
    generationCount: simulation.count,
    generations: simulation.run(),
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
      topLeft: isStart || !top ? 0 : top[index - 1],
      top: !top ? 0 : top[index],
      topRight: isEnd || !top ? 0 : top[index + 1],
      right: isEnd ? 0 : current[index + 1],
      bottomRight: isEnd || !bottom ? 0 : bottom[index + 1],
      bottom: !bottom ? 0 : bottom[index],
      bottomLeft: isStart || !bottom ? 0 : bottom[index - 1],
      left: isStart ? 0 : current[index - 1],
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

  run(): World[] {
    const results: World[] = [];

    // iterate through each generation
    for (let i = 0; i < this.count; i++) {
      // start simulation with first world
      const world = results[i - 1] ?? this.startingWorld;
      const nextGeneration = this.simulateGeneration(world);
      results.push(nextGeneration);
    }

    return results;
  }
}
