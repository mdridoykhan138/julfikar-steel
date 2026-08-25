import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { AboutHero } from "@/components/site/AboutHero";
import { AboutIntro } from "@/components/site/AboutIntro";
import { AboutFacts } from "@/components/site/AboutFacts";
import { AboutVideo } from "@/components/site/AboutVideo";
import { MissionVision } from "@/components/site/MissionVision";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { Clients } from "@/components/site/Clients";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { initReveals } from "@/lib/reveal";

const TITLE = "About — Julfikar Steel Re-Rolling Mills Ltd.";
const DESCRIPTION =
  "Julfikar Steel Re-Rolling Mills Ltd. manufactures high tensile reinforcement, structural and industrial steel — rolled to specification with documented quality control.";

export const Route = createFileRoute("/about")({
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
  component: AboutPage,
});

function AboutPage() {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!mainRef.current) return;
    const cleanup = initReveals(mainRef.current);
    return cleanup;
  }, []);

  return (
    <>
      <SiteHeader />
      <main ref={mainRef} className="bg-background">
        <AboutHero />
        <AboutIntro />
        <AboutFacts />
        <AboutVideo />
        <MissionVision />
        <WhyChooseUs />
        <Clients section="06" />
      </main>
      <SiteFooter />
      <ScrollToTop />
    </>
  );
}
