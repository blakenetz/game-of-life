import { Payload, Results } from "@/types";

const baseUrl = "https://game-of-life-service-ai3nmiz7aa-uc.a.run.app/";

export async function getWorld(): Promise<Payload> {
  const url = new URL("world", baseUrl).toString();

  const handleError = (error: Error) => {
    console.error("error fetching world");
    throw error;
  };

  const response = await fetch(url).catch(handleError);
  return response.json().catch(handleError);
}

export async function postResults(results: Results) {
  const url = new URL("results", baseUrl).toString();

  const handleError = (error: Error) => {
    console.error("error posting results");
    throw error;
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(results),
  }).catch(handleError);

  return response;
}
