export function healthResponse(): Response {
  return Response.json({ service: 'envax-api', status: 'ok', version: 'v1' }, { status: 200 });
}
