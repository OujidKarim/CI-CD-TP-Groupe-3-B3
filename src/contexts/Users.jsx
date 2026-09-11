import { createContext, useState, useEffect } from "react";

const MyUser = createContext();

function Users({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("currentUser");
      return savedUser ? JSON.parse(savedUser) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      if (user && user.email) {
        localStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        localStorage.removeItem("currentUser");
      }
    } catch (e) {
      console.error("Erreur sauvegarde currentUser:", e);
    }
  }, [user]);

  const login = (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const found = users.find((u) => u.email === email);
      if (!found) {
        return { success: false, error: "Aucun compte trouvé avec cet email" };
      }
      if (found.password !== password) {
        return { success: false, error: "Mot de passe incorrect" };
      }
      if (!Array.isArray(found.decks)) {
        found.decks = [];
      }
      setUser(found);
      localStorage.setItem("currentUser", JSON.stringify(found));
      return { success: true };
    } catch (e) {
      return { success: false, error: "Erreur lors de la connexion: " + e.message };
    }
  };

  const register = (name, email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        return { success: false, error: "Un compte avec cet email existe déjà" };
      }
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        decks: []
      };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      setUser(newUser);
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      return { success: true };
    } catch (e) {
      return { success: false, error: "Erreur lors de l'inscription: " + e.message };
    }
  };

  const logout = () => {
    setUser({});
    localStorage.removeItem("currentUser");
  };

  const updateUser = (updatedUser) => {
    try {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const index = users.findIndex((u) => u.email === updatedUser.email);
      if (index !== -1) {
        users[index] = updatedUser;
        localStorage.setItem("users", JSON.stringify(users));
      }
      setUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    } catch (e) {
      console.error("Erreur mise à jour utilisateur:", e);
    }
  };

  return (
    <MyUser.Provider value={{ user, setUser, login, register, logout, updateUser }}>
      {children}
    </MyUser.Provider>
  );
}

export { MyUser, Users };

