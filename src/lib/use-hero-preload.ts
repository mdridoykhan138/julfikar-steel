import { useCallback, useEffect, useRef, useState } from "react";
import { preloadVideo } from "./preload-video";

const MIN_VISIBLE_MS = 1200;

/**
 * Downloads the hero footage with progress, and reports when the loading
 * screen is allowed to leave. `heroReady()` is called by the hero once the
 * video element can be seeked reliably.
 */
export function useHeroPreload(src: string) {
  const [progress, setProgress] = useState(0);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [complete, setComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const startedAt = useRef(0);
  const urlRef = useRef<string | null>(null);

  const finish = useCallback(() => {
    const elapsed = Date.now() - startedAt.current;
    const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);
    window.setTimeout(() => {
      setProgress(1);
      setComplete(true);
    }, wait);
  }, []);

  useEffect(() => {
    startedAt.current = Date.now();
    const controller = new AbortController();

    preloadVideo(src, {
      signal: controller.signal,
      onProgress: (value) => setProgress((prev) => Math.max(prev, value * 0.9)),
    }).then((result) => {
      if (controller.signal.aborted) return;
      if (result.failed) {
        setFailed(true);
        finish();
        return;
      }
      urlRef.current = result.url;
      setObjectUrl(result.url);
    });

    return () => {
      controller.abort();
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, [src, finish]);

  // Hard ceiling: never trap the user behind the loader.
  useEffect(() => {
    const timer = window.setTimeout(() => finish(), 16000);
    return () => window.clearTimeout(timer);
  }, [finish]);

  // Lock scrolling while the loader is up.
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("loading-lock", loading);
    return () => document.documentElement.classList.remove("loading-lock");
  }, [loading]);

  return {
    /** Object URL for the fully downloaded video, or null while downloading. */
    videoSrc: objectUrl,
    progress,
    failed,
    /** Loader should play its exit. */
    complete,
    /** Loader still mounted. */
    loading,
    /** Called by the hero when the video element can be scrubbed. */
    onHeroReady: finish,
    /** Called by the loader when its exit animation is done. */
    onLoaderExit: useCallback(() => setLoading(false), []),
  };
}
