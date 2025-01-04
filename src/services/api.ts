import express, { Request, Response } from "express";
import { Results } from "@types";
import logger from "@utils/logger";

export const router = express.Router();

const baseUrl = "https://game-of-life-service-ai3nmiz7aa-uc.a.run.app/";

router.get("/:id", async (res: Response, req: Request) => {
  const { id } = req.params;
  const base = new URL("world", baseUrl);
  const url = new URL(id, base).toString();

  const handleError = (error: Error) => {
    logger.error("error fetching world");
    throw error;
  };

  const response = await fetch(url);

  if (!response.ok) handleError(new Error("Response not ok"));

  res.json(response.json().catch(handleError));
});

router.post("/", async (req: Request, res: Response) => {
  const results = req.body as Results;
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

  res.send(response);
});
