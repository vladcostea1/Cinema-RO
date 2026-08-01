// @ts-ignore: missing type declarations for express
import express from "express";
// @ts-ignore: missing type declarations for cors
import cors from "cors";
import dotenv from "dotenv";
import "./db"

dotenv.config();
    const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Serverul este pornit");
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serverul rulează pe http://localhost:${PORT}`);
} );  


