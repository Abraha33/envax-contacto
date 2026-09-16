import { healthResponse } from './routes/health.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,OPTIONS'
};

function normalizePath(pathname: string): string {
  return pathname.replace(/^\/functions\/v1\/api-v1/, '').replace(/^\/api-v1/, '');
}

Deno.serve((request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const url = new URL(request.url);
  const path = normalizePath(url.pathname);

  if (request.method === 'GET' && (path === '/health' || path === '/api/v1/health')) {
    const response = healthResponse();
    const headers = new Headers(response.headers);
    Object.entries(corsHeaders).forEach(([key, value]) => headers.set(key, value));
    return new Response(response.body, { status: response.status, headers });
  }

  return Response.json(
    { error: { code: 'NOT_FOUND', message: 'Route not found.' } },
    { status: 404, headers: corsHeaders }
  );
});
