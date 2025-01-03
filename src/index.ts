import { World, Results, Payload } from "@/types";

const baseUrl = "https://game-of-life-service-ai3nmiz7aa-uc.a.run.app/";

async function getWorld(): Promise<Payload> {
  const url = new URL("world", baseUrl).toString();

  const response = await fetch(url);
  const world = await response.json();

  return world;
}

function execute(world: World, count: number): World[] {
  for (let i = 0; i < count; i++) {}
  return [[[]]];
}

function evaluate({ id, generationCount, size, world }: Payload): Results {
  return {
    id,
    generationCount,
    generations: execute(world, generationCount),
  };
}

async function postResults(results: Results) {
  const url = new URL("results", baseUrl).toString();
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(results),
  });

  return response.json();
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
