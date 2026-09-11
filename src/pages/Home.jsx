import { useContext } from "react";
import { NavLink } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import SearchBar from "../components/searchbar/Searchbar";
import { MyUser } from "../contexts/Users";
import logoImg from "../assets/images/logo.png";
import deckImg from "../assets/images/deck.jpeg";

function Home() {
  const { user } = useContext(MyUser);
  const isLoggedIn = Boolean(user && user.email);

  return (
    <div className="homePage">
      <Header />

      <main className="homeMain">
        {/* Hero Section */}
        <section className="heroSection">
          <div className="heroContent">
            <figure className="heroLogo">
              <img src={logoImg} alt="Logo ReactDex" />
            </figure>
            <div className="heroBadge">
              <span className="badgeDot"></span>
              Constructeur de Deck Pokémon TCG
            </div>
            <h1 className="heroTitle">
              Créez, personnalisez et maîtrisez vos <span className="highlightText">Decks Pokémon</span>
            </h1>
            <p className="heroSubtitle">
              Accédez à toutes les cartes et extensions officielles via l'API TCGdex.
              Assemblez vos meilleures stratégies et constituez la collection ultime.
            </p>

            <div className="heroActions">
              <NavLink
                to={isLoggedIn ? "/deck" : "/form/signup"}
                className="btnPrimary"
              >
                ⚡ {isLoggedIn ? "Créer un deck" : "Commencer l'aventure"}
              </NavLink>
              <NavLink
                to={isLoggedIn ? "/deck" : "/form/signin"}
                className="btnSecondary"
              >
                🃏 Voir mes decks
              </NavLink>
            </div>
          </div>
        </section>

        {/* Quick Access Cards */}
        <section className="featuresSection">
          <div className="featuresContainer">
            <div className="featureCard">
              <div className="featureInfo">
                <span className="featureTag">Atelier Stratégique</span>
                <h3>Construisez vos Decks</h3>
                <p>Composez vos decks Pokémon sur mesure avec vos cartes favorites et gérez vos listes en un clic.</p>
                <NavLink
                  to={isLoggedIn ? "/deck" : "/form/signup"}
                  className="featureLink"
                >
                  Créer un deck →
                </NavLink>
              </div>
              <figure className="featurePicture">
                <img src={deckImg} alt="Cartes Pokémon en éventail" />
              </figure>
            </div>

            <div className="featureCard">
              <div className="featureInfo">
                <span className="featureTag">Collection Personnelle</span>
                <h3>Consultez vos Decks</h3>
                <p>Visualisez la composition de vos decks, leurs statistiques et ajustez votre composition à tout moment.</p>
                <NavLink
                  to={isLoggedIn ? "/deck" : "/form/signin"}
                  className="featureLink"
                >
                  Voir ses decks →
                </NavLink>
              </div>
              <figure className="featurePicture">
                <img src={deckImg} alt="Cartes Pokémon" />
              </figure>
            </div>
          </div>
        </section>

        {/* Card Explorer Section */}
        <section className="explorerSection">
          <div className="explorerHeader">
            <h2 className="explorerTitle">Explorez le Pokédex des Cartes</h2>
            <p className="explorerSubtitle">
              Recherchez parmi des milliers de cartes Pokémon officielles et inspectez leurs détails.
            </p>
          </div>
          <SearchBar />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;