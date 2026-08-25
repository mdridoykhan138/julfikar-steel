import { Users, ShieldCheck, Layers, Headphones } from "lucide-react";

const REASONS = [
  {
    Icon: Users,
    title: "Expert People",
    copy: "We care for people as much as the environment — recycling used iron and steel, and refining every heat in a modern plant that is a pioneer in Bangladesh.",
  },
  {
    Icon: ShieldCheck,
    title: "Quality Service",
    copy: "A team of experienced professionals is committed to customer service through quality re-bars and prompt delivery. We believe in sustainable success through client satisfaction.",
  },
  {
    Icon: Layers,
    title: "Quality Product",
    copy: "Product quality is ensured throughout the manufacturing process — billet production, re-rolling, cooling and stocking. Our production department follows strict quality control requirements.",
  },
  {
    Icon: Headphones,
    title: "24/7 Customer Support",
    copy: "Our commitment to excellence extends beyond product quality. We have implemented a robust 24/7 customer support system, because satisfaction is part of the delivery.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative border-t border-[color:var(--border)] py-[clamp(6rem,16vh,12rem)]">
      <div className="shell">
        <div className="flex items-center gap-4">
          <span className="eyebrow">Section 05 — Why Choose Us</span>
          <span className="rule hidden flex-1 md:block" />
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-start">
          <h2 className="display display-lg lg:col-span-7" data-reveal="mask">
            Built on trust,
            <br />
            measured in tons.
          </h2>
          <p
            className="text-xl leading-relaxed text-[color:var(--steel)] lg:col-span-5"
            data-reveal
          >
            Four reasons contractors and fabricators keep coming back to Julfikar Steel.
          </p>
        </div>

        <div
          className="mt-[clamp(3rem,8vh,6rem)] grid gap-px bg-[color:var(--border)] sm:grid-cols-2 lg:grid-cols-4"
          data-stagger
        >
          {REASONS.map((r) => (
            <div key={r.title} className="flex flex-col bg-[#130f15] p-8">
              <r.Icon className="h-7 w-7 text-[color:var(--brand)]" aria-hidden="true" />
              <h3 className="display mt-6 text-[clamp(1.3rem,2vw,1.7rem)]">{r.title}</h3>
              <p className="mt-4 text-xl leading-relaxed text-[color:var(--steel-dim)]">{r.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
