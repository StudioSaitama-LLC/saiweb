# saiweb

Studio Saitama corporate site generated from v0.dev and exported as a static Next.js app.

## Stack

- Next.js + React + TypeScript
- Tailwind CSS, lucide-react, clsx, tailwind-merge
- `next.config.mjs` uses `output: "export"` and unoptimized images
- `sharp` is available for image optimization scripts

## Key commands

- `npm run dev` - Next.js dev server
- `npm run build` - static export build
- `npm start` - Next.js start
- `npm run lint` - Next lint
- `npm run optimize-images` - run `scripts/optimize-images.mjs`

## Structure

- `app/` - App Router page, layout, globals
- `components/` - corporate site sections and model viewer
- `lib/` - utilities and works data
- `public/` - images, CNAME, robots, sitemap
- `out/` - generated static output currently present
- `scripts/` - OG/image optimization utilities

## Notes

- README says this repo syncs with v0.dev deployments.
- Build config ignores TypeScript and ESLint build errors; verify manually when changing behavior.
