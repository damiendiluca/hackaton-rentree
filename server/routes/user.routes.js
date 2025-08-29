import express from"express"

import {
    // showLoginForm,
    login,
    //showRegisterForm,
    register,
    showProfile,
    updateProfile,
    logout,
    deleteAccount,
    listUsers,
    modifyUser,
    deleteUser,
} from "../controllers/user.controllers.js"

import { protect } from "../middlewares/auth.middleware.js"
import { isAdmin } from "../controllers/user.controllers.js"

const router = express.Router()

// ---------- AUTHENTIFICATION --------- //

// Affichage du formulaire de connexion
// router.get("/login", showLoginForm)
// Traitement de la connexion
router.post("/login", login)

// Affichage du formulaire d'inscription
// router.get("/register", showRegisterForm)
// Traitement de l'inscription
router.post("/register", register)

// Déconnecte l'utilisateur
router.get("/logout", logout)

// ---------- PROFIL UTILISATEUR --------- //

// Affiche le profil (nécessite d'être connecté)
router.get("/profile",protect, showProfile)
// Met à jour le profil(nom, email...)
router.post("/profile", protect, updateProfile)

// Supprime le compte de l'utilisateur connecté
router.delete("/delete", protect, deleteAccount)

// ---------- FONCTIONNALITÉS ADMIN --------- //

//Liste tous les utilisateurs (admin uniquement)
router.get("/users", protect, isAdmin, listUsers)

// Modifie un utilisateur par son ID (admin uniquement)
router.put("/modify/:id", protect, isAdmin, modifyUser)

// Supprime un utilisateur par son ID (admin uniquement)
router.delete("/delete/:id", protect, isAdmin, deleteUser)

// Export du routeur pour utilisation dans app.js
export default router