import { Payload, Results } from "@types";
import logger from "@utils/logger";

class ApiService {
  baseUrl: string;

  constructor() {
    this.baseUrl = "https://game-of-life-service-ai3nmiz7aa-uc.a.run.app/";
  }

  async getWorld(id = ""): Promise<Payload> {
    const base = new URL("world", this.baseUrl);
    const url = new URL(id, base).toString();

    const response = await fetch(url);

    const handleError = (error: Error) => {
      logger.error("error fetching world");
      throw error;
    };

    if (!response.ok) handleError(new Error("Response not ok"));
    return response.json().catch(handleError);
  }

  async postResults(results: Results): Promise<Response> {
    const url = new URL("results", this.baseUrl).toString();

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
}

export default new ApiService();
