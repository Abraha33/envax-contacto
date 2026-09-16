# ENVAX · Página de contacto + Foundation V1

Página de contacto de Desechables ENVAX (Bucaramanga) con demostración animada integrada y nueva base técnica para el catálogo B2B.

## Landing actual

- `index.html` — Página de contacto existente. Se mantiene intacta durante Foundation.
- `demo.html` — Demostración animada existente.
- `qr-worker/` — Worker QR existente. Se mantiene aislado durante Foundation.

## Nueva estructura Foundation

- `apps/customer` — shell React/Vite del catálogo/cliente.
- `apps/admin` — shell React/Vite administrativo.
- `packages/contracts` — contratos compartidos y validación runtime.
- `packages/db`, `packages/ui`, `packages/config` — paquetes internos reservados.
- `supabase/` — configuración local, migraciones, seed y Edge Functions.
- `extensions/seller` — base reservada para la extensión del vendedor.
- `tools/catalog-import` — base reservada para importación determinística del catálogo.

## Requisitos locales

- Node.js 22+
- pnpm 10+
- Deno 2+
- Docker o runtime compatible para ejecutar Supabase localmente

## Primer arranque

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm supabase:start
```

Apps:

```bash
pnpm --filter @envax/customer dev
pnpm --filter @envax/admin dev
```

Health local de Edge Function una vez Supabase esté activo:

```text
http://127.0.0.1:54321/functions/v1/api-v1/health
```

## Secretos

No se versionan `.env`, claves `service_role`, credenciales ERP, datos reales de clientes ni documentos fiscales. Usar los `.env.example` como referencia.

## Arquitectura V1

Backend Supabase-first:
- Supabase Auth: correo + contraseña;
- PostgreSQL + RLS;
- Supabase Storage;
- una Edge Function modular `api-v1`;
- TypeScript end-to-end;
- REST JSON bajo `/api/v1`.

Wappsi/ERP sigue pendiente de validación real y no bloquea el núcleo ENVAX.

## Publicación de la landing existente

La configuración de producción actual no debe modificarse desde Foundation. Cualquier migración de landing/QR requiere staging, prueba de paridad y rollback.

<!-- cloudflare-deploy-test -->
