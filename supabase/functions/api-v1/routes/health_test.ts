import { healthResponse } from './health.ts';

Deno.test('health route returns canonical payload', async () => {
  const response = healthResponse();
  const body = await response.json();

  if (response.status !== 200) throw new Error(`Expected 200, got ${response.status}`);
  if (body.service !== 'envax-api') throw new Error('Unexpected service');
  if (body.status !== 'ok') throw new Error('Unexpected status');
  if (body.version !== 'v1') throw new Error('Unexpected version');
});
