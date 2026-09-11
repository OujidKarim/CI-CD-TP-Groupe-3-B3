import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useLocation, NavLink } from "react-router-dom";
import { DeckContext } from "../../contexts/DeckContext";
import { MyUser } from "../../contexts/Users";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./CardDetail.css";

function CardDetail() {
  const { id } = useParams();
  const { user } = useContext(MyUser);
  const { decks, addCardToDeck } = useContext(DeckContext);
  const [card, setCard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeckModal, setShowDeckModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const url = `https://api.tcgdex.net/v2/fr/cards/${id}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Impossible de charger les détails de cette carte.");
        }
        return response.json();
      })
      .then((data) => {
        setCard(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [id]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2200);
  };

  const handleOpenAddModal = () => {
    if (!user || !user.email) {
      navigate("/form/signin");
      return;
    }
    if (decks.length === 0) {
      if (window.confirm("Vous n'avez pas encore de deck. Voulez-vous en créer un maintenant ?")) {
        navigate("/deck");
      }
      return;
    }
    // Si l'utilisateur vient d'un deck précis et qu'il n'y en a qu'un, ou pour lui permettre de choisir
    setShowDeckModal(true);
  };

  const handleAddCardToSpecificDeck = (deckId, deckName) => {
    if (card) {
      addCardToDeck(deckId, card);
      setShowDeckModal(false);
      showToast(`+ "${card.name}" ajouté au deck "${deckName}" !`);
    }
  };

  const handleBack = () => {
    if (location.state?.fromDeck) {
      navigate(`/deck/${location.state.fromDeck}`);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="cardDetailPage">
      <Header />

      {toastMessage && <div className="cardToast">{toastMessage}</div>}

      <main className="cardDetailMain">
        <div className="cardDetailNav">
          <button className="backBtn" onClick={handleBack} type="button">
            ← Retour
          </button>
        </div>

        {isLoading ? (
          <div className="cardLoading">
            <div className="pokeballSpinner"></div>
            <p>Chargement des données de la carte...</p>
          </div>
        ) : error ? (
          <div className="cardError">
            <span className="errorIcon">⚠️</span>
            <h2>Erreur</h2>
            <p>{error}</p>
            <NavLink to="/" className="errorBackBtn">
              Retour à l'accueil
            </NavLink>
          </div>
        ) : card ? (
          <div className="cardDetailContainer">
            {/* Left column: Card visual */}
            <div className="cardVisualCol">
              <div className="cardVisualFrame">
                {card.image ? (
                  <img
                    src={`${card.image}/high.webp`}
                    alt={card.name}
                    onError={(e) => {
                      // Fallback to low-res
                      if (!e.target.dataset.triedLow) {
                        e.target.dataset.triedLow = "true";
                        e.target.src = `${card.image}/low.webp`;
                      } else {
                        e.target.style.display = "none";
                        if (e.target.nextSibling) {
                          e.target.nextSibling.style.display = "flex";
                        }
                      }
                    }}
                  />
                ) : null}
                <div
                  className="cardVisualFallback"
                  style={{ display: card.image ? "none" : "flex" }}
                >
                  <span>🃏</span>
                  <p>{card.name}</p>
                </div>
              </div>

              <button
                type="button"
                className="addToDeckMainBtn"
                onClick={handleOpenAddModal}
              >
                + Ajouter à un deck
              </button>
            </div>

            {/* Right column: Card details & Stats */}
            <div className="cardInfoCol">
              <div className="cardHeader">
                <div className="cardTitleGroup">
                  <span className="cardCategory">
                    {card.category || "Pokémon"}
                    {card.stage ? ` • ${card.stage}` : ""}
                  </span>
                  <h1 className="cardMainName">{card.name}</h1>
                </div>

                <div className="cardHeaderMeta">
                  {card.hp && (
                    <div className="cardHpBadge">
                      <span className="hpLabel">PV</span>
                      <span className="hpValue">{card.hp}</span>
                    </div>
                  )}

                  {Array.isArray(card.types) && card.types.length > 0 && (
                    <div className="cardTypesList">
                      {card.types.map((type, idx) => (
                        <span key={idx} className={`typeBadge type-${type.toLowerCase()}`}>
                          {type}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Set & Illustrator metadata */}
              <div className="cardMetaGrid">
                {card.set && (
                  <div className="metaItem">
                    <span className="metaLabel">Extension</span>
                    <span className="metaValue">
                      {card.set.name}{" "}
                      {card.localId ? `(${card.localId}/${card.set.cardCount?.official || '?'})` : ""}
                    </span>
                  </div>
                )}
                {card.rarity && (
                  <div className="metaItem">
                    <span className="metaLabel">Rareté</span>
                    <span className="metaValue">{card.rarity}</span>
                  </div>
                )}
                {card.illustrator && (
                  <div className="metaItem">
                    <span className="metaLabel">Illustrateur</span>
                    <span className="metaValue">{card.illustrator}</span>
                  </div>
                )}
                {card.retreat !== undefined && card.retreat !== null && (
                  <div className="metaItem">
                    <span className="metaLabel">Coût de retraite</span>
                    <span className="metaValue">
                      {card.retreat > 0 ? `${card.retreat} Énergie(s)` : "Gratuit"}
                    </span>
                  </div>
                )}
              </div>

              {/* Description / Effect for Trainer or Pokémon */}
              {(card.description || card.effect) && (
                <div className="cardDescriptionBox">
                  <span className="boxTitle">Description</span>
                  <p>{card.description || card.effect}</p>
                </div>
              )}

              {/* Attacks */}
              {Array.isArray(card.attacks) && card.attacks.length > 0 && (
                <div className="cardAttacksSection">
                  <h3 className="sectionTitle">Attaques</h3>
                  <div className="attacksList">
                    {card.attacks.map((attack, i) => (
                      <div key={i} className="attackCard">
                        <div className="attackTop">
                          <div className="attackCostName">
                            {Array.isArray(attack.cost) && attack.cost.length > 0 && (
                              <div className="energyCostRow">
                                {attack.cost.map((c, ci) => (
                                  <span key={ci} className="energyPill" title={c}>
                                    {c}
                                  </span>
                                ))}
                              </div>
                            )}
                            <h4 className="attackName">{attack.name}</h4>
                          </div>
                          {attack.damage !== undefined && attack.damage !== null && attack.damage !== "" && (
                            <span className="attackDamageBadge">{attack.damage}</span>
                          )}
                        </div>
                        {(attack.effect || attack.text) && (
                          <p className="attackDesc">{attack.effect || attack.text}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Weaknesses & Resistances */}
              {((Array.isArray(card.weaknesses) && card.weaknesses.length > 0) ||
                (Array.isArray(card.resistances) && card.resistances.length > 0)) && (
                <div className="combatStatsGrid">
                  {Array.isArray(card.weaknesses) && card.weaknesses.length > 0 && (
                    <div className="combatStatBox">
                      <span className="combatStatLabel">Faiblesse</span>
                      <div className="combatStatList">
                        {card.weaknesses.map((w, idx) => (
                          <span key={idx} className="statPill weakness">
                            {w.type} {w.value}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {Array.isArray(card.resistances) && card.resistances.length > 0 && (
                    <div className="combatStatBox">
                      <span className="combatStatLabel">Résistance</span>
                      <div className="combatStatList">
                        {card.resistances.map((r, idx) => (
                          <span key={idx} className="statPill resistance">
                            {r.type} {r.value}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </main>

      {/* Select Deck Modal */}
      {showDeckModal && (
        <div className="modalOverlay" onClick={() => setShowDeckModal(false)}>
          <div className="deckModalCard" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <div>
                <h2>Ajouter à un deck</h2>
                <p className="modalSub">Choisissez le deck de destination pour {card?.name}</p>
              </div>
              <button
                className="modalCloseBtn"
                type="button"
                onClick={() => setShowDeckModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="deckModalBody">
              {decks.length === 0 ? (
                <p className="noDecksNotice">
                  Vous n'avez aucun deck pour le moment.
                </p>
              ) : (
                <ul className="modalDecksList">
                  {decks.map((deck) => (
                    <li key={deck.id}>
                      <button
                        type="button"
                        className="modalDeckOptionBtn"
                        onClick={() => handleAddCardToSpecificDeck(deck.id, deck.name)}
                      >
                        <div className="modalDeckInfo">
                          <span className="modalDeckName">{deck.name}</span>
                          <span className="modalDeckCount">
                            {deck.cards?.length || 0} carte{(deck.cards?.length || 0) > 1 ? "s" : ""}
                          </span>
                        </div>
                        <span className="modalAddArrow">+ Ajouter</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default CardDetail;

