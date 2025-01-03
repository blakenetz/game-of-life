import { World, Results, Payload } from "@/types";
import { getWorld, postResults } from "./api";

function evaluate({ id, generationCount, size, world }: Payload): Results {
  return {
    id,
    generationCount,
    generations: execute(world, generationCount),
  };
}

function execute(world: World, count: number): World[] {
  for (let i = 0; i < count; i++) {}
  return [[[]]];
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
