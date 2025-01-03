import { World, Results, Payload, Neighbors, Cell } from "@/types";
import { getWorld, postResults } from "./api";

function evaluate({ id, generationCount, size, world }: Payload): Results {
  return {
    id,
    generationCount,
    generations: simulate(world, generationCount),
  };
}

function simulate(world: World, count: number): World[] {
  const results: World[] = [];

  for (let i = 0; i < count; i++) {
    const row = world[i];
  }

  return results;
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

function getNeighbors(): Neighbors {
  return {
    topLeft: 0,
    top: 0,
    topRight: 0,
    right: 0,
    bottomRight: 0,
    bottom: 0,
    bottomLeft: 0,
    left: 0,
  };
}

async function main() {
  const world = await getWorld();
  const evaluatedWorld = evaluate(world);
  const results = await postResults(evaluatedWorld);

  console.log("results", results);
}

try {
  main();
} catch (error) {
  console.error("crap", error);
}
