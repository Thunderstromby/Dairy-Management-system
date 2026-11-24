import { describe, expect, it } from 'vitest';

describe('test runner sanity check', () => {
  it('detects a correct assertion', () => {
    expect(1 + 1).toBe(2);
  });
});
