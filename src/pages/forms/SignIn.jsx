import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MyUser } from "../../contexts/Users";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import './Forms.css';

function SignIn() {
  const { user, login } = useContext(MyUser);
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

    if (!email.trim()) {
      setError("Veuillez saisir votre adresse email.");
      return;
    }
    if (!password) {
      setError("Veuillez renseigner votre mot de passe.");
      return;
    }

    setLoading(true);
    const result = login(email.trim(), password);
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
            <h1>Connexion Dresseur</h1>
            <p className="formSubtitle">Accédez à votre collection et vos decks Pokémon</p>
          </div>

          {error && <div className="formAlert">{error}</div>}

          <form onSubmit={handleSubmit} className="authForm" noValidate>
            <div className="formGroup">
              <label htmlFor="email">Adresse email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sacha@kanto.fr"
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
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </div>

            <button type="submit" className="formSubmitBtn" disabled={loading}>
              {loading ? "Connexion en cours..." : "SE CONNECTER"}
            </button>
          </form>

          <div className="formFooter">
            <p>
              Pas encore de compte ?{" "}
              <NavLink to="/form/signup" className="formSwitchLink">
                Créer un compte dresseur
              </NavLink>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SignIn;