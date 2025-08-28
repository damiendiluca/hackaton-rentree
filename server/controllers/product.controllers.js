import * as Products from "../models/Product.js";

export async function listProducts(req, res) {
  try {
    const [products] = await Products.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.log(err);
    res.status(500).send("Erreur de serveur");
  }
}

export async function addProduct(req, res) {
  const { name, seller, stock_quantity, price, description, category_id } =
    req.body;
  try {
    await Products.createProducts(
      name,
      seller,
      stock_quantity,
      price,
      description,
      category_id
    );
    res.status(201).send("Produit créé avec succès");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
}

export async function putProduct(req, res) {
  const { id } = req.params;
  const { name, seller, stock_quantity, price, description, category_id } =
    req.body;
  try {
    await Products.modifyProduct(
      name,
      seller,
      stock_quantity,
      price,
      description,
      category_id,
      id
    );

    res.status(201).send("Produit modifié avec succès");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
}

export async function deleteProduct(req, res) {
  const { id } = req.params;
  const { name, seller, stock_quantity, price, description, category_id } =
    req.body;
  try {
    await Products.deleteProduct(
      id,
      name,
      seller,
      stock_quantity,
      price,
      description,
      category_id
    );

    res.status(201).send("Produit supprimé avec succès");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
}

export async function getProductById(req, res) {
  const { id } = req.params;
  try {
    const [rows] = await Products.getProductById(id);
    if (!rows.length)
      return res.status(404).json({ error: "Produit non trouvé" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
}
