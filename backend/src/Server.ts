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


app.get("/api/search", async (req, res) => {
  try {
    const q = String(req.query.q || "").trim();

    if (!q) {
      return res.json({
        filme: [],
        seriale: []
      });
    }

    const searchTerm = `%${q}%`;

    const filmeResult = await pool.query(
      `
      SELECT
        id,
        titlu,
        descriere,
        gen,
        anul_aparitiei,
        durata,
        rating,
        imagine_url
      FROM filme
      WHERE
        titlu ILIKE $1
        OR descriere ILIKE $1
        OR gen ILIKE $1
      ORDER BY rating DESC, titlu ASC
      LIMIT 10
      `,
      [searchTerm]
    );

    const serialeResult = await pool.query(
      `
      SELECT
        id,
        titlu,
        descriere,
        gen,
        anul_aparitiei,
        sezoane,
        episoade,
        rating,
        imagine_url
      FROM seriale
      WHERE
        titlu ILIKE $1
        OR descriere ILIKE $1
        OR gen ILIKE $1
      ORDER BY rating DESC, titlu ASC
      LIMIT 10
      `,
      [searchTerm]
    );

    res.json({
      filme: filmeResult.rows,
      seriale: serialeResult.rows
    });

  } catch (error) {
    console.error("EROARE SEARCH:", error);

    res.status(500).json({
      error: "Eroare la căutare",
      details: String(error)
    });
  }
});

app.get("/auth/google/login", (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return res.status(500).json({
      error: "Google OAuth nu este configurat."
    });
  }

  const googleUrl = new URL(
    "https://accounts.google.com/o/oauth2/v2/auth"
  );

  googleUrl.searchParams.set("client_id", clientId);
  googleUrl.searchParams.set("redirect_uri", redirectUri);
  googleUrl.searchParams.set("response_type", "code");
  googleUrl.searchParams.set("scope", "openid email profile");
  googleUrl.searchParams.set("access_type", "offline");

  res.redirect(googleUrl.toString());
});