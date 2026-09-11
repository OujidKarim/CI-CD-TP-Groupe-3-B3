import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MyUser } from "../../contexts/Users";
import logoImg from "../../assets/images/logo.png";
import './Header.css';

function Header() {
  const { user, logout } = useContext(MyUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isLoggedIn = Boolean(user && user.email);

  return (
    <header className="header">
      <div className="headerLeft">
        <NavLink to="/" className="headerBrand">
          <figure className="headerPicture">
            <img src={logoImg} alt="ReactDex Logo" />
          </figure>
          <span className="headerTitle">React<span className="brandHighlight">Dex</span></span>
        </NavLink>

        <nav className="headerNav">
          <NavLink
            className={({ isActive }) => `headerLink ${isActive ? 'active' : ''}`}
            to="/"
          >
            Accueil
          </NavLink>
          <NavLink
            className={({ isActive }) => `headerLink ${isActive ? 'active' : ''}`}
            to="/deck"
          >
            Mes Decks
          </NavLink>
        </nav>
      </div>

      <div className="headerActions">
        {isLoggedIn ? (
          <div className="headerUser">
            <div className="userBadge">
              <span className="userIcon">⚡</span>
              <span className="userName">{user.name || 'Dresseur'}</span>
            </div>
            <button className="logoutBtn" onClick={handleLogout} title="Se déconnecter">
              Déconnexion
            </button>
          </div>
        ) : (
          <div className="headerAuth">
            <NavLink to="/form/signin" className="signInBtn">
              Connexion
            </NavLink>
            <NavLink to="/form/signup" className="signUpBtn">
              Inscription
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;