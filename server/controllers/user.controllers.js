import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {
    findUserByEmail,
    createUser,
    getAllUsers,
    updateUser,
    deleteUser as deleteUserModel
} from "../models/User.js"

// Traitement de l'inscription
export async function register(req, res) {
    const { first_name, email, password } = req.body;

    if (!first_name || !email || !password) {
        return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: "Cet email est déjà utilisé." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = await createUser({ first_name, email, password: hashedPassword });

        return res.status(201).json({ message: "Utilisateur créé avec succès", userId });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erreur serveur" });
    }
}

// Traitement de la connexion
export async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    try {
        const user = await findUserByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: "Email ou mot de passe incorrect." });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
        return res.json({ message: "Connexion réussie", token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erreur serveur" });
    }
}

// Affiche le profil (nécessite d'être connecté)
export async function showProfile(req, res) {
    return res.json({ user: req.user });
}

// Met à jour le profil (nom, email...)
export async function updateProfile(req, res) {
    const { first_name, email, role } = req.body;

    try {
        await updateUser(req.user.id, first_name, email, role);
        return res.json({ message: "Profil mis à jour avec succès." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erreur serveur" });
    }
}

// Déconnecte l'utilisateur
export async function logout(req, res) {
    res.clearCookie("token");
    return res.json({ message: "Déconnexion réussie." });
}

// Supprime le compte de l'utilisateur connecté
export async function deleteAccount(req, res) {
    try {
        await deleteUserModel(req.user.id);
        return res.json({ message: "Compte supprimé avec succès." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erreur serveur" });
    }
}

// Liste tous les utilisateurs (admin uniquement)
export async function listUsers(req, res) {
    try {
        const users = await getAllUsers();
        return res.json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erreur serveur" });
    }
}

// Modifie un utilisateur par son ID (admin uniquement)
export async function modifyUser(req, res) {
    const { first_name, email, role } = req.body;

    try {
        await updateUser(req.params.id, first_name, email, role);
        return res.json({ message: "Utilisateur mis à jour avec succès." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erreur serveur" });
    }
}

// Supprime un utilisateur par son ID (admin uniquement)
export async function deleteUser(req, res) {
    try {
        await deleteUserModel(req.params.id);
        return res.json({ message: "Utilisateur supprimé avec succès." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erreur serveur" });
    }
}

// Middleware admin
export function isAdmin(req, res, next) {
    if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Accès refusé." });
    }
    next();
}
