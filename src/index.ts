import { getWorld, postResults } from "./api";
import simulate from "./simulate";

async function main() {
  const world = await getWorld();
  const results = await simulate(world);
  const response = await postResults(results);

  console.log("results", response);
}

main().catch((e) => {
  console.error("crap", e);
});
