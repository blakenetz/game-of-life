import { Payload, Results } from "@/types";
import logger from "./logger";

const baseUrl = "https://game-of-life-service-ai3nmiz7aa-uc.a.run.app/";

export async function getWorld(): Promise<Payload> {
  const url = new URL("world", baseUrl).toString();

  const handleError = (error: Error) => {
    logger.error("error fetching world");
    throw error;
  };

  const response = await fetch(url);

  if (!response.ok) handleError(new Error("Response not ok"));

  return response.json().catch(handleError);
}

export async function postResults(results: Results) {
  const url = new URL("results", baseUrl).toString();

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(results),
  });

  if (!response.ok) {
    logger.error("error posting results");
    throw new Error("error posting results");
  }

  return response;
}
