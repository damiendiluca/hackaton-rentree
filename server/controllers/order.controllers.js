import * as Order from "../models/Order.js";
import { getShippingCost } from "../utils/shipping.js";

export const createOrder = async (req, res) => {
  try {
    const { items, shippingType } = req.body;
    if (!items || !items.length)
      return res.status(400).json({ error: "Panier vide" });

    const itemsAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const shippingCost = getShippingCost(shippingType);
    const orderAmount = itemsAmount + shippingCost;

    const orderId = await Order.insertOrder(
      req.userId,
      shippingType,
      orderAmount
    );
    for (const item of items) {
      await Order.insertOrderItem(orderId, item.id, item.quantity, item.price);
    }
    res
      .status(201)
      .json({ message: "Commande créée avec succès", orderId, orderAmount });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};
