import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Products } from "@/components/site/Products";
import { Process } from "@/components/site/Process";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { Preloader } from "@/components/site/Preloader";
import videoSrc from "@/assets/video/zulfiqar-steel2.mp4";
import { useHeroPreload } from "@/lib/use-hero-preload";
import { initReveals } from "@/lib/reveal";

const TITLE = "Julfikar Steel Re-Rolling Mills Ltd. — Forged for Strength";
const DESCRIPTION =
  "Julfikar Steel Re-Rolling Mills Ltd. manufactures high tensile reinforcement, structural and industrial steel — rolled to specification with documented quality control.";

export const Route = createFileRoute("/home2")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home2,
});

function Home2() {
  const mainRef = useRef<HTMLElement>(null);
  const preload = useHeroPreload(videoSrc);

  useEffect(() => {
    if (!mainRef.current) return;
    const cleanup = initReveals(mainRef.current);
    return cleanup;
  }, []);

  return (
    <>
      {preload.loading ? (
        <Preloader
          progress={preload.progress}
          complete={preload.complete}
          onExit={preload.onLoaderExit}
        />
      ) : null}
      <SiteHeader />
      <main ref={mainRef} className="bg-background">
        <Hero
          videoSrc={preload.videoSrc}
          active={!preload.loading}
          preloadFailed={preload.failed}
          onReady={preload.onHeroReady}
        />
        <About />
        <Products />
        <Process />
      </main>
      <SiteFooter />
      <ScrollToTop />
    </>
  );
}
