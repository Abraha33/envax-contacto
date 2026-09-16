import { describe, expect, it } from 'vitest';
import { healthResponseSchema } from './index';

describe('healthResponseSchema', () => {
  it('accepts the canonical health payload', () => {
    expect(
      healthResponseSchema.parse({ service: 'envax-api', status: 'ok', version: 'v1' })
    ).toEqual({ service: 'envax-api', status: 'ok', version: 'v1' });
  });
});
