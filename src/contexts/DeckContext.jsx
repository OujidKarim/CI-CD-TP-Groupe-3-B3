import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { MyUser } from './Users';

const DeckContext = createContext();

function DeckProvider({ children }) {
  const { user, updateUser } = useContext(MyUser);
  const [decks, setDecks] = useState([]);
  const [currentDeck, setCurrentDeck] = useState(null);

  // Synchronise les decks lorsque l'utilisateur connecté change
  useEffect(() => {
    if (user && Array.isArray(user.decks)) {
      setDecks(user.decks);
    } else {
      setDecks([]);
    }
  }, [user]);

  const createDeck = useCallback((name) => {
    const trimmedName = name.trim();
    if (!trimmedName) return null;

    const newDeck = {
      id: Date.now().toString(),
      name: trimmedName,
      cards: [],
      createdAt: new Date().toISOString()
    };

    const updatedDecks = [...decks, newDeck];
    setDecks(updatedDecks);
    if (user && user.email) {
      updateUser({ ...user, decks: updatedDecks });
    }
    return newDeck;
  }, [decks, user, updateUser]);

  const deleteDeck = useCallback((deckId) => {
    const updatedDecks = decks.filter((d) => String(d.id) !== String(deckId));
    setDecks(updatedDecks);
    if (currentDeck && String(currentDeck.id) === String(deckId)) {
      setCurrentDeck(null);
    }
    if (user && user.email) {
      updateUser({ ...user, decks: updatedDecks });
    }
  }, [decks, currentDeck, user, updateUser]);

  const addCardToDeck = useCallback((deckId, card) => {
    const cardData = {
      id: card.id,
      name: card.name,
      image: card.image,
      category: card.category || 'Pokémon',
      types: card.types || [],
      hp: card.hp || null,
      rarity: card.rarity || null,
      addedAt: Date.now()
    };

    let updatedCurrent = null;
    const updatedDecks = decks.map((d) => {
      if (String(d.id) === String(deckId)) {
        const updated = {
          ...d,
          cards: [...(d.cards || []), cardData]
        };
        updatedCurrent = updated;
        return updated;
      }
      return d;
    });

    setDecks(updatedDecks);
    if (currentDeck && String(currentDeck.id) === String(deckId)) {
      setCurrentDeck(updatedCurrent);
    }
    if (user && user.email) {
      updateUser({ ...user, decks: updatedDecks });
    }
    return true;
  }, [decks, currentDeck, user, updateUser]);

  const removeCardFromDeck = useCallback((deckId, cardIndex) => {
    let updatedCurrent = null;
    const updatedDecks = decks.map((d) => {
      if (String(d.id) === String(deckId)) {
        const nextCards = [...(d.cards || [])];
        nextCards.splice(cardIndex, 1);
        const updated = {
          ...d,
          cards: nextCards
        };
        updatedCurrent = updated;
        return updated;
      }
      return d;
    });

    setDecks(updatedDecks);
    if (currentDeck && String(currentDeck.id) === String(deckId)) {
      setCurrentDeck(updatedCurrent);
    }
    if (user && user.email) {
      updateUser({ ...user, decks: updatedDecks });
    }
  }, [decks, currentDeck, user, updateUser]);

  const getDeck = useCallback((deckId) => {
    return decks.find((d) => String(d.id) === String(deckId)) || null;
  }, [decks]);

  return (
    <DeckContext.Provider
      value={{
        decks,
        setDecks,
        currentDeck,
        setCurrentDeck,
        createDeck,
        deleteDeck,
        addCardToDeck,
        removeCardFromDeck,
        getDeck
      }}
    >
      {children}
    </DeckContext.Provider>
  );
}

export { DeckContext, DeckProvider };