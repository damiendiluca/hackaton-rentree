import * as Order from "../models/Order.js";
import { getShippingCost } from "../utils/shipping.js";
import Stripe from "stripe";
import "dotenv/config";

const CLIENT_URL = process.env.CLIENT_URL;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createOrder = async (req, res) => {
  try {
    //const userId = req.userId || 4;
    const { items, shippingType } = req.body;
    console.log("test1");

    if (!items || !items.length)
      return res.status(400).json({ error: "Panier vide" });

    const itemsAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const shippingCost = getShippingCost(shippingType);
    const orderAmount = itemsAmount + shippingCost;

    console.log({ userId: req.userId, shippingType, orderAmount });

    const orderId = await Order.insertOrder(
      //userId,
      req.userId,
      shippingType,
      orderAmount
    );

    for (const item of items) {
      await Order.insertOrderItem(orderId, item.id, item.quantity, item.price);
    }

    //Session stripe
    const session = await stripe.checkout.sessions.create({
      line_items: items.map((item) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100), //prix unitaire en centimes (ou dans la plus petite unité de la devise), il faut que ce soit un entier
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: shippingType,
            fixed_amount: {
              amount: Math.round(shippingCost * 100),
              currency: "eur",
            },
            type: "fixed_amount",
          },
        },
      ],
      success_url: `${CLIENT_URL}/checkout/success?orderId=${orderId}`,
      cancel_url: `${CLIENT_URL}/checkout/cancel`,
    });

    res.status(201).json({
      message: "Commande créée avec succès",
      orderId,
      stripeUrl: session.url,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
