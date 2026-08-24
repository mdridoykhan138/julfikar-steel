/**
 * preload-video.ts
 * Downloads the hero footage in one request with real byte progress and hands
 * back a local object URL, so every later scroll-driven seek is instant
 * (no network round trip mid-scrub).
 */

export type PreloadResult = {
  url: string | null;
  failed: boolean;
};

type Options = {
  onProgress?: (fraction: number) => void;
  timeoutMs?: number;
  signal?: AbortSignal;
};

export async function preloadVideo(
  src: string,
  { onProgress, timeoutMs = 15000, signal }: Options = {},
): Promise<PreloadResult> {
  const controller = new AbortController();
  const abort = () => controller.abort();
  signal?.addEventListener("abort", abort);
  const timer = window.setTimeout(abort, timeoutMs);

  try {
    const response = await fetch(src, { signal: controller.signal });
    if (!response.ok || !response.body) throw new Error(`hero video ${response.status}`);

    const total = Number(response.headers.get("content-length") || 0);
    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let received = 0;

    // Without content-length we approach 90% asymptotically instead of lying.
    let synthetic = 0;

    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;
      chunks.push(value);
      received += value.byteLength;
      if (total > 0) {
        onProgress?.(Math.min(0.98, received / total));
      } else {
        synthetic += (0.9 - synthetic) * 0.12;
        onProgress?.(synthetic);
      }
    }

    const blob = new Blob(chunks as BlobPart[], { type: "video/mp4" });
    onProgress?.(1);
    return { url: URL.createObjectURL(blob), failed: false };
  } catch {
    return { url: null, failed: true };
  } finally {
    window.clearTimeout(timer);
    signal?.removeEventListener("abort", abort);
  }
}

/**
 * Resolves once the element can be seeked reliably (or immediately on error,
 * so the caller can fall back to the poster instead of hanging).
 */
export function whenSeekable(video: HTMLVideoElement, timeoutMs = 8000): Promise<boolean> {
  if (video.readyState >= 3) return Promise.resolve(true);
  return new Promise((resolve) => {
    let settled = false;
    const finish = (ok: boolean) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      video.removeEventListener("canplaythrough", ok1);
      video.removeEventListener("loadeddata", ok1);
      video.removeEventListener("error", fail);
      resolve(ok);
    };
    const ok1 = () => {
      if (video.readyState >= 3) finish(true);
    };
    const fail = () => finish(false);
    const timer = window.setTimeout(() => finish(video.readyState >= 2), timeoutMs);
    video.addEventListener("canplaythrough", ok1);
    video.addEventListener("loadeddata", ok1);
    video.addEventListener("error", fail);
  });
}
