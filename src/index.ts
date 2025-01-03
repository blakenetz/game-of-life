import { Results, World } from "@/types";

const baseUrl = "https://game-of-life-service-ai3nmiz7aa-uc.a.run.app/";

async function getWorld(): Promise<World> {
  const url = new URL("world", baseUrl).toString();

  const response = await fetch(url);
  const world = await response.json();

  return world;
}

async function evaluate(world: World): Promise<Results> {
  return {
    id: world.id,
    generationCount: world.generationCount,
    generations: [[]],
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
  const evaluatedWorld = await evaluate(world);
  const results = await postResults(evaluatedWorld);

  console.log("results", results);
}

try {
  main();
} catch (error) {
  console.error("crap", error);
}
