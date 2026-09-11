import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeckContext } from "../../contexts/DeckContext";
import { MyUser } from '../../contexts/Users';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import './DeckBuilder.css';

export default function DeckBuilder() {
  const navigate = useNavigate();
  const { user } = useContext(MyUser);
  const { decks, createDeck, deleteDeck, setCurrentDeck } = useContext(DeckContext);
  const [deckName, setDeckName] = useState('');
  const [createError, setCreateError] = useState('');

  useEffect(() => {
    if (!user || !user.email) {
      navigate('/form/signin');
    }
  }, [user, navigate]);

  const handleCreateDeck = (e) => {
    e.preventDefault();
    setCreateError('');

    if (!deckName.trim()) {
      setCreateError("Veuillez donner un nom à votre deck.");
      return;
    }

    const newDeck = createDeck(deckName.trim());
    if (newDeck) {
      setDeckName('');
      setCurrentDeck(newDeck);
      navigate(`/deck/${newDeck.id}`);
    }
  };

  const handleOpenDeck = (deck) => {
    setCurrentDeck(deck);
    navigate(`/deck/${deck.id}`);
  };

  const handleDeleteDeck = (e, deckId, name) => {
    e.stopPropagation();
    if (window.confirm(`Voulez-vous vraiment supprimer le deck "${name}" ?`)) {
      deleteDeck(deckId);
    }
  };

  return (
    <div className="deckBuilderPage">
      <Header />

      <main className="deckBuilderMain">
        <div className="deckBuilderHeader">
          <span className="deckBuilderBadge">Gestion de Decks</span>
          <h1>Mes Decks de Cartes</h1>
          <p>Créez, organisez et optimisez vos compositions Pokémon pour le combat.</p>
        </div>

        <div className="deckBuilderLayout">
          {/* Create New Deck Card */}
          <section className="deckNewSection">
            <div className="deckNewCard">
              <div className="deckNewHeader">
                <span className="newDeckIcon">✨</span>
                <h2>Nouveau Deck</h2>
              </div>

              {createError && <div className="deckErrorAlert">{createError}</div>}

              <form onSubmit={handleCreateDeck} className="deckCreateForm">
                <div className="deckInputGroup">
                  <label htmlFor="deckName">Nom du deck</label>
                  <input
                    type="text"
                    id="deckName"
                    value={deckName}
                    onChange={(e) => setDeckName(e.target.value)}
                    placeholder="Ex: Électrik Rush, Feu Sacré..."
                    maxLength={40}
                    required
                  />
                </div>
                <button type="submit" className="deckCreateBtn">
                  + Créer le deck
                </button>
              </form>
            </div>
          </section>

          {/* Decks List */}
          <section className="decksListSection">
            <div className="decksListHeader">
              <h2>Vos Decks ({decks.length})</h2>
            </div>

            {decks.length === 0 ? (
              <div className="decksEmptyState">
                <span className="emptyDeckIcon">🎴</span>
                <h3>Aucun deck pour le moment</h3>
                <p>Donnez un nom à votre premier deck à gauche pour commencer à assembler vos cartes Pokémon !</p>
              </div>
            ) : (
              <div className="decksGrid">
                {decks.map((deck) => {
                  const cardCount = Array.isArray(deck.cards) ? deck.cards.length : 0;
                  const previewCards = Array.isArray(deck.cards) ? deck.cards.slice(0, 3) : [];

                  return (
                    <div
                      key={deck.id}
                      className="deckCardItem"
                      onClick={() => handleOpenDeck(deck)}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="deckCardTop">
                        <h3 className="deckCardTitle">{deck.name}</h3>
                        <span className="deckCardBadge">
                          {cardCount} carte{cardCount > 1 ? 's' : ''}
                        </span>
                      </div>

                      {/* Visual preview of deck cards */}
                      <div className="deckCardsPreview">
                        {previewCards.length > 0 ? (
                          previewCards.map((c, i) => (
                            <div key={i} className="deckPreviewThumb" style={{ zIndex: 3 - i }}>
                              {c.image ? (
                                <img src={`${c.image}/low.webp`} alt={c.name} />
                              ) : (
                                <div className="thumbPlaceholder">🃏</div>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="deckEmptyPreview">Deck vide</div>
                        )}
                      </div>

                      <div className="deckCardActions">
                        <button
                          type="button"
                          className="openDeckBtn"
                          onClick={() => handleOpenDeck(deck)}
                        >
                          Ouvrir le deck →
                        </button>
                        <button
                          type="button"
                          className="deleteDeckBtn"
                          onClick={(e) => handleDeleteDeck(e, deck.id, deck.name)}
                          title="Supprimer ce deck"
                        >
                          🗑
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}