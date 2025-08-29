import express from "express";
import "dotenv/config";
import pool from "./config/db.js";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import orderRoutes from "./routes/order.routes.js";
import Stripe from "stripe";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


//Test de connexion
app.get("/", (req, res) => {
  res.send("API opérationnelle !");
});

app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/orders", orderRoutes);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
