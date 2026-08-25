import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { ProductsHero } from "@/components/site/ProductsHero";
import { Products } from "@/components/site/Products";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { initReveals } from "@/lib/reveal";

const TITLE = "Products — Julfikar Steel Re-Rolling Mills Ltd.";
const DESCRIPTION =
  "Explore the full range of Julfikar Steel products — reinforcement, structural, industrial, billets, TMT bars and wire rod.";

export const Route = createFileRoute("/products")({
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
  component: ProductsPage,
});

function ProductsPage() {
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
        <ProductsHero />
        <Products full />
      </main>
      <SiteFooter />
      <ScrollToTop />
    </>
  );
}
