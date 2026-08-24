# Julfikar Steel Re-Rolling Mills Ltd. — Phase 1

A cinematic, premium industrial steel site: Header, scroll-scrubbed sword Canvas hero, three sections, footer. Nothing else.

## Stack decision

Built on the existing TanStack Start + React setup (no Next.js, no router change). The page is one route where all animation logic is written vanilla-style — imperative GSAP + ScrollTrigger + Canvas inside effects, not React state. Structure mirrors your requested layout:

```text
src/routes/index.tsx        -> the whole page (semantic sections)
src/components/site/*       -> Header, Hero, About, Products, Process, Footer
src/lib/hero-canvas.ts      -> canvas + video scrub engine (framework-free)
src/styles.css              -> design tokens (brand colors, type scale, grid lines)
src/assets/*.asset.json     -> uploaded MP4 + generated industrial imagery via CDN
```

## Brand system

- `#040405` primary/near-black, `#130F15` black, `#F6F5F5` soft white, plus derived steel grays for borders and surfaces. No other hues.
- Large condensed display type for headlines, neutral sans for body. Thin 1px borders, subtle grid lines, generous negative space, near-zero border radius.

## Header

Fixed, transparent over the hero; on scroll gains a blurred near-black backdrop and a hairline bottom border. Left wordmark, center nav (Home, About, Products, Manufacturing, Quality, Contact), right "Get in Touch" button. GSAP staggered entrance. Mobile: hamburger opening a full-screen dark panel with staggered link reveal.

## Hero + Canvas scroll animation

- Your uploaded MP4 (10.005s, 1280x720, 24fps) is registered as a CDN asset and used unchanged.
- Hidden `<video>` (`preload="metadata"`, muted, playsInline, never autoplayed) feeding a full-viewport `<canvas>` drawn with cover-fit math and DPR-aware sizing; resize handled with a debounced re-measure.
- ScrollTrigger pins a 350vh hero section. Scroll progress maps to `video.currentTime = progress * duration`, so down = forward, up = reverse, no looping.
- Seeking is throttled through `requestAnimationFrame` with a target-time lerp so the scrub stays smooth; a single rAF loop paints the current frame — no scroll event listeners, no continuous playback.
- The same ScrollTrigger progress drives a GSAP scale/zoom on the canvas container (subtle push-in), which reverses naturally on scroll up.
- Graceful fallback: if the video errors or cannot decode, the canvas is replaced by a dark steel gradient/poster background and the hero content still animates.

## Hero content

Overlaid, off to one side so the blade stays visible: eyebrow, `FORGED FOR STRENGTH.`, `ENGINEERED TO ENDURE.`, company name, CTA, scroll indicator — revealed in that order via a GSAP timeline with mask/clip text reveals. Content fades slightly as the scrub advances so the visual carries the mid-section.

## Section 01 — About: BUILT FROM STRENGTH.

Editorial two-column dark layout, oversized heading with line-mask reveal, introductory copy, and a hairline-divided stat strip: STRENGTH / PRECISION / QUALITY.

## Section 02 — Products: STEEL THAT PERFORMS.

Three dark steel blocks — Reinforcement Steel, Structural Steel, Industrial Steel — with generated monochrome industrial imagery, thin borders, no rounded card look. Staggered entrance, clip-path image reveals, subtle parallax on the imagery.

## Section 03 — Manufacturing / Quality: PRECISION IN EVERY TON.

Editorial horizontal process line: Raw Material → Processing → Rolling → Quality Control → Finished Steel, with a scroll-drawn connecting rule, numbered steps, and supporting copy on advanced manufacturing, consistency and engineering precision.

## Footer

Minimal dark footer: wordmark, nav (Home, About, Products, Quality, Contact), contact placeholders, social placeholders, copyright, Privacy Policy, Terms & Conditions.

## Responsive, accessibility, performance

- Fluid `clamp()` typography, no horizontal overflow, canvas cover-fit tuned so the blade stays framed on mobile; scrub retained on mobile with reduced secondary animation.
- `prefers-reduced-motion`: scroll reveals become instant, zoom disabled, hero shows a single representative frame instead of scrubbing.
- Images below the hero lazy-loaded; GSAP loaded as project dependencies; head metadata set on the index route with a real title/description/og for the company.
