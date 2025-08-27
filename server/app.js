import express from "express";
import "dotenv/config";
import pool from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

//Test de connexion
app.get("/", (req, res) => {
  res.send("API opérationnelle !");
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
