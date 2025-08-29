import * as Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  const { customerId, items, shippingType } = req.body;
  if (!items || !items.length)
    return res.status(400).json({ error: "Panier vide" });

  try {
  } catch (error) {}
};
