import express from "express";
import "dotenv/config";
import pool from "./config/db.js";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);

//Test de connexion
app.get("/", (req, res) => {
  res.send("API opérationnelle !");
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
