import express, { Request, Response } from "express";

const baseUrl = "https://game-of-life-service-ai3nmiz7aa-uc.a.run.app/";

const app = express();
const router = express.Router();
const port = 3001;

app.use(express.json());
app.use("/api", router);

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const base = new URL("world", baseUrl);
  const url = new URL(id, base).toString();

  const handleError = (error: Error) => {
    throw error;
  };

  const response = await fetch(url);

  if (!response.ok) handleError(new Error("Response not ok"));

  res.send(response.json());
});

router.post("/", async (req: Request, res: Response) => {
  const { results } = req.body;
  const url = new URL("results", baseUrl).toString();

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(results),
  });

  if (!response.ok) {
    // logger.error("error posting results");
    throw new Error("error posting results");
  }

  res.send(response);
});

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
