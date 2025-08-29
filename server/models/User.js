import pool from "../config/db.js"

// Recherche un utilisateur par son email
export async function findUserByEmail(email) {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
}

// Vérification si un utilisateur existe avec son nom
export async function findUserByName(name) {
    const [rows] = await pool.query("SELECT * FROM users WHERE name = ?", [name]);
    return rows[0];
}

// Crée un nouvel utilisateur dans la base de données
export async function createUser({
    first_name,
    email,
    password,
    role = "customer"
}) {
    const [result] = await pool.query(
        "INSERT INTO users (first_name, email, password, role) VALUES (?, ?, ?, ?)",
        [first_name, email, password, role]
    )
    return result.insertId;
}

// Recherche un utilisateur par son ID (utile pour afficher ou modifier un profil)
export async function updateUser(id, first_name, email, role) {
    const [result] = await pool.query(
        "UPDATE users SET first_name = ?, email = ?, role = ? WHERE id = ?",
        [first_name, email, role, id]
    )

    // Affiche un message selon si une modification a été faite ou non
    if (result.affectedRows === 0) {
        console.log("Ancun utilisateur trouvé ou aucune modification effectuée.");        
    } else {
        console.log(
            `Utilisateur mis à jour. Lignes modifiées : ${result.affectedRows}`
        );
    }
}

// Met à jour partiellement un utilisateur (seulement les champs fournis seront modifiés)
export async function updateUserPartial(
    id,
    { first_name = null, email = null, role = null }
) {
    const fields = []
    const values = []

      // Ajoute dynamiquement les champs à modifier
      if (first_name !== null) {
        fields.push("first_name = ?")
        values.push(first_name)
      }
      if (email !== null) {
        fields.push("email = ?")
        values.push(email)
      }
      if (role !== null) {
        fields.push("role = ?")
        values.push(role)
      }

    // Si aucun champ à modifier, on arrête la fonction
    if (fields.length === 0) {
        console.log("Aucune donnée à mettre à jour.");
        return        
    }

    // Prépare et exécute la requête SQL avec les champs à modifier
    const sql = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`
    values.push(id)

    const [result] = await pool.query(sql, values)

    if (result.affectedRows === 0) {
        console.log("Aucun utilisateur trouvé ou aucune modification effectuée.");        
    } else {
        console.log(
            `Utilisateur mis à jour partiellement. Lignes modifiées : ${result.affectedRows}`
        );
    }
}

// Supprime un utilisateur par son ID
export async function deleteUser(id) {
    await pool.query("DELETE FROM users WHERE id = ?", [id])
}

// Récupère tous les utilisateurs de la base (ex. pour une vue admin)
export async function getAllUsers() {
    const [rows] = await pool.query("SELECT * FROM users")
    return rows
}
