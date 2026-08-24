/**
 * hero-canvas.ts
 * Framework-free scroll-scrubbed video → canvas engine.
 *
 * A hidden <video> is never played. Its currentTime is driven directly from
 * ScrollTrigger progress, so scrolling down advances the forge sequence and
 * scrolling up reverses it. A single requestAnimationFrame loop performs the
 * seeking (eased) and paints the cover-fitted frame onto the canvas.
 */

export type HeroCanvasHandle = {
  destroy: () => void;
};

type InitOptions = {
  canvas: HTMLCanvasElement;
  video: HTMLVideoElement;
  onProgress?: (progress: number) => void;
  onFailure?: () => void;
  reducedMotion?: boolean;
};

export function createHeroCanvas({
  canvas,
  video,
  onProgress,
  onFailure,
  reducedMotion = false,
}: InitOptions): HeroCanvasHandle {
  const ctx = canvas.getContext("2d", { alpha: false });
  let rafId = 0;
  let disposed = false;
  let targetTime = 0;
  let renderedTime = -1;
  let seeking = false;
  let ready = false;
  let resizeRaf = 0;

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
    renderedTime = -1; // force a repaint after resize
  };

  const paint = () => {
    if (!ctx || !video.videoWidth) return;
    const cw = canvas.width;
    const ch = canvas.height;
    const vw = video.videoWidth;
    const vh = video.videoHeight;
    // object-fit: cover
    const scale = Math.max(cw / vw, ch / vh);
    const dw = vw * scale;
    const dh = vh * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;
    ctx.fillStyle = "#040405";
    ctx.fillRect(0, 0, cw, ch);
    try {
      ctx.drawImage(video, dx, dy, dw, dh);
    } catch {
      /* frame not decodable yet */
    }
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
      // ease toward the target so fast scrolls don't thrash the decoder
      const next = reducedMotion ? targetTime : current + delta * 0.35;
      seeking = true;
      try {
        video.currentTime = Math.max(0, Math.min(duration - 0.02, next));
      } catch {
        seeking = false;
      }
    }

    if (video.currentTime !== renderedTime) {
      renderedTime = video.currentTime;
      paint();
    }
  };

  const handleSeeked = () => {
    seeking = false;
    renderedTime = -1;
  };

  const handleReady = () => {
    ready = true;
    measure();
    paint();
  };

  const handleResize = () => {
    cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(() => {
      measure();
      paint();
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

  // exposed through closure below
  function setProgress(progress: number) {
    const duration = video.duration || 0;
    targetTime = Math.max(0, Math.min(duration, progress * duration));
    onProgress?.(progress);
  }
  // keep TS aware the helper is used via the returned setter
  // eslint-disable-next-line no-unreachable
  void setProgress;
}

/**
 * Simpler explicit API: returns both the destroy handle and a progress setter.
 */
export function mountHeroCanvas(options: InitOptions) {
  const state = { target: 0 };
  const handle = createHeroCanvas({
    ...options,
    onProgress: (p) => {
      state.target = p;
      options.onProgress?.(p);
    },
  });
  return handle;
}
