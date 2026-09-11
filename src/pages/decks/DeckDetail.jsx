import { useState, useEffect, useContext, useMemo } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { DeckContext } from "../../contexts/DeckContext";
import SearchBar from "../../components/searchbar/Searchbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { MyUser } from "../../contexts/Users";
import "./DeckDetail.css";

export default function DeckDetail() {
  const { user } = useContext(MyUser);
  const { decks, addCardToDeck, removeCardFromDeck, setCurrentDeck } = useContext(DeckContext);
  const [popup, setPopup] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  // Redirige vers signin si déconnecté
  useEffect(() => {
    if (!user || !user.email) {
      navigate("/form/signin");
    }
  }, [user, navigate]);

  // Trouve le deck actuel
  const deck = useMemo(() => {
    return decks.find((d) => String(d.id) === String(id)) || null;
  }, [decks, id]);

  // Synchronise le deck courant dans le contexte
  useEffect(() => {
    if (deck) {
      setCurrentDeck(deck);
    }
  }, [deck, setCurrentDeck]);

  // Fermer la modale avec la touche Échap
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && popup) {
        setPopup(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [popup]);

  // Statistiques du deck
  const stats = useMemo(() => {
    if (!deck || !Array.isArray(deck.cards)) {
      return { total: 0, pokemon: 0, trainer: 0, energy: 0 };
    }
    const cards = deck.cards;
    const pokemon = cards.filter((c) => !c.category || c.category === "Pokémon" || c.category === "Pokemon").length;
    const trainer = cards.filter((c) => c.category === "Dresseur" || c.category === "Trainer").length;
    const energy = cards.filter((c) => c.category === "Énergie" || c.category === "Energy").length;
    return {
      total: cards.length,
      pokemon,
      trainer,
      energy
    };
  }, [deck]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2000);
  };

  const handleAddCard = (card) => {
    if (deck) {
      addCardToDeck(deck.id, card);
      showToast(`+ "${card.name}" ajouté au deck !`);
    }
  };

  const handleRemoveCard = (cardIndex, cardName) => {
    if (deck) {
      removeCardFromDeck(deck.id, cardIndex);
      showToast(`"${cardName}" retiré du deck.`);
    }
  };

  if (!deck) {
    return (
      <div className="deckDetailPage">
        <Header />
        <main className="deckDetailMain">
          <div className="deckNotFound">
            <h2>Deck introuvable</h2>
            <p>Ce deck n'existe pas ou a été supprimé.</p>
            <NavLink to="/deck" className="backToDecksBtn">
              ← Retour à mes decks
            </NavLink>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="deckDetailPage">
      <Header />

      {toastMessage && <div className="deckToast">{toastMessage}</div>}

      <main className="deckDetailMain">
        {/* Navigation & Header */}
        <div className="deckDetailNav">
          <NavLink to="/deck" className="backToDecksLink">
            ← Retour à mes decks
          </NavLink>
        </div>

        <div className="deckHeroCard">
          <div className="deckHeroInfo">
            <span className="deckHeroBadge">Deck Pokémon</span>
            <h1 className="deckHeroTitle">{deck.name}</h1>
            <div className="deckStatsRow">
              <span className="statChip total">
                <strong>{stats.total}</strong> / 60 Cartes
              </span>
              <span className="statChip pokemon">
                🐾 <strong>{stats.pokemon}</strong> Pokémon
              </span>
              <span className="statChip trainer">
                🎒 <strong>{stats.trainer}</strong> Dresseurs
              </span>
              <span className="statChip energy">
                ⚡ <strong>{stats.energy}</strong> Énergies
              </span>
            </div>
          </div>

          <div className="deckHeroActions">
            <button
              type="button"
              className="addCardsTriggerBtn"
              onClick={() => setPopup(true)}
            >
              + Ajouter des cartes
            </button>
          </div>
        </div>

        {/* Cards in Deck */}
        <section className="deckCardsSection">
          <div className="deckCardsHeader">
            <h2>Composition du Deck ({stats.total} cartes)</h2>
          </div>

          {stats.total === 0 ? (
            <div className="emptyDeckCards">
              <span className="emptyCardsIcon">🃏</span>
              <h3>Votre deck est vide</h3>
              <p>Cliquez sur le bouton "Ajouter des cartes" pour rechercher des cartes Pokémon et compléter votre stratégie.</p>
              <button
                type="button"
                className="addCardsTriggerBtn"
                onClick={() => setPopup(true)}
              >
                + Ajouter des cartes
              </button>
            </div>
          ) : (
            <div className="deckCardsGrid">
              {deck.cards.map((card, index) => {
                const cardImg = card.image ? `${card.image}/low.webp` : null;

                return (
                  <div key={`${card.id}-${index}`} className="deckCardItem">
                    <div
                      className="deckCardClickable"
                      onClick={() =>
                        navigate(`/card/${card.id}`, {
                          state: { fromDeck: deck.id }
                        })
                      }
                      title={`Voir les détails de ${card.name}`}
                    >
                      <div className="deckCardImgFrame">
                        {cardImg ? (
                          <img
                            src={cardImg}
                            alt={card.name}
                            loading="lazy"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        ) : (
                          <div className="deckCardPlaceholder">
                            <span>🃏</span>
                          </div>
                        )}
                      </div>
                      <span className="deckCardName">{card.name}</span>
                    </div>

                    <button
                      type="button"
                      className="removeCardBtn"
                      onClick={() => handleRemoveCard(index, card.name)}
                      title="Retirer cette carte"
                    >
                      ✕ Retirer
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* Modal / Popup for Adding Cards */}
      {popup && (
        <div className="modalOverlay" onClick={() => setPopup(false)}>
          <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <div>
                <h2>Ajouter une carte à « {deck.name} »</h2>
                <p className="modalSub">Cliquez sur « Ajouter » pour insérer la carte dans votre deck.</p>
              </div>
              <button
                className="modalCloseBtn"
                type="button"
                onClick={() => setPopup(false)}
                title="Fermer"
              >
                ✕
              </button>
            </div>

            <div className="modalBody">
              <SearchBar
                onCardClick={handleAddCard}
                showAddButton={true}
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

