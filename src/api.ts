import { Payload, Results } from "@/types";

const baseUrl = "https://game-of-life-service-ai3nmiz7aa-uc.a.run.app/";

export async function getWorld(): Promise<Payload> {
  const url = new URL("world", baseUrl).toString();
  const response = await fetch(url);
  return response.json();
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

  return response;
}
