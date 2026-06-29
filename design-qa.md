# Mibilisq Storefront Design QA

## Comparison target

- Source visual truth: `/Users/andreybuenoisoton/Documents/Codex/2026-06-17/goal-quero-criar-um-site-para/work/mibilisq-vintage-motion-reference.mp4`
- Source comparison frame: `/Users/andreybuenoisoton/Documents/Codex/2026-06-17/goal-quero-criar-um-site-para/work/mibilisq-vintage-motion-reference.png`
- Combined comparison evidence: `/Users/andreybuenoisoton/Documents/Codex/2026-06-17/goal-quero-criar-um-site-para/work/mibilisq-reference-vs-implementation.png`
- Desktop implementation: `/Users/andreybuenoisoton/Documents/Codex/2026-06-17/goal-quero-criar-um-site-para/outputs/mibilisq-storefront-desktop.png`
- Mobile implementation: `/Users/andreybuenoisoton/Documents/Codex/2026-06-17/goal-quero-criar-um-site-para/outputs/mibilisq-storefront-mobile.png`
- Desktop viewport: 1440 × 1024
- Mobile viewport: 390 × 844
- State: public storefront, empty cart for primary screenshots; populated cart checked separately.

The selected motion concept establishes the vintage editorial movement, paper texture, food-led composition, layered transitions, and label-like visual vocabulary. The user's later correction establishes orange, yellow, and white as the official palette. Green and distorted generated text in the source video are not fidelity targets.

## Full-view comparison evidence

The implementation keeps the source concept's strongest qualities: tactile paper, oversized editorial typography, appetizing product imagery, warm handmade atmosphere, label-inspired controls, and layered movement. It improves legibility, uses the correct brand palette, preserves real Portuguese copy, and replaces the source video's distorted generated interface text with code-native accessible UI.

## Focused region evidence

- Hero: inspected at 1440 × 1024 and 390 × 844.
- Catalog: inspected after scroll with all four products visible and motion settled.
- Cart: inspected with one product, quantity controls, total, customer name, and WhatsApp action.
- Story: inspected at desktop with image/text split and animated ribbon.
- Location: inspected at desktop with the real public map capture and confirmed address.

## Required fidelity surfaces

### Fonts and typography

- Fraunces gives the approved expressive vintage editorial character.
- DM Sans keeps body copy, prices, filters, forms, and navigation readable.
- Desktop and mobile heading wraps are intentional and unclipped.
- Control typography is explicitly sized and weighted; no browser-default control text remains.

### Spacing and layout rhythm

- Hero uses a balanced asymmetric two-column composition on desktop.
- Mobile collapses to one column without horizontal overflow.
- Section rhythm varies between open paper, yellow information band, product grid, full orange story band, and framed location section.
- Product card heights align at desktop and collapse appropriately on smaller screens.

### Colors and visual tokens

- The default identity is orange, yellow, white, and dark brown neutral.
- Green from the temporary World Cup Instagram logo and the generated motion source is excluded.
- Contrast remains readable across paper, yellow, orange, and dark surfaces.

### Image quality and asset fidelity

- Hero and four product images are generated raster assets in one coherent art direction.
- The location uses a real map screenshot instead of a CSS approximation.
- Generated product imagery is sharp, consistently cropped, and free of text artifacts.
- Icons come from Phosphor Icons; no handcrafted inline icon assets are used.

### Copy and content

- Brand name is correctly spelled as “Mibilisq”.
- Hero, safety, catalog, story, address, phone, and WhatsApp copy are clear and in Portuguese.
- Demonstration prices are explicitly labeled as preview content.
- Food claims are restrained and do not invent certification details.

## Interaction and responsive checks

- Category filtering works.
- Adding a product increments the cart count.
- Cart drawer opens and quantity controls render.
- Empty customer name produces an accessible error.
- Valid customer name creates the correct `wa.me/5563992259449` URL with product, quantity, preview order number, and total.
- Mobile navigation opens.
- Desktop navigation remains clean after a mobile-to-desktop resize.
- Browser console contains no warnings or errors.

## Findings

No actionable P0, P1, or P2 findings remain.

## Patches made during QA

- Hid the mobile navigation at desktop breakpoints after detecting retained open state during viewport switching.
- Replaced the decorative CSS brand glyph with a Phosphor icon.
- Replaced the illustrative CSS map with a real public Google Maps capture.
- Removed the temporary World Cup campaign logo from the project and retained an editable typographic wordmark.
- Re-captured desktop and mobile screenshots after the final patches.

## Follow-up polish

- [P3] Replace the provisional typographic wordmark when the permanent official logo is supplied.
- [P3] Replace demonstration product names, prices, and photos through the future admin panel.

## Round 2 — Pickup QA (2026-06-18, gondim time + impeccable)

Re-audited the prototype with the impeccable design lens before shipping.

### [P1] Catalog and "Nossa história" shipped blank when the scroll reveal did not fire

- **Finding:** `ProductCard` and `StorySection` gated content visibility on a
  Framer Motion `whileInView` reveal (`initial={{ opacity: 0 }}` →
  `whileInView`). In any environment where the in-view IntersectionObserver
  does not fire (headless renderers, SEO crawlers, link-preview bots, hidden
  tabs), the four product cards and both story blocks stayed at `opacity: 0`.
  Verified live: catalog articles and `.story-visual` / `.story-copy` measured
  `opacity: 0` and never recovered even after the element was scrolled to
  centre. The unit suite could not catch this because jsdom ignores opacity.
- **Why it matters:** the catalog and brand story are the core of the
  storefront, and the spec prioritises catalog indexing/SEO. Gating that
  content behind a reveal that crawlers will not run risks shipping a blank
  page to exactly the visitors who matter for discovery.
- **Fix:** content is now visible by default; motion is pure enhancement.
  Removed the `opacity: 0` gate, kept a transform-only entrance
  (`initial={{ y / x: … }}` → `animate`), guarded with `useReducedMotion`
  (renders instantly when motion is off), and staggered the product reveal by
  index. Worst case (animation never runs) leaves content fully visible, only
  un-slid. The `layout` prop that conflicted with the observer was removed.
- **Verified:** after the fix, all four product cards and both story blocks
  measure `opacity: 1` at every scroll position; the transform settles to
  `none` when in view. Tests 12/12 pass; production build exits 0 (Node 22).

Note: the in-app preview browser behaves as a headless renderer (neither
`whileInView` nor a raw `IntersectionObserver` fire, and off-screen mount
animations are throttled), which is precisely the failure mode this fix
guards against. Hero (an on-mount, in-view animation) was re-captured with no
regression.

final result: passed
