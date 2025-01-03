const baseUrl = "https://game-of-life-service-ai3nmiz7aa-uc.a.run.app/";

async function getWorld() {
  const url = new URL("world", baseUrl).toString();

  const response = await fetch(url);
  const world = await response.json();

  return world;
}

async function evaluate(world) {
  return {};
}

async function postResults(results: any) {
  const url = new URL("results", baseUrl).toString();
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(results),
  });
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
