import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('External Services Integration', () => {
  it('should successfully communicate with TCGdex external API', async () => {
    const response = await fetch('https://api.tcgdex.net/v2/fr/cards?name=Pikachu');
    assert.equal(response.status, 200);

    const cards = await response.json();
    assert.ok(Array.isArray(cards));
    assert.ok(cards.length > 0);
    assert.ok(cards[0].name.toLowerCase().includes('pikachu'));
  });
});
