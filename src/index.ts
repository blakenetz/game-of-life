import {
  World,
  Results,
  Payload,
  Neighbors,
  Cell,
  Row,
  Neighborhood,
} from "@/types";
import { getWorld, postResults } from "./api";

function evaluate({ id, generationCount, size, world }: Payload): Results {
  return {
    id,
    generationCount,
    generations: simulate(world, generationCount, size - 1),
  };
}

function simulate(world: World, count: number, limit: number): World[] {
  // start simulation with first world
  const results: World[] = [];

  // iterate through each generation
  for (let i = 0; i < count; i++) {
    const nextGeneration = simulateGeneration(results[i - 1] ?? world, limit);
    results.push(nextGeneration);
  }

  return results;
}

function simulateGeneration(world: World, limit: number): World {
  return world.map((row, i) => {
    // get the rows above and below the current row
    const rows: Neighborhood = [world[i - 1], row, world[i + 1]];
    // iterate over the cells
    return row.map((cell, j) => {
      const neighbors = getNeighbors(rows, j, limit);
      const fate = determineFate(cell, neighbors);
      return Number(fate) as Cell;
    });
  });
}

function getNeighbors(
  [top, current, bottom]: Neighborhood,
  index: number,
  limit: number
): Neighbors {
  const isStart = index === 0;
  const isEnd = index === limit;

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
 * for dead cells:
 * cell with 3 live neighbors becomes "alive"
 */
function determineFate(cell: Cell, neighbors: Neighbors): boolean {
  const neighborCount = Object.values(neighbors).reduce<number>(
    (acc, neighbor) => (acc += neighbor),
    0
  );

  // revitalize dead cell
  if (cell === 0) return neighborCount === 3;

  // determine fate of living cell
  return neighborCount === 2 || neighborCount === 3;
}

async function main() {
  const world = await getWorld();
  const results = evaluate(world);
  const response = await postResults(results);

  console.log("results", response);
}

try {
  main();
} catch (error) {
  console.error("crap", error);
}
