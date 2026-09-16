-- ENVAX V1 — Catalog foundation
-- Public catalog data is served through ENVAX API. Direct anon/auth table access is denied by default.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint brands_name_not_blank check (btrim(name) <> ''),
  constraint brands_slug_not_blank check (btrim(slug) <> '')
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.categories(id) on delete restrict,
  name text not null,
  slug text not null unique,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint categories_name_not_blank check (btrim(name) <> ''),
  constraint categories_slug_not_blank check (btrim(slug) <> ''),
  constraint categories_not_self_parent check (parent_id is null or parent_id <> id)
);

create table public.segments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  kind text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint segments_name_not_blank check (btrim(name) <> ''),
  constraint segments_slug_not_blank check (btrim(slug) <> ''),
  constraint segments_kind_valid check (kind in ('BUSINESS_TYPE', 'USE'))
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid references public.brands(id) on delete restrict,
  name text not null,
  slug text not null unique,
  short_description text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint products_name_not_blank check (btrim(name) <> ''),
  constraint products_slug_not_blank check (btrim(slug) <> '')
);

create table public.product_categories (
  product_id uuid not null references public.products(id) on delete cascade,
  category_id uuid not null references public.categories(id) on delete restrict,
  primary key (product_id, category_id)
);

create table public.product_segments (
  product_id uuid not null references public.products(id) on delete cascade,
  segment_id uuid not null references public.segments(id) on delete restrict,
  primary key (product_id, segment_id)
);

create table public.variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  label text not null,
  reference text,
  is_default boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint variants_label_not_blank check (btrim(label) <> ''),
  constraint variants_reference_not_blank check (reference is null or btrim(reference) <> '')
);

create unique index variants_reference_unique
  on public.variants(reference)
  where reference is not null;

create unique index variants_one_default_per_product
  on public.variants(product_id)
  where is_default = true;

create table public.attributes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  code text not null unique,
  is_public boolean not null default true,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint attributes_name_not_blank check (btrim(name) <> ''),
  constraint attributes_code_not_blank check (btrim(code) <> '')
);

create table public.product_attribute_values (
  product_id uuid not null references public.products(id) on delete cascade,
  attribute_id uuid not null references public.attributes(id) on delete restrict,
  value_text text not null,
  primary key (product_id, attribute_id),
  constraint product_attribute_values_not_blank check (btrim(value_text) <> '')
);

create table public.variant_attribute_values (
  variant_id uuid not null references public.variants(id) on delete cascade,
  attribute_id uuid not null references public.attributes(id) on delete restrict,
  value_text text not null,
  primary key (variant_id, attribute_id),
  constraint variant_attribute_values_not_blank check (btrim(value_text) <> '')
);

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id) on delete cascade,
  variant_id uuid references public.variants(id) on delete cascade,
  storage_path text not null,
  alt_text text,
  sort_order integer not null default 0,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint media_assets_storage_path_not_blank check (btrim(storage_path) <> ''),
  constraint media_assets_one_owner check (
    (product_id is not null and variant_id is null)
    or (product_id is null and variant_id is not null)
  )
);

create table public.catalog_import_runs (
  id uuid primary key default gen_random_uuid(),
  source_label text not null unique,
  source_hash text not null,
  imported_at timestamptz not null default now(),
  constraint catalog_import_runs_source_label_not_blank check (btrim(source_label) <> ''),
  constraint catalog_import_runs_source_hash_not_blank check (btrim(source_hash) <> '')
);

create trigger brands_set_updated_at before update on public.brands
for each row execute function public.set_updated_at();
create trigger categories_set_updated_at before update on public.categories
for each row execute function public.set_updated_at();
create trigger segments_set_updated_at before update on public.segments
for each row execute function public.set_updated_at();
create trigger products_set_updated_at before update on public.products
for each row execute function public.set_updated_at();
create trigger variants_set_updated_at before update on public.variants
for each row execute function public.set_updated_at();
create trigger attributes_set_updated_at before update on public.attributes
for each row execute function public.set_updated_at();
create trigger media_assets_set_updated_at before update on public.media_assets
for each row execute function public.set_updated_at();

create index products_active_brand_idx on public.products(is_active, brand_id);
create index categories_active_parent_idx on public.categories(is_active, parent_id, sort_order);
create index variants_product_active_idx on public.variants(product_id, is_active);
create index product_categories_category_idx on public.product_categories(category_id, product_id);
create index product_segments_segment_idx on public.product_segments(segment_id, product_id);
create index media_assets_product_idx on public.media_assets(product_id, is_public, sort_order);
create index media_assets_variant_idx on public.media_assets(variant_id, is_public, sort_order);

alter table public.brands enable row level security;
alter table public.categories enable row level security;
alter table public.segments enable row level security;
alter table public.products enable row level security;
alter table public.product_categories enable row level security;
alter table public.product_segments enable row level security;
alter table public.variants enable row level security;
alter table public.attributes enable row level security;
alter table public.product_attribute_values enable row level security;
alter table public.variant_attribute_values enable row level security;
alter table public.media_assets enable row level security;
alter table public.catalog_import_runs enable row level security;

-- Browser roles do not query catalog tables directly in V1; the Edge Function controls the public contract.
revoke all on table public.brands from anon, authenticated;
revoke all on table public.categories from anon, authenticated;
revoke all on table public.segments from anon, authenticated;
revoke all on table public.products from anon, authenticated;
revoke all on table public.product_categories from anon, authenticated;
revoke all on table public.product_segments from anon, authenticated;
revoke all on table public.variants from anon, authenticated;
revoke all on table public.attributes from anon, authenticated;
revoke all on table public.product_attribute_values from anon, authenticated;
revoke all on table public.variant_attribute_values from anon, authenticated;
revoke all on table public.media_assets from anon, authenticated;
revoke all on table public.catalog_import_runs from anon, authenticated;

grant select on table public.brands to service_role;
grant select on table public.categories to service_role;
grant select on table public.segments to service_role;
grant select on table public.products to service_role;
grant select on table public.product_categories to service_role;
grant select on table public.product_segments to service_role;
grant select on table public.variants to service_role;
grant select on table public.attributes to service_role;
grant select on table public.product_attribute_values to service_role;
grant select on table public.variant_attribute_values to service_role;
grant select on table public.media_assets to service_role;
grant select on table public.catalog_import_runs to service_role;
