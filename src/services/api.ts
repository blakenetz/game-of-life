import { Payload, Results } from "@types";
import BaseService from "./base";

class ApiService extends BaseService {
  baseUrl: string;

  constructor() {
    super();
    this.baseUrl = "https://game-of-life-service-ai3nmiz7aa-uc.a.run.app/";
  }

  async getWorld(id = ""): Promise<Payload> {
    this.log(`getting world with id: ${id}...`);
    const base = new URL("world", this.baseUrl);
    const url = new URL(id, base).toString();

    const response = await fetch(url);

    if (!response.ok) throw response;
    return response.json();
  }

  async postResults(results: Results): Promise<Response> {
    this.log(`posting results...`);
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
