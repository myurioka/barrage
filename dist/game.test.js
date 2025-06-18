import { overap, Shot } from './game.js';
test('OK overap', () => {
    // Case 1: Far apart (existing test)
    const a = new Shot(0, 0, 0, 0, 1, 1, 0);
    const b = new Shot(1, 1, 0, 0, 1, 1, 0);
    const result = overap(a, b);
    expect(result).toBe(false);
});
test('overap - Larger object inside smaller object (based on current logic)', () => {
    // Case 7: t inside s (current logic predicts false)
    const a = new Shot(5, 5, 0, 0, 5, 5, 0);
    const b = new Shot(0, 0, 0, 0, 20, 20, 0);
    expect(overap(a, b)).toBe(false); // Note: Standard AABB would be true
});
//# sourceMappingURL=game.test.js.map