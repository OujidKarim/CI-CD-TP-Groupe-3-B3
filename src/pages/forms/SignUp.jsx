import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MyUser } from "../../contexts/Users";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import './Forms.css';

function SignUp() {
  const { user, register } = useContext(MyUser);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.email) {
      navigate('/deck');
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setError("Veuillez saisir votre nom de dresseur.");
      return;
    }
    if (!trimmedEmail) {
      setError("Veuillez saisir une adresse email valide.");
      return;
    }
    if (!password || password.length < 4) {
      setError("Le mot de passe doit contenir au moins 4 caractères.");
      return;
    }

    setLoading(true);
    const result = register(trimmedName, trimmedEmail, password);
    setLoading(false);

    if (result.success) {
      navigate('/deck');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="authPage">
      <Header />
      <div className="formOverlay">
        <div className="formCard">
          <div className="formHeader">
            <span className="formPokeball"></span>
            <h1>Rejoindre l'Aventure</h1>
            <p className="formSubtitle">Créez votre profil de dresseur et bâtissez vos decks</p>
          </div>

          {error && <div className="formAlert">{error}</div>}

          <form onSubmit={handleSubmit} className="authForm" noValidate>
            <div className="formGroup">
              <label htmlFor="name">Nom de dresseur</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Red, Ondine, Pierre..."
                autoComplete="name"
                required
              />
            </div>

            <div className="formGroup">
              <label htmlFor="email">Adresse email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="dresseur@pokemon.fr"
                autoComplete="email"
                required
              />
            </div>

            <div className="formGroup">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Au moins 4 caractères"
                autoComplete="new-password"
                required
              />
            </div>

            <button type="submit" className="formSubmitBtn" disabled={loading}>
              {loading ? "Création du profil..." : "S'INSCRIRE"}
            </button>
          </form>

          <div className="formFooter">
            <p>
              Vous avez déjà un compte ?{" "}
              <NavLink to="/form/signin" className="formSwitchLink">
                Se connecter
              </NavLink>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SignUp;