import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Serverul este pornit");
});

app.get("/api/filme", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM filme ORDER BY id"
    );

    res.json(result.rows);
  } catch (error) {
    console.error("EROARE SQL FILME:", error);

    res.status(500).json({
      error: "Eroare la obținerea filmelor",
      details: String(error),
    });
  }
});


app.get("/api/seriale", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM seriale ORDER BY id"
    );

    res.json(result.rows);
  } catch (error) {
    console.error("EROARE SQL SERIALE:", error);

    res.status(500).json({
      error: "Eroare la obținerea serialelor",
      details: String(error),
    });
  }
});


app.get("/api/blogs", async (req, res) => {
  try {
    console.log("GET /api/blogs");

    const result = await pool.query(
      "SELECT * FROM blog_posts ORDER BY data_publicarii DESC"
    );

    console.log("Bloguri găsite:", result.rows);

    res.json(result.rows);

  } catch (error) {
    console.error("EROARE SQL BLOG:", error);

    res.status(500).json({
      error: "Eroare pentru bloguri",
      details: String(error),
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serverul ruleaza pe http://localhost:${PORT}`);
});