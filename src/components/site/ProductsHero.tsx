import heroPoster from "@/assets/hero-poster.jpg";

export function ProductsHero() {
  return (
    <section className="relative overflow-hidden border-b border-[color:var(--border)] pb-[clamp(4rem,9vh,7rem)] pt-[clamp(9rem,20vh,15rem)]">
      <img
        src={heroPoster}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span
        className="pointer-events-none absolute inset-0 bg-[rgba(19,15,21,0.82)]"
        aria-hidden="true"
      />
      <div className="grid-lines" aria-hidden="true" />
      <div className="shell relative">
        <p className="eyebrow" data-reveal>
          Home — Products
        </p>
        <h1
          className="display display-xl mt-6 max-w-[16ch]"
          style={{ textTransform: "capitalize" }}
          data-reveal="mask"
        >
          Products
        </h1>
      </div>
    </section>
  );
}
