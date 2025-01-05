import { Payload, Results } from "@types";

class ApiService {
  baseUrl: string;

  constructor() {
    this.baseUrl = "https://game-of-life-service-ai3nmiz7aa-uc.a.run.app/";
  }

  async getWorld(id = ""): Promise<Payload> {
    const base = new URL("world", this.baseUrl);
    const url = new URL(id, base).toString();

    const response = await fetch(url);

    if (!response.ok) throw response;
    return response.json();
  }

  async postResults(results: Results): Promise<Response> {
    const url = new URL("results", this.baseUrl).toString();

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(results),
    });

    if (!response.ok) throw response;
    return response;
  }
}

export default new ApiService();
