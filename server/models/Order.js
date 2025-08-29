import pool from "../config/db.js";

export const insertOrder = async (customerId, shippingType, orderAmount) => {
  const [result] = await pool.execute(
    "INSERT INTO orders (customer_id, shipping_type,order_amount) VALUES(?,?,?)",
    [customerId, shippingType, orderAmount]
  );
  return result.insertId;
};

export const insertOrderItem = async (orderId, productId, quantity, price) => {
  await pool.execute(
    "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?,?,?,?)",
    [orderId, productId, quantity, price]
  );
};

export const getOrdersByUserId = async (customerId) => {
  const [rows] = await pool.execute(
    "SELECT * FROM orders WHERE customer_id = ?",
    [customerId]
  );
  return rows;
};

export const getItemsByOrderId = async (orderId) => {
  const [rows] = await pool.execute(
    "SELECT * FROM order_items WHERE order_id = ?",
    [orderId]
  );
  return rows;
};
