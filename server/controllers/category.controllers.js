import * as Categories from "../models/Categories.js";

export async function listCategories(req, res) {
  try {
    const categories = await Categories.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.log(err);
    res.status(500).send("Erreur de serveur");
  }
}

export async function addCategorie(req, res) {
  const { name } = req.body;
  try {
    await Categories.createCategorie(name);
    res.status(201).send("Catégorie créée avec succès");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
}

export async function putCategorie(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await Categories.modifyCategory(id, name);

    res.status(201).send("Catégorie modifiée avec succès");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
}

export async function deleteCategorie(req, res) {
  const { id } = req.params;
  try {
    await Categories.deleteCategorie(id);

    res.status(201).send("Catégorie supprimée avec succès");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
}

export async function getCategorieById(req, res) {
  const { id } = req.params;
  try {
    const [rows] = await Categories.getCategorieById(id);
    if (!rows.length)
      return res.status(404).json({ error: "Catégorie non trouvée" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
}
