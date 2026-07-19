# La Hilula

אתר הזמנות וקייטרינג בוטיק — תפריט, עגלה, הצעת מחיר להדפסה והזמנה בוואטסאפ.

## Stack

Next.js · React · TypeScript · Tailwind CSS

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm test` | Unit tests (Vitest) |

## Editing the menu

Menu items, categories and pricing live in [`src/data/menu.ts`](src/data/menu.ts).

1. Add or edit an object in the `MENU` array (`id`, `name`, `price`, `category`, `desc`, `images`).
2. Put dish photos in `public/` and reference them as `"/filename.jpg"`.
3. For bulk items (sold in packs of 30), add the item `id` to `BULK_ITEM_IDS`.
4. For couscous default quantity, add the `id` to `COUSCOUS_ITEM_IDS`.

Category filter order is `CATEGORIES`; display order when showing "הכל" is `SERVING_COURSES`.
