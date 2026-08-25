import { Play } from "lucide-react";
import millLine from "@/assets/mill-line.jpg";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const VIDEO_ID = "JuwB6Hvd2n0";

export function AboutVideo() {
  return (
    <section className="relative border-t border-[color:var(--border)] py-[clamp(6rem,16vh,12rem)]">
      <div className="shell">
        <div className="flex items-center gap-4">
          <span className="eyebrow">Section 03 — Video</span>
          <span className="rule hidden flex-1 md:block" />
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-start">
          <h2 className="display display-lg lg:col-span-7" data-reveal="mask">
            See how we work with a touch of experience.
          </h2>
          <p
            className="text-xl leading-relaxed text-[color:var(--steel)] lg:col-span-5"
            data-reveal
          >
            From billet to finished bar — watch the rolling line in motion.
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              className="group relative mt-[clamp(3rem,8vh,6rem)] block aspect-video w-full overflow-hidden border border-[color:var(--border)] text-left"
              data-reveal="image"
              aria-label="Play the Julfikar Steel mill video"
            >
              <img
                src={millLine}
                alt="Hot billet passing through the rolling line at Julfikar Steel"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(4,4,5,0.75),rgba(4,4,5,0.1)_55%)]" />
              <span className="play-btn absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[color:var(--foreground)] bg-[rgba(19,15,21,0.6)] text-[color:var(--foreground)] backdrop-blur transition-transform duration-300 hover:scale-110">
                <Play className="ml-1 h-8 w-8" fill="currentColor" aria-hidden="true" />
              </span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl gap-0 border-0 bg-black p-0">
            <DialogTitle className="sr-only">Julfikar Steel — Inside the Mill</DialogTitle>
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1`}
                title="Julfikar Steel — Inside the Mill"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
