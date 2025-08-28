import pool from "../config/db.js";

export async function getAllCategories() {
  const [rows] = await pool.query("SELECT * FROM categories");
  return rows;
}

export const createCategorie = (name) => {
  return pool.query("INSERT INTO categories (name) VALUES (?)", [name]);
};

export const getCategorieById = (id) => {
  return pool.query("SELECT * FROM categories WHERE id = ?", [id]);
};

export const modifyCategory = (id, name) => {
  return pool.query("UPDATE categories SET name=? WHERE id=?", [name, id]);
};

export const deleteCategorie = (id) => {
  return pool.query("DELETE FROM categories WHERE id = ?", [id]);
};
