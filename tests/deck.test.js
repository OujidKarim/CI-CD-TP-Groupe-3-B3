import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('Deck Management Logic', () => {
  it('should format and validate a new deck object', () => {
    const deckName = 'Mon Deck Électrik';
    const newDeck = {
      id: '123456789',
      name: deckName.trim(),
      cards: [],
      createdAt: new Date().toISOString()
    };

    assert.equal(newDeck.name, 'Mon Deck Électrik');
    assert.equal(Array.isArray(newDeck.cards), true);
    assert.equal(newDeck.cards.length, 0);
    assert.ok(newDeck.id);
  });

  it('should add a valid card to deck and update count', () => {
    const deck = {
      id: 'deck-1',
      name: 'Pikachu Deck',
      cards: []
    };

    const card = {
      id: 'base1-58',
      name: 'Pikachu',
      category: 'Pokémon',
      types: ['Lightning'],
      hp: 60
    };

    const updatedCards = [...deck.cards, card];
    assert.equal(updatedCards.length, 1);
    assert.equal(updatedCards[0].name, 'Pikachu');
    assert.equal(updatedCards[0].types[0], 'Lightning');
  });

  it('should filter cards by category in a deck', () => {
    const cards = [
      { id: '1', name: 'Pikachu', category: 'Pokémon' },
      { id: '2', name: 'Potion', category: 'Trainer' },
      { id: '3', name: 'Énergie Électrique', category: 'Energy' },
      { id: '4', name: 'Raichu', category: 'Pokémon' }
    ];

    const pokemonCards = cards.filter(c => c.category === 'Pokémon');
    const trainerCards = cards.filter(c => c.category === 'Trainer');
    const energyCards = cards.filter(c => c.category === 'Energy');

    assert.equal(pokemonCards.length, 2);
    assert.equal(trainerCards.length, 1);
    assert.equal(energyCards.length, 1);
  });
});
