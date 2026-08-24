/**
 * hero-canvas.ts
 * Framework-free scroll-scrubbed video → canvas engine.
 *
 * A hidden <video> is never played. Its currentTime is driven directly from
 * scroll progress, so scrolling down advances the forge sequence and scrolling
 * up reverses it. A single requestAnimationFrame loop performs the seeking
 * (eased) and paints the cover-fitted frame onto the canvas.
 */

export type HeroCanvasHandle = {
  setProgress: (progress: number) => void;
  destroy: () => void;
};

type InitOptions = {
  canvas: HTMLCanvasElement;
  video: HTMLVideoElement;
  onFailure?: () => void;
  reducedMotion?: boolean;
};

export function createHeroCanvas({
  canvas,
  video,
  onFailure,
  reducedMotion = false,
}: InitOptions): HeroCanvasHandle {
  const ctx = canvas.getContext("2d", { alpha: false });
  let rafId = 0;
  let resizeRaf = 0;
  let disposed = false;
  let targetTime = 0;
  let renderedTime = -1;
  let seeking = false;
  let ready = false;

  const measure = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    const nextW = Math.round(w * dpr);
    const nextH = Math.round(h * dpr);
    if (canvas.width !== nextW || canvas.height !== nextH) {
      canvas.width = nextW;
      canvas.height = nextH;
    }
    renderedTime = -1;
  };

  const paint = () => {
    if (!ctx) return;
    const cw = canvas.width;
    const ch = canvas.height;
    ctx.fillStyle = "#040405";
    ctx.fillRect(0, 0, cw, ch);
    if (!video.videoWidth) return;
    const scale = Math.max(cw / video.videoWidth, ch / video.videoHeight);
    const dw = video.videoWidth * scale;
    const dh = video.videoHeight * scale;
    ctx.drawImage(video, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  };

  const tick = () => {
    if (disposed) return;
    rafId = requestAnimationFrame(tick);
    if (!ready) return;

    const duration = video.duration || 0;
    if (!duration) return;

    const current = video.currentTime;
    const delta = targetTime - current;

    if (!seeking && Math.abs(delta) > 0.016) {
      const next = reducedMotion ? targetTime : current + delta * 0.4;
      seeking = true;
      try {
        video.currentTime = Math.max(0, Math.min(duration - 0.02, next));
      } catch {
        seeking = false;
      }
    }

    if (video.currentTime !== renderedTime) {
      renderedTime = video.currentTime;
      try {
        paint();
      } catch {
        /* frame not decodable yet */
      }
    }
  };

  const handleSeeked = () => {
    seeking = false;
    renderedTime = -1;
  };

  const handleReady = () => {
    ready = true;
    measure();
    try {
      paint();
    } catch {
      /* noop */
    }
  };

  const handleResize = () => {
    cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(() => {
      measure();
      try {
        paint();
      } catch {
        /* noop */
      }
    });
  };

  const handleError = () => {
    ready = false;
    onFailure?.();
  };

  video.addEventListener("loadeddata", handleReady);
  video.addEventListener("seeked", handleSeeked);
  video.addEventListener("error", handleError);
  window.addEventListener("resize", handleResize, { passive: true });
  window.addEventListener("orientationchange", handleResize, { passive: true });

  measure();
  if (video.readyState >= 2) handleReady();
  rafId = requestAnimationFrame(tick);

  return {
    setProgress: (progress: number) => {
      const duration = video.duration || 0;
      targetTime = Math.max(0, Math.min(duration, progress * duration));
    },
    destroy: () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(resizeRaf);
      video.removeEventListener("loadeddata", handleReady);
      video.removeEventListener("seeked", handleSeeked);
      video.removeEventListener("error", handleError);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    },
  };
}
