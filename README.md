# The Wild Oasis — Website

A small Next.js App Router site showcasing luxury cabins with booking/reservation flows, built with Tailwind CSS, Supabase (storage/auth), Heroicons and react-day-picker.

## Tech stack

- Next.js (App Router)
- React
- Tailwind CSS
- Supabase (storage / auth / actions)
- react-day-picker
- Heroicons

## Features

- Static and dynamic cabin pages (app/cabins/[cabinId]/page.js)
- Server-side data fetching helpers (getCabins, getCabin)
- Reservation UI with date range picker
- Profile update action (server action)
- Image delivery from Supabase storage (next.config.mjs configured)

## Prerequisites

- Node.js 18+ (recommended)
- npm or pnpm
- Next.js 13.4+ (App Router features like searchParams and generateMetadata)
- Supabase project (if using remote images/auth)

## Quick start

1. Install

```bash
npm install
```

2. Local development

```bash
npm run dev
# or
next dev
```

3. Build for production

```bash
npm run build
# or
next build
```

4. (Optional) Static export
   If you enable `output: "export"` in `next.config.mjs` you must ensure every dynamic route has a working `generateStaticParams()` that returns all paths at build time, and any external data (Supabase) is available during build.

```bash
next build
next export
```

## Required environment variables

If using Supabase or remote services, set these in your environment (or in a .env.local):

- SUPABASE_URL
- SUPABASE_ANON_KEY
- (any other custom vars used by app/\_lib/data-service or actions)

## Tailwind notes

- Arbitrary values like `min-h-[400px]` are supported by default in Tailwind v3+. No extra config needed unless you changed safelist/purge rules.
- If you see "Unknown at rule @tailwind" ensure PostCSS is configured and Tailwind is included in your PostCSS pipeline.

## next.config.mjs

`next.config.mjs` contains remotePatterns for Supabase storage. Adjust the hostname/path if you use a different storage bucket.

## Troubleshooting

- Build error: "Page ... is missing generateStaticParams() so it cannot be used with output: export"

  - Ensure `generateStaticParams()` exists for dynamic routes and returns objects with keys matching the dynamic segment (e.g. `{ cabinId: "1" }` for `[cabinId]`).
  - Make sure `getCabins()` returns a non-empty array during build and environment variables are available at build time.

- "Failed to collect page data for /cabins/[cabinId]"

  - Add defensive checks in `generateMetadata()` and the page component for missing data. Example:
    ```js
    const cabin = await getCabin(params.cabinId);
    if (!cabin) throw new Error("Cabin not found");
    ```
  - Log `getCabins()`/`getCabin()` outputs during build to debug.

- `searchParams` usage

  - `searchParams` is available in server components via the page function signature:
    ```js
    export default function Page({ searchParams }) {
      const filter = searchParams?.capacity ?? "all";
    }
    ```
  - For client components, use `useSearchParams()` from `next/navigation`.

- Optional chaining
  - Expressions like `session?.user?.image` safely access nested properties without throwing when some parts are null/undefined.

## Project structure (high level)

- app/
  - cabins/ (list + dynamic cabin page)
  - \_components/ (shared UI components)
  - error.js (error boundary)
  - page.js (root pages)
- next.config.mjs
- tailwind.config.js
- package.json
