import { useEffect, useRef } from "react";
import Matter from "matter-js";
import client1 from "@/assets/client-logo/client-1.webp";
import client2 from "@/assets/client-logo/client-2.webp";
import client3 from "@/assets/client-logo/client-3.webp";
import client4 from "@/assets/client-logo/client-4.webp";
import client5 from "@/assets/client-logo/client-5.webp";
import client6 from "@/assets/client-logo/client-6.webp";
import client7 from "@/assets/client-logo/client-7.webp";
import { prefersReducedMotion } from "@/lib/reveal";

const { Engine, Runner, Bodies, Body, Composite, Mouse, MouseConstraint, Events } = Matter;

const CLIENTS = [
  { src: client1, alt: "Client 1" },
  { src: client2, alt: "Client 2" },
  { src: client3, alt: "Client 3" },
  { src: client4, alt: "Client 4" },
  { src: client5, alt: "Client 5" },
  { src: client6, alt: "Client 6" },
  { src: client7, alt: "Client 7" },
  { src: client1, alt: "Client 1" },
  { src: client2, alt: "Client 2" },
  { src: client3, alt: "Client 3" },
  { src: client4, alt: "Client 4" },
  { src: client5, alt: "Client 5" },
  { src: client6, alt: "Client 6" },
  { src: client7, alt: "Client 7" },
  { src: client1, alt: "Client 1" },
  { src: client2, alt: "Client 2" },
  { src: client3, alt: "Client 3" },
  { src: client4, alt: "Client 4" },
  { src: client5, alt: "Client 5" },
  { src: client6, alt: "Client 6" },
  { src: client7, alt: "Client 7" },
];

type MatterMouse = Matter.Mouse & {
  mousemove: EventListener;
  mousedown: EventListener;
  mouseup: EventListener;
  mousewheel: EventListener;
};

