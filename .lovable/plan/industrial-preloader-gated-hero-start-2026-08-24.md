# Industrial preloader + gated hero start

A full-screen loading screen appears instantly on page load, holds while the forge MP4 fully downloads, then hands off to the hero. The scroll-scrub animation does not begin until the video is genuinely seekable, which also removes the "frozen video" problem on a first visit.

## The loader design

Built to match the site, not a generic spinner:

- Full-bleed `#040405` panel with the faint industrial grid already used on the site.
- Centered `JULFIKAR STEEL` wordmark in Oswald, with `RE-ROLLING MILLS LTD.` in wide tracking beneath it.
- The wordmark starts as dark outline and fills with molten heat from the bottom up as loading progresses — a steel-pour metaphor rather than a progress bar.
- A hairline rule under the mark grows left to right, with a live percentage counter in small mono-ish tracked caps at its right edge.
- Slight heat-haze glow behind the mark, fading in as it nears 100%.

## Behaviour

1. Loader renders immediately, before the hero mounts, with page scroll locked.
2. The MP4 is downloaded as a single request with real progress tracking, then handed to the video element as a local object URL — so every later seek is instant, with no network round trip.
3. The percentage reflects actual download progress, floored at a minimum on-screen time (~1.2s) so it never flashes.
4. When the video reports it can seek, the counter completes to 100, holds a beat, then the loader exits: the wordmark lifts and fades, the panel wipes upward, and the hero headline reveal starts underneath.
5. Scroll unlocks only after the exit finishes, so the user never scrolls into an unready sequence.
6. Failure and slow-connection paths: if the download errors or exceeds ~15s, the loader exits anyway and the hero falls back to the poster frame. Reduced-motion users get a plain fade with no wipe.

## Technical notes

- New `src/components/site/Preloader.tsx` plus a small `src/lib/preload-video.ts` that fetches the asset with a streaming reader for progress and returns an object URL.
- Loading state lives in the index route and is passed to `Hero.tsx`; `hero-canvas.ts` gets the ready URL instead of loading the asset itself.
- Exit timeline and the wordmark fill use GSAP, consistent with the rest of the site.
- ScrollTrigger is refreshed after the loader unmounts so the pinned hero measures against the final layout.
