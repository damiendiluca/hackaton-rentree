import express from "express";
import "dotenv/config";
import pool from "./config/db.js";
import usersRoutes from './routes/user.routes.js'
import dotenv from "dotenv";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.set('views', './views')

app.use('/auth', usersRoutes)

//Test de connexion
app.get("/", (req, res) => {
  res.send("API opérationnelle !");
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});