export function Clients() {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    if (!box || prefersReducedMotion()) return;

    let width = box.offsetWidth;
    let height = box.offsetHeight;

    const engine = Engine.create();
    engine.gravity.y = 0.8;

    const runner = Runner.create();
    runner.enabled = false;

    const mouse = Mouse.create(box) as MatterMouse;
    box.removeEventListener("wheel", mouse.mousewheel);
    box.addEventListener("mouseleave", mouse.mouseup);

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { render: { visible: false } },
    });
    Composite.add(engine.world, mouseConstraint);

    Events.on(mouseConstraint, "startdrag", () => {
      box.style.pointerEvents = "auto";
    });
    Events.on(mouseConstraint, "enddrag", () => {
      box.style.pointerEvents = "";
    });

    const wall = 50;
    const boundLeft = Bodies.rectangle(-wall / 2, height / 2, wall, height, { isStatic: true });
    const boundRight = Bodies.rectangle(width + wall / 2, height / 2, wall, height, {
      isStatic: true,
    });
    const boundBottom = Bodies.rectangle(width / 2, height + wall / 2, width, wall, {
      isStatic: true,
    });
    let boundTop: Matter.Body | null = null;
    Composite.add(engine.world, [boundLeft, boundRight, boundBottom]);

    const items = Array.from(box.querySelectorAll<HTMLElement>("[data-capsule]"));
    const spans: HTMLElement[] = [];
    const bodies: Matter.Body[] = [];
    const halfSizes: { w: number; h: number }[] = [];

    items.forEach((el, i) => {
      const span = el.querySelector<HTMLElement>("span");
      if (!span) return;
      spans.push(span);
      const rect = el.getBoundingClientRect();
      const halfW = rect.width / 2;
      const halfH = rect.height / 2;
      halfSizes.push({ w: halfW, h: halfH });
      const angle = Math.random() * 0.4 * Math.PI - 0.2 * Math.PI;
      const x = Math.random() * (width - rect.width) + halfW;
      const y = -rect.height - (i * rect.height + 10);
      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        chamfer: { radius: halfH },
        angle,
        restitution: 0.3,
      });
      Body.setStatic(body, true);
      bodies.push(body);
      Composite.add(engine.world, body);
    });

    let topBoundCreated = false;

    const clampToBox = (body: Matter.Body, halfW: number, halfH: number) => {
      const x = Math.max(halfW, Math.min(width - halfW, body.position.x));
      let y = Math.min(height - halfH, body.position.y);
      if (topBoundCreated) {
        y = Math.max(halfH, y);
      }
      if (x !== body.position.x || y !== body.position.y) {
        Body.setPosition(body, { x, y });
      }
    };

    Events.on(runner, "tick", () => {
      bodies.forEach((body, i) => {
        const el = items[i];
        const span = spans[i];
        if (!el || !span) return;
        const size = halfSizes[i];
        if (size) clampToBox(body, size.w, size.h);
        el.style.transform = `translate(${body.position.x}px, ${body.position.y}px)`;
        span.style.transform = `translate(-50%, -50%) rotate(${body.angle.toFixed(2)}rad)`;
      });
    });

    Events.on(runner, "tick", () => {
      if (
        !topBoundCreated &&
        bodies.length > 0 &&
        bodies[bodies.length - 1].position.y > height / 2
      ) {
        boundTop = Bodies.rectangle(width / 2, -wall / 2, width, wall, { isStatic: true });
        Composite.add(engine.world, boundTop);
        topBoundCreated = true;
      }
    });

    let rained = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runner.enabled = true;
          if (!rained) {
            rained = true;
            bodies.forEach((body, i) => {
              window.setTimeout(() => Body.setStatic(body, false), 80 * i);
            });
          }
        } else {
          runner.enabled = false;
        }
      });
    });
    observer.observe(box);

    let resizeTimer: number | undefined;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        width = box.offsetWidth;
        height = box.offsetHeight;
        Body.setPosition(boundLeft, { x: -wall / 2, y: height / 2 });
        Body.setPosition(boundRight, { x: width + wall / 2, y: height / 2 });
        Body.setPosition(boundBottom, { x: width / 2, y: height + wall / 2 });
        if (boundTop) Body.setPosition(boundTop, { x: width / 2, y: -wall / 2 });
        items.forEach((el, i) => {
          const body = bodies[i];
          if (!body) return;
          const rect = el.getBoundingClientRect();
          const halfW = rect.width / 2;
          const halfH = rect.height / 2;
          halfSizes[i] = { w: halfW, h: halfH };
          const updated = Bodies.rectangle(
            body.position.x,
            body.position.y,
            rect.width,
            rect.height,
            { chamfer: { radius: halfH }, angle: body.angle },
          );
          Body.setVertices(body, updated.vertices);
          Body.setPosition(body, {
            x:
              body.position.x > width - halfW || body.position.x < halfW
                ? Math.random() * (width - rect.width) + halfW
                : body.position.x,
            y: body.position.y > height - halfH ? height - halfH : body.position.y,
          });
        });
      }, 200);
    };
    window.addEventListener("resize", onResize);

    Runner.run(runner, engine);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      window.clearTimeout(resizeTimer);
      box.removeEventListener("mouseleave", mouse.mouseup);
      box.removeEventListener("mousemove", mouse.mousemove);
      box.removeEventListener("mousedown", mouse.mousedown);
      box.removeEventListener("mouseup", mouse.mouseup);
      box.removeEventListener("wheel", mouse.mousewheel);
      box.removeEventListener("touchmove", mouse.mousemove);
      box.removeEventListener("touchstart", mouse.mousedown);
      box.removeEventListener("touchend", mouse.mouseup);
      Events.off(runner);
      Events.off(engine);
      Events.off(mouseConstraint);
      Runner.stop(runner);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, []);

  return (
    <section
      id="clients"
      className="relative border-t border-[color:var(--border)] py-[clamp(6rem,16vh,12rem)]"
    >
      <div className="shell">
        <div className="flex items-center gap-4">
          <span className="eyebrow">Section 04 — Our Clients</span>
          <span className="rule hidden flex-1 md:block" />
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-end">
          <h2 className="display display-lg lg:col-span-7" data-reveal="mask">
            Trusted by the
            <br />
            industry.
          </h2>
          <p
            className="text-xl leading-relaxed text-[color:var(--steel)] lg:col-span-5"
            data-reveal
          >
            Fabricators, contractors and infrastructure builders rely on Julfikar Steel for
            consistent quality — shipment after shipment.
          </p>
        </div>

        <div ref={boxRef} className="clients-capsule mt-[clamp(3rem,8vh,6rem)]">
          {CLIENTS.map((client, i) => (
            <div key={i} data-capsule className="clients-capsule-item">
              <span className="client-capsule-box">
                <img src={client.src} alt={client.alt} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
