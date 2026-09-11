import { useState, useEffect, useCallback } from "react";
import "./Searchbar.css";
import { useNavigate } from "react-router-dom";

function SearchBar({ onCardClick, showAddButton = false }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedSet, setSelectedSet] = useState("");
  const [sets, setSets] = useState([]);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [addedCardId, setAddedCardId] = useState(null);
  const cardsPerPage = 12;

  const navigate = useNavigate();

  // Charge la liste des extensions
  useEffect(() => {
    let isMounted = true;
    fetch("https://api.tcgdex.net/v2/fr/sets")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur chargement extensions");
        return res.json();
      })
      .then((data) => {
        if (isMounted && Array.isArray(data)) {
          setSets(data);
        }
      })
      .catch((err) => console.error("Erreur sets:", err));

    return () => {
      isMounted = false;
    };
  }, []);

  // Débrouille la frappe utilisateur (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Récupère les cartes selon la recherche ou l'extension sélectionnée
  useEffect(() => {
    let isMounted = true;

    if (!debouncedQuery && !selectedSet) {
      setCards([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setCurrentPage(1);

    let fetchPromise;
    if (debouncedQuery) {
      let url = `https://api.tcgdex.net/v2/fr/cards?name=${encodeURIComponent(debouncedQuery)}`;
      if (selectedSet) {
        url += `&set=${selectedSet}`;
      }
      fetchPromise = fetch(url).then((res) => res.json());
    } else if (selectedSet) {
      fetchPromise = fetch(`https://api.tcgdex.net/v2/fr/sets/${selectedSet}`)
        .then((res) => res.json())
        .then((data) => (data && data.cards ? data.cards : []));
    }

    fetchPromise
      .then((data) => {
        if (isMounted) {
          const cardList = Array.isArray(data) ? data : [];
          // Filtrer uniquement les cartes possédant une photo
          const cardsWithImage = cardList.filter(
            (card) => Boolean(card && card.image && typeof card.image === "string" && card.image.trim() !== "")
          );
          setCards(cardsWithImage);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error("Erreur récupération cartes:", err);
        if (isMounted) {
          setCards([]);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [debouncedQuery, selectedSet]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleClear = () => {
    setSearchQuery("");
    setDebouncedQuery("");
  };

  const handleCardClick = useCallback((card) => {
    if (onCardClick) {
      onCardClick(card);
      setAddedCardId(card.id);
      setTimeout(() => setAddedCardId(null), 1500);
    } else {
      navigate(`/card/${card.id}`);
    }
  }, [onCardClick, navigate]);

  const handleImageError = useCallback((cardId) => {
    setCards((prev) => prev.filter((card) => card.id !== cardId));
  }, []);

  const totalPages = Math.ceil(cards.length / cardsPerPage);
  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;
  const currentCards = cards.slice(firstCardIndex, lastCardIndex);

  const nextPageButton = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPageButton = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="searchContainer">
      <div className="searchControls">
        <div className="searchInputWrapper">
          <span className="searchIcon">🔍</span>
          <input
            className="searchBarInput"
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Rechercher une carte (ex: Pikachu, Mew, Dracaufeu...)"
          />
          {searchQuery && (
            <button
              className="clearSearchBtn"
              type="button"
              onClick={handleClear}
              title="Effacer"
            >
              ✕
            </button>
          )}
        </div>

        <select
          className="setFilterSelect"
          value={selectedSet}
          onChange={(e) => setSelectedSet(e.target.value)}
        >
          <option value="">Toutes les extensions</option>
          {sets.map((set) => (
            <option key={set.id} value={set.id}>
              {set.name}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="searchLoading">
          <div className="pokeballSpinner"></div>
          <p>Recherche des cartes dans le Pokédex...</p>
        </div>
      ) : cards.length > 0 ? (
        <>
          <div className="searchStats">
            <span>{cards.length} carte{cards.length > 1 ? "s" : ""} trouvée{cards.length > 1 ? "s" : ""}</span>
          </div>

          <ul className="cardsGrid">
            {currentCards.map((card) => {
              const isAdded = addedCardId === card.id;

              return (
                <li key={card.id} className="cardGridItem">
                  <div
                    className="cardPreviewWrapper"
                    onClick={() => handleCardClick(card)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="cardImageFrame">
                      <img
                        src={`${card.image}/low.webp`}
                        alt={card.name}
                        loading="lazy"
                        onError={() => handleImageError(card.id)}
                      />
                    </div>
                    <span className="cardGridName">{card.name}</span>
                  </div>

                  {showAddButton && onCardClick && (
                    <button
                      type="button"
                      className={`cardAddBtn ${isAdded ? "added" : ""}`}
                      onClick={() => handleCardClick(card)}
                    >
                      {isAdded ? "✓ Ajouté !" : "+ Ajouter au deck"}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>

          {totalPages > 1 && (
            <div className="searchPagination">
              <button
                onClick={prevPageButton}
                disabled={currentPage === 1}
                className="paginationBtn"
              >
                ← Précédent
              </button>
              <span className="paginationInfo">
                Page {currentPage} sur {totalPages}
              </span>
              <button
                onClick={nextPageButton}
                disabled={currentPage === totalPages}
                className="paginationBtn"
              >
                Suivant →
              </button>
            </div>
          )}
        </>
      ) : debouncedQuery || selectedSet ? (
        <div className="searchEmpty">
          <span className="emptyIcon">🔍</span>
          <p className="emptyTitle">Aucune carte trouvée</p>
          <p className="emptySub">Essayez un autre nom de Pokémon ou une autre extension.</p>
        </div>
      ) : (
        <div className="searchPrompt">
          <div className="promptPokeball"></div>
          <p className="promptTitle">Recherchez vos cartes Pokémon</p>
          <p className="promptSub">
            Tapez un nom de carte ou sélectionnez une extension pour explorer la collection.
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchBar;

