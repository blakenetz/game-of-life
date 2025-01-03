import { getWorld, postResults } from "./api";
import simulate from "./simulate";

async function main() {
  const world = await getWorld();
  const results = simulate(world);
  const response = await postResults(results);

  console.log("results", response);
}

try {
  main();
} catch (error) {
  console.error("crap", error);
}
