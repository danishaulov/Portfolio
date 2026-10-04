# Daniel Shaulov — Accounting & Financial Analysis

Personal portfolio for an accounting student at the Open University of Israel, working towards Assistant Controller opportunities.

## Run locally

Use Node.js 24, then `npm ci` and `npm run dev`. Run `npm run typecheck` and `npm run build` before deploying. Do not run the development server and production build simultaneously: both use `.next`.

## Content and design

- `components/Portfolio.tsx`: page composition, project filters, navigation and contact entry points.
- `lib/portfolio.ts`: projects, accounting relevance, skills and employment history.
- `app/globals.css`: responsive layout, theme tokens and accessible interaction states.
- `components/ContactModal.tsx`: labelled form with keyboard focus management and email fallback.
- `app/api/contact/route.ts`: validated Resend delivery. Provider errors never return success.
- `app/layout.tsx` and `app/opengraph-image.tsx`: search metadata and sharing image.
- `public/projects/car-company.png`: actual screenshot from the Car Company repository. All report data is synthetic.

Self-hosted Manrope and Inter fonts, native scrolling, light/dark themes, visible keyboard focus, mobile navigation, and reduced-motion support. English content follows the existing site's language.

The downloadable PDF is Daniel's supplied current resume, covering his accounting studies and Assistant Controller career direction. Preserve the supplied PDF unchanged when replacing it. The site intentionally does not display a CV update date or an unconfirmed GPA.

## Deployment

The existing Vercel project `portfolio-wasmer` deploys from the GitHub `master` branch and serves `https://danielshaulov.vercel.app`. Branch pushes create previews. Preserve the existing `RESEND_API_KEY` environment variable. Contact delivery uses the existing sender and recipient; without configuration, the form offers the direct email address instead.
