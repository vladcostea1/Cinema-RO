
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
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serverul ruleaza pe http://localhost:${PORT}`);
});

app.get("/api/filme", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM filme ORDER BY id");
    res.json(result.rows);
  } catch (error) {
    console.error("EROARE SQL:", error);
    res.status(500).json({
      error: "Eroare la obținerea filmelor",
      details: String(error),
    });
  }
});


app.get("/api/seriale", async (req, res) => {
  try{
    const resault = await pool.query("SELECT * FROM seriale ORDER BY id");
    res.json(resault.rows);
  } catch (error){
    console.error("EROARE:", error);
    res.status(500).json({
      error: "Eroare la obținerea serialelor",
      details: String(error),
    })
  }

});


