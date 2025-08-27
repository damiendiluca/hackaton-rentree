import pool from "../config/db.js";

export const createProducts = (
  // Ce que nous allons insérer dans la base de données
  name,
  seller,
  quantity,
  price,
  description,
  category_id
) => {
  return pool.query(
    // L'endroit ou nous allons l'insérer
    "INSERT INTO products (name, seller, quantity, price, description, category_id) VALUES (?, ?, ?, ?, ?, ?)",
    // Sauvegarde la valeur qui a été définie
    [name, seller, quantity, price, description, category_id]
  );
};

export const getAllProducts = () => {
  return pool.query(
    `SELECT products.*, categories.nom AS category
       FROM products
       LEFT JOIN categories ON products.category_id = categories.id`
  );
};

export const getProductById = (id) => {
  return pool.query("SELECT * FROM products WHERE id = ?", [id]);
};

export const updateProducts = (
  id,
  name,
  seller,
  quantity,
  price,
  description,
  category_id
) => {
  return pool.query(
    "UPDATE products SET name=?, seller=?, quantity=?, price=?, description=?, category_id=?, WHERE id=?",
    [id, name, seller, quantity, price, description, category_id]
  );
};

export const deleteProducts = (id) => {
  return pool.query("DELETE FROM products WHERE id = ?", [id]);
};
