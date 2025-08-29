import express from "express";
import { createOrder } from "../controllers/order.controllers.js";

const router = express.Router();

router.post("/checkout", createOrder);

// Success / cancel pour simulation
router.get("/success", (req, res) => {
    res.send(`Paiement réussi pour la commande ${req.query.orderId}`);
  });
  router.get("/cancel", (req, res) => {
    res.send("Paiement annulé");
  });
  
  export default router;
