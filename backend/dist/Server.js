"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Serverul este pornit");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serverul ruleaza pe http://localhost:${PORT}`);
});
app.get("/api/filme", async (req, res) => {
    try {
        const result = await db_1.pool.query("SELECT * FROM filme ORDER BY id");
        res.json(result.rows);
    }
    catch (error) {
        console.error("EROARE SQL:", error);
        res.status(500).json({
            error: "Eroare la obținerea filmelor",
            details: String(error),
        });
    }
});
app.get("/api/seriale", async (req, res) => {
    try {
        const resault = await db_1.pool.query("SELECT * FROM seriale ORDER BY id");
        res.json(resault.rows);
    }
    catch (error) {
        console.error("EROARE:", error);
        res.status(500).json({
            error: "Eroare la obținerea serialelor",
            details: String(error),
        });
    }
});


