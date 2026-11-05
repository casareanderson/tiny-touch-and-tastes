# Tiny Touch & Tastes

A warm, mobile-friendly coming-soon website for Demi's baby massage and weaning classes. Built locally with Astro and the Cloudflare adapter.

## Included

- Coming-soon homepage with waiting-list signup
- Baby Massage page: £60 for a four-week block, approximately 90 minutes per class
- Weaning Workshop page: £25, initially online, with the full workshop curriculum
- Meet the Founder page using Demi's story
- Contact page
- Fluid booking preview with a month calendar and date/time selection
- Free Baby Massage Taster booking option with no payment step
- Free taster-class and Google-review prompts
- Resend-ready waiting-list and contact form endpoints
- Responsive navigation and the sage, coral, gold and ivory design system

**Booking and GoCardless are previews only.** No real availability is stored, no booking is created, and no payment is taken yet.

## Run locally

```sh
npm install
npm run dev
```

Open `http://localhost:4321`.

Useful commands:

```sh
npm run check       # TypeScript and Astro checks
npm run build       # Production build in dist/
npm run preview     # Preview the production build
npx astro dev stop  # Stop a background dev server
```

## Edit the content

Most business details are in `src/config.ts`:

- Domain and contact email
- Instagram, Facebook and Google review links
- `comingSoon` mode
- Prices, course descriptions, benefits and curriculum
- Image paths

Page-specific wording is in `src/pages/`. Colours, fonts and shared styles are in `src/styles/global.css`.

## Add Demi's photos

Place the real photos in `public/images/`, then update the `images` object near the top of `src/config.ts`.

Current placeholders:

| Setting | Placeholder | Suggested photo |
| --- | --- | --- |
| `hero` | `hero.svg` | Warm parent-and-baby or class photo, landscape |
| `founder` | `founder-demi.svg` | Portrait of Demi, portrait orientation |
| `babyMassage` | `baby-massage.svg` | Baby massage class, landscape |
| `weaning` | `weaning-workshop.svg` | First foods or weaning photo, landscape |

JPG, PNG, WebP and AVIF files are fine. Keep the SVG placeholders until the replacements are ready. The images in `/ZimaOS-HD/Demi` were not accessible from this machine, so they have **not** been copied into the project.

## Waiting list and contact forms

The browser forms post JSON to:

- `POST /api/waitlist`
- `POST /api/contact`

Without email configuration, both endpoints return a success response for local previewing and log the submission to the dev server. **Local test submissions are not permanently stored.** In production, each submission is emailed to `CONTACT_EMAIL` through Resend.

### Local email setup

```sh
cp .dev.vars.example .dev.vars
```

Fill in `.dev.vars` locally; it is ignored by Git. Do not commit real credentials.

Required values:

- `RESEND_API_KEY`: Resend API key
- `CONTACT_EMAIL`: Demi's inbox for signups and enquiries
- `FROM_EMAIL`: a sender on a domain verified in Resend

## Public GitHub Pages demo

`.github/workflows/deploy-demo.yml` builds the demo and publishes it with GitHub Pages whenever `main` is updated. Navigation and the booking calendar work; forms explicitly report that they are in demo mode and do not send details.

1. Create an empty public GitHub repository named `tiny-touch-and-tastes`.
2. Push this project to its `main` branch.
3. In **Settings → Pages**, choose **GitHub Actions** as the source.
4. The demo will be available at `https://<github-username>.github.io/tiny-touch-and-tastes/` after the workflow finishes.

To test the same base-path build locally:

```sh
BASE_PATH=/tiny-touch-and-tastes/ PUBLIC_STATIC_DEMO=true npm run build
python3 -m http.server 4322 --directory dist/client
```

Then open `http://localhost:4322/tiny-touch-and-tastes/`.

## Cloudflare deployment

The project uses `@astrojs/cloudflare` and includes `wrangler.jsonc` for Cloudflare Workers with static assets.

1. Build with `npm run build`.
2. Authenticate Wrangler with the intended Cloudflare account.
3. Configure `CONTACT_EMAIL` and `FROM_EMAIL` as non-secret environment variables.
4. Configure `RESEND_API_KEY` as a Cloudflare secret, for example with `npx wrangler secret put RESEND_API_KEY`.
5. Deploy with `npx wrangler deploy`.
6. Attach the real custom domain in Cloudflare.

No deployment or DNS changes have been made.

## Before launch

- Replace the placeholder domain, email and social/review URLs in `src/config.ts`.
- Add the real photos and confirm permission for any parent/baby photos used.
- Add genuine parent testimonials below the homepage class cards; do not use invented reviews.
- Confirm the final qualification wording with Demi.
- Verify the Resend sender domain and test both forms in production.
- Decide where waiting-list entries should be permanently stored if email alone is not enough.
- Add real class availability and a persistent booking store.
- Integrate GoCardless's hosted payment/Direct Debit flow; the current payment button is deliberately non-functional.
- Replace the example booking dates with real availability.
- Add privacy and booking/cancellation terms before taking details or payments.
- Set `comingSoon: false` only when the live booking flow is ready.
