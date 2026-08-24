# Fix: hero forge animation looks frozen

## What I found

Checked the live preview: the video file loads (10.0s, correct source) and the canvas is painting a real frame, so nothing is broken in the wiring. The problem is the technique. Right now every scroll step sets `video.currentTime` and waits for the browser to seek. During that seek the video drops back to `readyState 1` (still fetching data over the network), which I observed directly in your browser. Result: frames arrive late and in bursts, so the sequence looks stuck instead of animating with the scroll.

Seeking a streamed MP4 dozens of times per second is unreliable on every browser — Safari and mobile Chrome are worse than desktop. This is why premium sites (Apple-style scroll sequences) do not scrub a video at all.

## The fix: pre-rendered frame sequence

Replace the video-seek engine with an image-sequence engine.

1. Extract ~150 JPEG frames from the existing forge MP4 with ffmpeg (1440px wide, quality-tuned, roughly 40-70 KB each).
2. Upload the frames to the CDN as project assets and keep a generated index of their URLs.
3. Rewrite the hero engine to preload the frames (progressive: first frame immediately, the rest in the background with a small loading state), then on every scroll update draw the single nearest frame to the canvas.
4. Keep the existing behaviour: scroll down runs the forge forward, scroll up runs it backward, same 360vh pinned hero, same cover-fit and DPR handling, same reduced-motion path (static first/last frame).
5. Keep the poster fallback for anything that fails to load.

This makes scrubbing instant in both directions because drawing a decoded image has no seek latency.

## Technical notes

- New `src/lib/hero-frames.ts` engine replaces `src/lib/hero-canvas.ts`; `Hero.tsx` keeps its ScrollTrigger setup and just calls `setProgress` on the new engine.
- Frames are extracted in the sandbox with ffmpeg and pushed through `lovable-assets`, so nothing heavy lands in the repo — only a small JSON manifest of frame URLs.
- Total transfer is roughly comparable to the current MP4 download, but it arrives as cacheable images that never need re-seeking.
- The hidden `<video>` element and its scrub code are removed.

## Trade-off

The frames need to preload before the sequence is fully smooth. I will show the first frame plus the hero text immediately and load the rest in the background, so the page never looks empty.
